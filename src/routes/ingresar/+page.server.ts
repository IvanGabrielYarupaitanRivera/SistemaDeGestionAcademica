import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { UsuarioDB } from '$lib/database/usuarios/db';
import type { Usuario } from '$lib/database/usuarios/type';
import type { RolUsuario } from '$lib/database/perfiles/type';
import { perfilStore } from '$lib/stores/perfil';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		redirect(303, '/privado');
	}
};

export const actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const rol = formData.get('rol') as RolUsuario;

		const usuario: Usuario = {
			email: formData.get('email') as string,
			password: formData.get('password') as string
		};

		try {
			await UsuarioDB.registrarUsuario(supabase, usuario, rol);
			perfilStore.set(null);
			return {
				success: 'Por favor revise su correo electrónico para confirmar su cuenta.'
			};
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
			perfilStore.set(null);
		} catch (err) {
			return fail(500, {
				error: err instanceof Error ? err.message : 'Error en el servidor'
			});
		}
	}
} satisfies Actions;
