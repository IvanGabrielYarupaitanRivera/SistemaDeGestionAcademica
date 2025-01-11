import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			const { error: signUpError } = await supabase.auth.signUp({ email, password });

			if (signUpError) {
				return fail(500, {
					error: signUpError.message
				});
			} else {
				redirect(303, '/');
			}
		} catch (error) {
			return fail(500, {
				error: 'Error en el servidor' + error
			});
		}
	},

	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/private');
		}
	}
};
