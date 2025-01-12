export const validar = {
	validarNombre(nombre: string) {
		if (!nombre?.trim()) {
			throw new Error('El nombre es requerido');
		}

		const regexNombre = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
		if (!regexNombre.test(nombre)) {
			throw new Error(
				'El nombre solo debe contener letras y un solo espacio entre palabras. Puede ser un nombre o varios nombres.'
			);
		}

		if (nombre.length < 2 || nombre.length > 50) {
			throw new Error('El nombre debe tener entre 2 y 50 caracteres');
		}
	},

	validarApellidoPaterno(apellidoPaterno: string) {
		if (!apellidoPaterno?.trim()) {
			throw new Error('El apellido paterno es requerido');
		}

		const regexApellido = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
		if (!regexApellido.test(apellidoPaterno)) {
			throw new Error(
				'El apellido paterno solo debe contener letras y un solo espacio entre palabras. Puede ser un apellido compuesto.'
			);
		}

		if (apellidoPaterno.length < 2 || apellidoPaterno.length > 50) {
			throw new Error('El apellido paterno debe tener entre 2 y 50 caracteres');
		}
	},

	validarApellidoMaterno(apellidoMaterno: string) {
		if (!apellidoMaterno?.trim()) {
			throw new Error('El apellido materno es requerido');
		}

		const regexApellido = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
		if (!regexApellido.test(apellidoMaterno)) {
			throw new Error(
				'El apellido materno solo debe contener letras y un solo espacio entre palabras. Puede ser un apellido compuesto.'
			);
		}

		if (apellidoMaterno.length < 2 || apellidoMaterno.length > 50) {
			throw new Error('El apellido materno debe tener entre 2 y 50 caracteres');
		}
	},

	validarDNI(dni: string) {
		if (!dni?.trim()) {
			throw new Error('El DNI es requerido');
		}

		const regexDNI = /^\d{8}$/;
		if (!regexDNI.test(dni)) {
			throw new Error('El DNI debe tener exactamente 8 dígitos');
		}
	}
};
