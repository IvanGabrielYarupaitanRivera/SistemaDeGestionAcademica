import type { SupabaseClient } from '@supabase/supabase-js';
import type { Profesor } from './type';

export const ProfesorDB = {
	async crearProfesor(supabase: SupabaseClient, profesor: Profesor) {
		const { error } = await supabase.from('Profesores').insert([profesor]);

		if (error) {
			throw new Error('Error al crear el profesor');
		}
	},

	async obtenerProfesores(supabase: SupabaseClient) {
		const { data, error } = await supabase
			.from('Profesores')
			.select(
				`
            id,
            especialidad,
            Perfiles (
                nombres,
                apellido_paterno,
                apellido_materno,
                dni
            )
        `
			)
			.order('especialidad')
			.returns<Profesor[]>();

		if (error) {
			throw new Error('Error al obtener los profesores' + error.message);
		}

		return data as Profesor[];
	},

	async editarProfesor(supabase: SupabaseClient, profesor: Profesor) {
		const { error } = await supabase.from('Profesores').update(profesor).eq('id', profesor.id);

		if (error) {
			throw new Error('Error al editar el profesor');
		}
	}
};
