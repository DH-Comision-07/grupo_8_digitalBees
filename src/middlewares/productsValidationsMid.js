const { body } = require('express-validator');

const productsValidations = [
    body('title')
        .notEmpty()
        .withMessage('Debes de ingresar un producto')
        .bail()
        .isLength({ min: 5, max: 20 })
        .withMessage("Debes ingresar entre 5 y 20 caracteres"),
    body('description')
        .notEmpty()
        .withMessage('Debes de ingresar una descripción')
        .bail()
        .isLength({ min: 20, max: 40 })
        .withMessage("Debes ingresar entre 20 y 40 caracteres"),
    body('categoria_id')
        .notEmpty()
        .withMessage('Debes de elegir una categoria'),
    body('cost')
        .notEmpty()
        .withMessage('Debes ingresar un precio')
        .isNumeric()
        .withMessage('El precio debe ser un número')
        .bail()
        .isLength({ max: 6 })
        .withMessage('El precio debe tener hasta 6 dígitos'),
    body('img').custom((value, { req }) => {
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

module.exports =  productsValidations;