import { CursoDB } from '$lib/database/cursos/db';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	try {
		const cursos = await CursoDB.obtenerCursos(supabase);
		console.log('Obteniendo cursos desde la base de datos');

		return { cursos };
	} catch (err) {
		console.error('❌ Error inesperado:', err);
		throw error(500, 'Error al obtener cursos');
	}
};

export const actions = {
	crearCurso: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const curso = {
			id: crypto.randomUUID(),
			nombre: formData.get('nombre') as string,
			descripcion: formData.get('descripcion') as string
		};

		try {
			await CursoDB.crearCurso(supabase, curso);

			return {
				success: 'Curso creado exitosamente.'
			};
		} catch (error) {
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error al crear el curso'
			});
		}
	},

	editarCurso: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const curso = {
			id: formData.get('id') as string,
			nombre: formData.get('nombre') as string,
			descripcion: formData.get('descripcion') as string
		};

		try {
			await CursoDB.editarCurso(supabase, curso.id, curso);

			return {
				success: 'Curso editado exitosamente.'
			};
		} catch (error) {
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error al editar el curso'
			});
		}
	},

	eliminarCurso: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const id = formData.get('id') as string;

		try {
			await CursoDB.eliminarCurso(supabase, id);

			return {
				success: 'Curso eliminado exitosamente.'
			};
		} catch (error) {
			return fail(500, {
				error: error instanceof Error ? error.message : 'Error al eliminar el curso'
			});
		}
	}
} satisfies Actions;
