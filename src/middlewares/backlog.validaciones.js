const { body } = require('express-validator');

const validarCamposBacklog = [
  body('nombre').notEmpty().withMessage('El campo Nombre es obligatorio')
];

module.exports = { validarCamposBacklog };
