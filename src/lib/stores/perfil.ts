import { writable } from 'svelte/store';
import type { Perfil } from '$lib/database/perfiles/type';

export const perfilStore = writable<Perfil | null>(null);
