import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Usuario } from '$lib/database/usuarios/type';
import type { RolUsuario } from '$lib/database/perfiles/type';
import { UsuarioDB } from '$lib/database/usuarios/db';

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE);

import { PRIVATE_SUPABASE_SERVICE_ROLE } from '$env/static/private';

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
