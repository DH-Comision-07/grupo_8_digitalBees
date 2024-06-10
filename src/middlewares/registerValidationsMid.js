const { body } = require('express-validator');

const validations = [
    body('first_name')
        .notEmpty()
        .withMessage('Debes de ingresar tu nombre')
        .bail()
        .isLength({ min: 2, max: 20 })
        .withMessage("Debes ingresar entre 2 y 20 caracteres"),
    body('last_name')
        .notEmpty()
        .withMessage('Debes de ingresar tu apellido')
        .bail()
        .isLength({ min: 2, max: 20 })
        .withMessage("Debes ingresar entre 2 y 20 caracteres"),
    body('email')
        .notEmpty()
        .withMessage('Debes de ingresar tu email')
        .bail()
        .isEmail()
        .withMessage('Debes escribir un formato de correo valido'),
    body('country')
        .notEmpty()
        .withMessage('Debes de elegir un pais'),
    body('city')
        .notEmpty()
        .withMessage('Debes de elegir una ciudad'),
    body('address')
        .notEmpty()
        .withMessage('Debes escribir una dirección'),
    body('phone_number')
        .notEmpty()
        .withMessage('Debes escribir un numero de telefono'),
    body('password')
        .notEmpty()
        .withMessage('Debes de ingresar una contraseña')
        .bail()
        .isStrongPassword()
        .withMessage("Tu contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un símbolo"),
    body('profile_picture').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

module.exports = validations;