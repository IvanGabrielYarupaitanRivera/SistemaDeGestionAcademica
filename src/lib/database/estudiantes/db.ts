import type { SupabaseClient } from '@supabase/supabase-js';
import type { Estudiante } from './type';

export const EstudianteDB = {
	async crearEstudiante(supabase: SupabaseClient, estudiante: Estudiante) {
		const { error } = await supabase.from('Estudiantes').insert([estudiante]);

		if (error) {
			throw new Error('Error al crear el estudiante');
		}
	},

	async obtenerEstudiantes(supabase: SupabaseClient) {
		const { data, error } = await supabase
			.from('Estudiantes')
			.select(
				`
			id,
			grado,
			Perfiles (
				nombres,
				apellido_paterno,
				apellido_materno,
				dni,
				email,
				fecha_actualizacion
			)
		`
			)
			.order('grado');

		if (error) {
			throw new Error('Error al obtener los estudiantes');
		}

		return data.map(({ id, grado, Perfiles }) => ({
			id,
			grado,
			...Perfiles
		})) as Estudiante[];
	},

	async editarEstudiante(supabase: SupabaseClient, id: string, estudiante: Estudiante) {
		const { error } = await supabase.from('Estudiantes').update(estudiante).eq('id', id);

		if (error) {
			throw new Error('Error al editar el estudiante');
		}
	}
};
