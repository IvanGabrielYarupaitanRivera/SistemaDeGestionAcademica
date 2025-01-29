export const validar = {
	validarNota(nota: number, nombreNota: string) {
		if (nota === undefined || nota === null) {
			throw new Error(`La ${nombreNota} es requerida`);
		}

		if (!Number.isInteger(nota)) {
			throw new Error(`La ${nombreNota} debe ser un número entero`);
		}

		if (nota < 0 || nota > 20) {
			throw new Error(`La ${nombreNota} debe estar entre 0 y 20`);
		}
	}
};
