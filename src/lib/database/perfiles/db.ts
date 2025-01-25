import type { SupabaseClient } from '@supabase/supabase-js';
import type { Perfil } from './type';
import { validar } from './validaciones';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_SERVICE_ROLE } from '$env/static/private';

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SERVICE_ROLE);

export const PerfilDB = {
	async obtenerPerfilPorID(supabase: SupabaseClient, id: string) {
		const { data, error } = await supabase.from('Perfiles').select().eq('id', id).single();

		if (error) {
			throw new Error('Error al obtener el perfil.');
		}

		return data as Perfil;
	},

	async obtenerPerfiles(supabase: SupabaseClient) {
		const { data, error } = await supabase
			.from('Perfiles')
			.select()
			.order('fecha_actualizacion', { ascending: false });

		if (error) {
			throw new Error('Error al obtener los perfiles.');
		}

		return data as Perfil[];
	},

	async crearPerfil(supabase: SupabaseClient, perfil: Perfil) {
		const { error } = await supabase.from('Perfiles').insert([perfil]);

		if (error) {
			throw new Error('Error al crear el perfil');
		}
	},

	async editarPerfil(supabase: SupabaseClient, id: string, perfil: Perfil) {
		validar.validarNombre(perfil.nombres);
		validar.validarApellidoPaterno(perfil.apellido_paterno);
		validar.validarApellidoMaterno(perfil.apellido_materno);
		validar.validarDNI(perfil.dni);

		const { error } = await supabase.from('Perfiles').update(perfil).eq('id', id);

		if (error) {
			throw new Error('Error al editar el perfil');
		}

		const { error: userError } = await supabaseAdmin.auth.admin.updateUserById(id, {
			user_metadata: { rol: perfil.rol }
		});

		if (userError) {
			console.log('Error al actualizar el rol del usuario', userError);

			throw new Error('Error al actualizar el rol del usuario ');
		}
	}
};
