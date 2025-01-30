import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { PerfilDB } from '$lib/database/perfiles/db';
import { perfilStore } from '$lib/stores/perfil';
import { get } from 'svelte/store';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase, user } = locals;

	//Obtener el total de estudiante
	const { data: estudiantesData } = await supabase
		.from('Perfiles')
		.select('id')
		.eq('rol', 'Estudiante');
	const totalEstudiantes = estudiantesData?.length;

	//Obtener el total de profesores
	const { data: profesoresData } = await supabase
		.from('Perfiles')
		.select('id')
		.eq('rol', 'Profesor');
	const totalProfesores = profesoresData?.length;

	//Obtener el total de cursos
	const { data: cursosData } = await supabase.from('Cursos').select('id');
	const totalCursos = cursosData?.length;

	if (!user) {
		throw error(500, 'Error al obtener el perfil.');
	}

	const perfilCached = get(perfilStore);
	if (perfilCached) {
		return { perfil: perfilCached, totalEstudiantes, totalProfesores, totalCursos };
	}

	try {
		const perfil = await PerfilDB.obtenerPerfilPorID(supabase, user.id);

		if (!perfil) {
			throw error(404, 'Perfil no encontrado.');
		}

		perfilStore.set(perfil);

		return { perfil, totalEstudiantes, totalProfesores, totalCursos };
	} catch (err) {
		console.error('❌ Error al obtener el perfil:', err);
		throw error(500, 'Error al obtener el perfil.');
	}
};
