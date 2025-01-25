import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createClient } from '@supabase/supabase-js';
import { UsuarioDB } from '$lib/database/usuarios/db';

import type { Usuario } from '$lib/database/usuarios/type';
import type { RolUsuario } from '$lib/database/perfiles/type';

import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PerfilDB } from '$lib/database/perfiles/db';

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
	}
} satisfies Actions;
