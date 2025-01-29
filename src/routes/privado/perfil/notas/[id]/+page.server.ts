import { NotaDB } from '$lib/database/notas/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { InscripcionDB } from '$lib/database/inscripciones/db';

export const load = (async ({ params, locals: { supabase } }) => {
	const estudiante_id = params.id;

	try {
		// Obtener inscripciones con cursos
		const inscripciones = await InscripcionDB.obtenerCursosPorEstudiante(supabase, estudiante_id);

		// Obtener notas por inscripción
		const cursosConNotas = await Promise.all(
			inscripciones.map(async (inscripcion) => ({
				curso: inscripcion.Cursos,
				notas: await NotaDB.obtenerNotasPorInscripcion(supabase, inscripcion.id)
			}))
		);

		return { cursosConNotas };
	} catch (err) {
		console.error('Error:', err);
		throw error(500, 'Error al obtener datos del estudiante');
	}
}) satisfies PageServerLoad;
