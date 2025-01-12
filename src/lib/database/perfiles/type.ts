export type RolUsuario = 'Administrador' | 'Estudiante' | 'Profesor';

export interface Perfil {
	id: string;
	nombres: string;
	apellido_paterno: string;
	apellido_materno: string;
	dni: string;
	rol?: RolUsuario;
	email?: string;
	fecha_creacion?: string;
	fecha_actualizacion: string;
}
