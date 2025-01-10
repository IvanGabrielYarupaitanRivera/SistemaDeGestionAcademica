import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, session, user } }) => {
	depends('supabase:db:notes');
	const { data: notes } = await supabase.from('notes').select('id,note').order('id');

	console.log('Datos');
	console.log(supabase, session?.access_token, user?.email);

	return { notes: notes ?? [] };
};
