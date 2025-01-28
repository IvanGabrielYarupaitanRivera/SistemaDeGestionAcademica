import type { SupabaseClient } from '@supabase/supabase-js';
import type { Estudiante } from './type';
import type Perfil from '../../../routes/privado/components/MainPrivado/Perfil.svelte';
import type { Curso } from '../cursos/type';

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
        *,
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

		if (error) {
			throw new Error('Error al obtener los estudiantes' + error.message);
		}

		return (
			data?.map(
				(estudiante): Estudiante => ({
					id: estudiante.id,
					grado: estudiante.grado,
					...estudiante.Perfiles,
					cursos: estudiante.Inscripciones?.map((insc) => insc.Cursos) || []
				})
			) || []
		);
	},

	async editarEstudiante(supabase: SupabaseClient, id: string, estudiante: Estudiante) {
		const { error } = await supabase.from('Estudiantes').update(estudiante).eq('id', id);

		if (error) {
			throw new Error('Error al editar el estudiante');
		}
	}
};
