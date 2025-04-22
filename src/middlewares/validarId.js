//valida ID de Mongo
const { param } = require('express-validator');

const validarId = (nombreParam, nombreEntidad) => {
  return param(nombreParam).isMongoId().withMessage(`El ID de ${nombreEntidad} no es válido`);
};

module.exports = { validarId };
