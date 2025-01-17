import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { RolUsuario } from '$lib/database/perfiles/type';

const ROLES: Record<string, RolUsuario> = {
	ADMIN: 'Administrador',
	PROFESOR: 'Profesor',
	ESTUDIANTE: 'Estudiante'
} as const;

const PROTECTED_ROUTES = {
	PUBLIC: ['/', '/ingresar'],
	PRIVATE: '/privado',
	ADMIN: '/privado/administrador',
	PROFESOR: '/privado/profesor',
	ESTUDIANTE: '/privado/estudiante',
	AUTH: '/ingresar'
} as const;

const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	const userRole = user?.user_metadata?.rol as RolUsuario;
	const currentPath = event.url.pathname;

	if (!session && currentPath.startsWith(PROTECTED_ROUTES.PRIVATE)) {
		redirect(303, PROTECTED_ROUTES.AUTH);
	}

	if (session && currentPath.startsWith(PROTECTED_ROUTES.AUTH)) {
		redirect(303, PROTECTED_ROUTES.PRIVATE);
	}

	if (userRole === ROLES.ADMIN) {
		return resolve(event);
	}

	if (currentPath.startsWith(PROTECTED_ROUTES.ADMIN)) {
		redirect(303, PROTECTED_ROUTES.PRIVATE);
	}

	if (currentPath.startsWith(PROTECTED_ROUTES.PROFESOR) && userRole !== ROLES.PROFESOR) {
		redirect(303, PROTECTED_ROUTES.PRIVATE);
	}

	if (currentPath.startsWith(PROTECTED_ROUTES.ESTUDIANTE) && userRole !== ROLES.ESTUDIANTE) {
		redirect(303, PROTECTED_ROUTES.PRIVATE);
	}

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
