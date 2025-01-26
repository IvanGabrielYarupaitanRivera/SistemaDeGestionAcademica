import type { SupabaseClient } from '@supabase/supabase-js';
import type { Usuario } from './type';
import { PerfilDB } from '../perfiles/db';
import type { Perfil, RolUsuario } from '../perfiles/type';
import { validar } from './validaciones';
import { EstudianteDB } from '../estudiantes/db';
import type { Estudiante } from '../estudiantes/type';
import type { Profesor } from '../profesores/type';
import { ProfesorDB } from '../profesores/db';

export const UsuarioDB = {
	async registrarUsuario(supabase: SupabaseClient, { email, password }: Usuario, rol: RolUsuario) {
		validar.validarRol(rol);
		validar.validarEmail(email);
		validar.validarPassword(password);

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
			rol: rol,
			email: userEmail as string,
			fecha_creacion: new Date().toISOString(),
			fecha_actualizacion: new Date().toISOString()
		};

		await PerfilDB.crearPerfil(supabase, perfil);
	},

	async crearUsuario(supabase: SupabaseClient, { email, password }: Usuario, rol: RolUsuario) {
		validar.validarRol(rol);
		validar.validarEmail(email);
		validar.validarPassword(password);

		const { data, error: authError } = await supabase.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: {
				rol
			}
		});

		if (authError) {
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
			rol,
			email: userEmail as string,
			fecha_creacion: new Date().toISOString(),
			fecha_actualizacion: new Date().toISOString()
		};
		await PerfilDB.crearPerfil(supabase, perfil);

		if (perfil.rol === 'Estudiante') {
			const estudiante: Estudiante = {
				id: userId as string,
				grado: 'Sin grado'
			};
			await EstudianteDB.crearEstudiante(supabase, estudiante);
		}

		if (perfil.rol === 'Profesor') {
			const profesor: Profesor = {
				id: userId as string,
				especialidad: 'Sin especialidad'
			};
			await ProfesorDB.crearProfesor(supabase, profesor);
		}
	},

	async eliminarUsuario(supabase: SupabaseClient, id: string) {
		const { error } = await supabase.auth.admin.deleteUser(id);

		if (error) {
			throw new Error('Error al eliminar el usuario.');
		}
	},

	async iniciarSesion(supabase: SupabaseClient, { email, password }: Usuario) {
		validar.validarEmail(email);
		// validar.validarPassword(password);

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) throw new Error('Error al iniciar sesión.');
	},

	async cambiarContrasena(
		supabase: SupabaseClient,
		email: string,
		currentPassword: string,
		newPassword: string,
		confirmPassword: string
	) {
		await validar.validarCurrentPassword(supabase, email, currentPassword);
		validar.validarNewPassword(currentPassword, newPassword, confirmPassword);

		const { error: updateError } = await supabase.auth.updateUser({
			password: newPassword
		});

		if (updateError) {
			throw new Error('Error al actualizar la contraseña');
		}

		return { success: 'Contraseña actualizada correctamente' };
	}
};
