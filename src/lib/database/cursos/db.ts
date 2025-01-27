import type { SupabaseClient } from '@supabase/supabase-js';
import type { Curso } from './type';

export const CursoDB = {
	async crearCurso(supabase: SupabaseClient, curso: Curso) {
		const { error } = await supabase.from('Cursos').insert([curso]);

		if (error) {
			throw new Error('Error al crear el curso');
		}
	},

	async eliminarCurso(supabase: SupabaseClient, id: string) {
		const { error } = await supabase.from('Cursos').delete().eq('id', id);

		if (error) {
			throw new Error('Error al eliminar el curso');
		}
	},

	async obtenerCursos(supabase: SupabaseClient) {
		const { data, error } = await supabase
			.from('Cursos')
			.select()
			.order('fecha_creacion', { ascending: false });

		if (error) {
			throw new Error('Error al obtener los cursos');
		}

		return data as Curso[];
	},

	async editarCurso(supabase: SupabaseClient, id: string, curso: Curso) {
		const { error } = await supabase.from('Cursos').update(curso).eq('id', id);

		if (error) {
			throw new Error('Error al editar el curso');
		}
	}
};
