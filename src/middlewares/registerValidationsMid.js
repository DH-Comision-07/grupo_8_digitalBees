const { body } = require('express-validator');

const validations = [
    body('first_name').notEmpty().withMessage('el campo no puede estar vacio'),
    body('last_name').notEmpty().withMessage('el campo no puede estar vacio'),
    body('email')
        .notEmpty().withMessage('el campo no puede estar vacio').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('country').notEmpty().withMessage('el campo no puede estar vacio'),
    body('city').notEmpty().withMessage('el campo no puede estar vacio'),
    body('address').notEmpty().withMessage('el campo no puede estar vacio'),
    body('phone_number').notEmpty().withMessage('el campo no puede estar vacio'),
    body('password').notEmpty().withMessage('el campo no puede estar vacio'),
    body('profile_picture').custom((value, { req })=>{
        let file = req.file;
        if(!file){
            throw new Error('Tienes que subir una imagen');
        }
        return true
    })
]

module.exports = validations;