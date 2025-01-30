import type { SupabaseClient } from '@supabase/supabase-js';
import type { Estudiante } from './type';
import type { Curso } from '../cursos/type';
import type { Perfil } from '../perfiles/type';

interface EstudianteResponse {
	id: string;
	grado: string;
	Perfiles: Perfil;
	Inscripciones: {
		Cursos: Curso;
	}[];
}

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
				),
				Inscripciones (
					Cursos (
						id,
						nombre, 
						descripcion
					)
				)
			`
			)
			.order('grado')
			.returns<EstudianteResponse[]>();

		if (error) throw new Error('Error al obtener estudiantes');

		return (
			data?.map(({ id, grado, Perfiles, Inscripciones }) => ({
				id, // id del estudiante
				grado,
				nombres: Perfiles.nombres,
				apellido_paterno: Perfiles.apellido_paterno,
				apellido_materno: Perfiles.apellido_materno,
				dni: Perfiles.dni,
				email: Perfiles.email,
				fecha_actualizacion: Perfiles.fecha_actualizacion,
				cursos: Inscripciones?.map((insc) => insc.Cursos) || []
			})) || []
		);
	},

	async editarEstudiante(supabase: SupabaseClient, id: string, estudiante: Estudiante) {
		const { error } = await supabase.from('Estudiantes').update(estudiante).eq('id', id);

		if (error) {
			throw new Error('Error al editar el estudiante');
		}
	}
};
