import type { SupabaseClient } from '@supabase/supabase-js';
import type { Usuario } from './type';
import { PerfilDB } from '../perfiles/db';
import type { Perfil } from '../perfiles/type';
import { validar } from './validaciones';

export const UsuarioDB = {
	async registrarUsuario(supabase: SupabaseClient, { email, password }: Usuario) {
		validar.validarEmail(email);
		// validar.validarPassword(password);

		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error) {
			throw new Error(`Error al crear la cuenta del usuario.`);
		}

		const userId = data.user?.id;
		const userEmail = data.user?.email;

		const perfil: Perfil = {
			id: userId as string,
			nombres: 'Sin nombres',
			apellido_paterno: 'Sin apellido paterno',
			apellido_materno: 'Sin apellido materno',
			dni: 'Sin DNI',
			rol: 'Estudiante',
			email: userEmail as string,
			fecha_creacion: new Date().toISOString(),
			fecha_actualizacion: new Date().toISOString()
		};

		try {
			await PerfilDB.crearPerfil(supabase, perfil);
		} catch (error) {
			console.error('Error al crear el perfil del usuario:', error);
		}
	},

	async iniciarSesion(supabase: SupabaseClient, { email, password }: Usuario) {
		validar.validarEmail(email);
		// validar.validarPassword(password);

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) throw new Error('Error al iniciar sesión.');
	}
};
