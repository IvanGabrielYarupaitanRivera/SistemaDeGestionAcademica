import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createClient } from '@supabase/supabase-js';
import { UsuarioDB } from '$lib/database/usuarios/db';

import type { Usuario } from '$lib/database/usuarios/type';
import type { Perfil, RolUsuario } from '$lib/database/perfiles/type';

import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PerfilDB } from '$lib/database/perfiles/db';
import { perfilStore } from '$lib/stores/perfil';

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE);

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	try {
		const perfiles = await PerfilDB.obtenerPerfiles(supabase);
		console.log('Obteniendo perfiles desde la base de datos');

		return { perfiles };
	} catch (err) {
		console.error('❌ Error inesperado:', err);
		throw error(500, 'Error al obtener perfiles');
	}
};

export const actions = {
	crearUsuario: async ({ request }) => {
		const formData = await request.formData();

		const rol = formData.get('rol')?.toString() as RolUsuario;

		// Validar datos del formulario
		const usuario: Usuario = {
			email: formData.get('email') as string,
			password: formData.get('password') as string
		};

		try {
			await UsuarioDB.crearUsuario(supabaseAdmin, usuario, rol);

			return {
				success: 'Usuario creado exitosamente.'
			};
		} catch (error) {
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error al crear el usuario'
			});
		}
	},

	editarUsuario: async ({ request, locals: { supabase, user } }) => {
		const formData = await request.formData();

		if (!user) {
			return fail(401, { error: 'No autorizado' });
		}

		const perfil: Perfil = {
			id: formData.get('id') as string,
			nombres: formData.get('nombres') as string,
			apellido_paterno: formData.get('apellido_paterno') as string,
			apellido_materno: formData.get('apellido_materno') as string,
			dni: formData.get('dni') as string,
			rol: formData.get('rol') as RolUsuario,
			fecha_actualizacion: new Date().toISOString()
		};

		try {
			await PerfilDB.editarPerfil(supabase, perfil.id, perfil);

			perfilStore.set(null);

			return { success: 'Perfil actualizado correctamente' };
		} catch (err) {
			return fail(500, {
				error: err instanceof Error ? err.message : 'Error en el servidor'
			});
		}
	}
} satisfies Actions;
