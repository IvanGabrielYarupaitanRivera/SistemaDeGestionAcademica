import type { SupabaseClient } from '@supabase/supabase-js';

export interface CursoResponse {
	id: string;
	nombre: string;
	descripcion: string;
}

interface InscripcionConCurso {
	id: string;
	Cursos: CursoResponse;
}

export const InscripcionDB = {
	async obtenerInscripcionesPorEstudiante(supabase: SupabaseClient, estudiante_id: string) {
		const { data, error } = await supabase
			.from('Inscripciones')
			.select('curso_id')
			.eq('estudiante_id', estudiante_id);

		if (error) throw new Error('Error al obtener inscripciones');

		return data.map((i) => i.curso_id);
	},

	async inscribirEnCursos(supabase: SupabaseClient, estudiante_id: string, cursos_ids: string[]) {
		const cursosActuales = await this.obtenerInscripcionesPorEstudiante(supabase, estudiante_id);

		// Cursos a insertar (nuevos)
		const cursosNuevos = cursos_ids.filter((id) => !cursosActuales.includes(id));

		// Cursos a eliminar (deseleccionados)
		const cursosEliminar = cursosActuales.filter((id) => !cursos_ids.includes(id));

		const batch = [];

		if (cursosNuevos.length > 0) {
			// 1. Insertar nuevas inscripciones y obtener sus IDs
			const { data: nuevasInscripciones, error: errorInscripciones } = await supabase
				.from('Inscripciones')
				.insert(
					cursosNuevos.map((curso_id) => ({
						estudiante_id,
						curso_id
					}))
				)
				.select('id');

			if (errorInscripciones) throw new Error('Error al crear inscripciones');

			// 2. Crear registros de notas para las nuevas inscripciones
			if (nuevasInscripciones) {
				batch.push(
					supabase.from('Notas').insert(
						nuevasInscripciones.map((inscripcion) => ({
							inscripcion_id: inscripcion.id,
							parcial_1: 0,
							parcial_2: 0,
							parcial_3: 0,
							promedio_parciales: 0,
							fecha_creacion: new Date().toISOString()
						}))
					)
				);
			}
		}

		if (cursosEliminar.length > 0) {
			batch.push(
				supabase
					.from('Inscripciones')
					.delete()
					.eq('estudiante_id', estudiante_id)
					.in('curso_id', cursosEliminar)
			);
		}

		const results = await Promise.all(batch);
		const error = results.find((r) => r.error);
		if (error) throw new Error('Error al actualizar inscripciones');
	},

	async obtenerCursosPorEstudiante(
		supabase: SupabaseClient,
		estudiante_id: string
	): Promise<InscripcionConCurso[]> {
		const { data, error } = await supabase
			.from('Inscripciones')
			.select(
				`
				id,
				Cursos:curso_id (
					id,
					nombre,
					descripcion
				)
			`
			)
			.eq('estudiante_id', estudiante_id)
			.returns<InscripcionConCurso[]>();

		if (error) throw new Error('Error al obtener los cursos del estudiante');

		return data ?? [];
	}
};
