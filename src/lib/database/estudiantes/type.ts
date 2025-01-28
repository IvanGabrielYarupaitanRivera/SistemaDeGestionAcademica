import type { Curso } from '../cursos/type';

export interface Estudiante {
	id: string;
	grado: string;
	nombres?: string;
	apellido_paterno?: string;
	apellido_materno?: string;
	dni?: string;
	email?: string;
	fecha_actualizacion?: string;
	cursos?: Curso[];
}
