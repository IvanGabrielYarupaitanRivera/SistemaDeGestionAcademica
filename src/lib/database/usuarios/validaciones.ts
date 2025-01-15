import type { SupabaseClient } from '@supabase/supabase-js';
import type { RolUsuario } from '../perfiles/type';

export const validar = {
	validarEmail(email: string) {
		if (!email?.trim()) {
			throw new Error('El email es requerido');
		}

		const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if (!regexEmail.test(email)) {
			throw new Error('El formato del email no es válido');
		}

		if (email.length > 254) {
			throw new Error('El email no puede tener más de 254 caracteres');
		}
	},

	validarPassword(password: string) {
		if (!password?.trim()) {
			throw new Error('La contraseña es requerida');
		}

		if (password.length < 8) {
			throw new Error('La contraseña debe tener al menos 8 caracteres');
		}

		if (password.length > 50) {
			throw new Error('La contraseña no puede tener más de 50 caracteres');
		}

		/* const tieneMinuscula = /[a-z]/.test(password);
		const tieneMayuscula = /[A-Z]/.test(password);
		const tieneNumero = /\d/.test(password);
		const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		if (!tieneMinuscula || !tieneMayuscula || !tieneNumero || !tieneEspecial) {
			throw new Error(
				'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial'
			);
		} */
	},

	validarNewPassword(currentPassword: string, newPassword: string, confirmPassword: string) {
		if (newPassword.length < 8) {
			throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
		}

		if (newPassword === currentPassword) {
			throw new Error('La nueva contraseña no puede ser igual a la contraseña actual');
		}

		if (newPassword !== confirmPassword) {
			throw new Error('Las contraseñas no coinciden');
		}
	},

	async validarCurrentPassword(supabase: SupabaseClient, email: string, currentPassword: string) {
		const { error: signInError } = await supabase.auth.signInWithPassword({
			email: email,
			password: currentPassword
		});

		if (signInError) {
			throw new Error('La contraseña actual es incorrecta');
		}
	},

	validarRol(rol: string) {
		if (!rol) {
			throw new Error('El rol es requerido');
		}

		const rolesValidos: RolUsuario[] = ['Administrador', 'Estudiante', 'Profesor'];

		if (!rolesValidos.includes(rol as RolUsuario)) {
			throw new Error('Rol inválido.');
		}
	}
};
