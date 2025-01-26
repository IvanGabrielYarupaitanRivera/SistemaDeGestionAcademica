import type { SupabaseClient } from '@supabase/supabase-js';
import type { Nota } from './type';

export const NotaDB = {
	async crearNota(supabase: SupabaseClient, nota: Nota) {
		const { error } = await supabase.from('Notas').insert([nota]);

		if (error) {
			throw new Error('Error al crear la nota');
		}
	}
};
