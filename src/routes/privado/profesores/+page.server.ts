import { ProfesorDB } from '$lib/database/profesores/db';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	try {
		const profesores = await ProfesorDB.obtenerProfesores(supabase);
		console.log('Obteniendo profesores desde la base de datos');

		return { profesores };
	} catch (err) {
		console.error('❌ Error inesperado:', err);
		throw error(500, 'Error al obtener profesores');
	}
};

export const actions = {
	editarProfesor: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const profesor = {
			id: formData.get('id') as string,
			especialidad: formData.get('especialidad') as string
		};

		try {
			await ProfesorDB.editarProfesor(supabase, profesor);

			return {
				success: 'Profesor editado exitosamente.'
			};
		} catch (error) {
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error al editar el profesor'
			});
		}
	}
} satisfies Actions;
