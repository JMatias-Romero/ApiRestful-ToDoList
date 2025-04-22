// carga documento por id permitiendo usar opcionalmente populate() cuando se necesite

const cargarDocumentoPorId = (paramId, Modelo, nombre, opciones = {}) => {
  return async (req, res, next) => {
    const id = req.params[paramId];

    try {
      let documento;
      if (opciones.populate) {
        documento = await Modelo.findById(id).populate(opciones.populate);
      } else {
        documento = await Modelo.findById(id);
      }

      if (!documento) {
        return res.status(404).json({ message: `El ${nombre.toLowerCase()} no fue encontrado` });
      }

      // Ej: res.tarea, res.sprint, res.backlog...
      res[nombre.toLowerCase()] = documento;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { cargarDocumentoPorId };
