export interface Profesor {
	id: string;
	especialidad: string;
	Perfiles?: {
		nombres: string;
		apellido_paterno: string;
		apellido_materno: string;
		dni: string;
	};
}
