import { EstudianteDB } from '$lib/database/estudiantes/db';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { Estudiante } from '$lib/database/estudiantes/type';
import { InscripcionDB } from '$lib/database/inscripciones/db';
import { CursoDB } from '$lib/database/cursos/db';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	try {
		const estudiantes = await EstudianteDB.obtenerEstudiantes(supabase);
		const cursos = await CursoDB.obtenerCursos(supabase);
		console.log('Obteniendo estudiantes desde la base de datos');

		return { estudiantes, cursos };
	} catch (err) {
		console.error('❌ Error inesperado:', err);
		throw error(500, 'Error al obtener estudiantes');
	}
};

export const actions = {
	editarEstudiante: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const estudiante: Estudiante = {
			id: formData.get('id') as string,
			grado: formData.get('grado') as string
		};

		try {
			await EstudianteDB.editarEstudiante(supabase, estudiante.id, estudiante);

			return {
				success: 'Estudiante editado exitosamente.'
			};
		} catch (error) {
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error al editar el estudiante'
			});
		}
	},

	inscribirEnCursos: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const estudiante_id = formData.get('estudiante_id') as string;
		const cursos_ids = formData.getAll('cursos_ids') as string[];

		try {
			await InscripcionDB.inscribirEnCursos(supabase, estudiante_id, cursos_ids);
			return { success: 'Inscripciones actualizadas exitosamente' };
		} catch (error) {
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error al actualizar inscripciones'
			});
		}
	}
} satisfies Actions;
