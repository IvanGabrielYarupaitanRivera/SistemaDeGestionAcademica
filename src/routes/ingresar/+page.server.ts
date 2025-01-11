import { fail } from '@sveltejs/kit';
import { UsuarioDB } from '$lib/database/usuarios/db';
import type { Usuario } from '$lib/database/usuarios/type';
import type { Actions } from './$types';

export const actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const usuario: Usuario = {
			email: formData.get('email') as string,
			password: formData.get('password') as string
		};

		try {
			await UsuarioDB.registrarUsuario(supabase, usuario);
		} catch (err) {
			return fail(500, {
				error: err instanceof Error ? err.message : 'Error en el servidor'
			});
		}
	},

	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const usuario: Usuario = {
			email: formData.get('email') as string,
			password: formData.get('password') as string
		};

		try {
			await UsuarioDB.iniciarSesion(supabase, usuario);
		} catch (err) {
			return fail(500, {
				error: err instanceof Error ? err.message : 'Error en el servidor'
			});
		}
	}
} satisfies Actions;
