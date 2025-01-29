import { NotaDB } from '$lib/database/notas/db';
import { error, fail, type Actions } from '@sveltejs/kit';
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

export const actions = {
	editarNota: async ({ request, locals: { supabase, user } }) => {
		if (user?.user_metadata.rol == 'Estudiante') {
			return fail(403, {
				error: 'No tienes permisos para realizar esta acción'
			});
		}

		const formData = await request.formData();

		const parcial_1 = Number(formData.get('parcial_1'));
		const parcial_2 = Number(formData.get('parcial_2'));
		const parcial_3 = Number(formData.get('parcial_3'));
		const promedio_parciales = Math.round((parcial_1 + parcial_2 + parcial_3) / 3);

		const nota = {
			id: formData.get('id') as string,
			parcial_1,
			parcial_2,
			parcial_3,
			promedio_parciales,
			fecha_actualizacion: new Date().toISOString()
		};

		try {
			await NotaDB.editarNota(supabase, nota.id, nota);

			return {
				success: 'Nota editada exitosamente.'
			};
		} catch (error) {
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error al editar la nota'
			});
		}
	}
} satisfies Actions;
