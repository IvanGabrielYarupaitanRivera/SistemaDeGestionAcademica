import type { SupabaseClient } from '@supabase/supabase-js';
import type { Usuario } from './type';
import { validar } from './validaciones';

export const UsuarioDB = {
	async registrarUsuario(supabase: SupabaseClient, { email, password }: Usuario) {
		validar.validarEmail(email);
		// validar.validarPassword(password);

		const { error } = await supabase.auth.signUp({ email, password });

		if (error) throw new Error(`Error al crear la cuenta del usuario.`);
	},

	async iniciarSesion(supabase: SupabaseClient, { email, password }: Usuario) {
		validar.validarEmail(email);
		// validar.validarPassword(password);

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) throw new Error('Error al iniciar sesión.');
	}
};
