import type { SupabaseClient } from '@supabase/supabase-js';

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
			batch.push(
				supabase.from('Inscripciones').insert(
					cursosNuevos.map((curso_id) => ({
						estudiante_id,
						curso_id
					}))
				)
			);
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
	}
};
