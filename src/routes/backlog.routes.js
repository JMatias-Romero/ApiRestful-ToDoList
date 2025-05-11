const express = require("express");
const router = express.Router();

//modelos
const Tarea = require("../models/tarea.model");
const Backlog = require("../models/backlog.model");

//middlewares
const { validarId } = require("../middlewares/validarId");
const {
  cargarDocumentoPorId,
} = require("../middlewares/cargarDocumentoPorId ");
const { validarCamposBacklog } = require("../middlewares/backlog.validaciones");
const manejarErroresValidacion = require("../middlewares/manejarErrores");

//controladores
const {
  getBacklogs,
  getBacklogByID,
  crearBacklog,
  editarBacklog,
  agregaTareaAlBacklog,
  eliminarBacklog,
} = require("../controllers/backlog.controller");

//*** Rutas ***
//get de todos los backlogs
router.get("/", getBacklogs);

//get por id
router.get(
  "/:backlogId",
  validarId("backlogId", "Backlog"),
  manejarErroresValidacion,
  cargarDocumentoPorId("backlogId", Backlog, "Backlog", {
    populate: "listaTareas",
  }),
  getBacklogByID
);

//crea backlog
router.post("/", validarCamposBacklog, manejarErroresValidacion, crearBacklog);

//editar backlog
router.put(
  "/:backlogId",
  validarId("backlogId", "Backlog"),
  manejarErroresValidacion,
  validarCamposBacklog,
  manejarErroresValidacion,
  cargarDocumentoPorId("backlogId", Backlog, "Backlog", {
    populate: "listaTareas",
  }),
  editarBacklog
);

//agrega tarea al backlog
router.put(
  "/:backlogId/add-tarea/:tareaId",
  validarId("backlogId", "Backlog"),
  validarId("tareaId", "Tarea"),
  manejarErroresValidacion,
  cargarDocumentoPorId("tareaId", Tarea, "Tarea"),
  cargarDocumentoPorId("backlogId", Backlog, "Backlog", {
    populate: "listaTareas",
  }),
  agregaTareaAlBacklog
);
//eliminar backlog
router.delete(
  "/:backlogId",
  validarId("backlogId", "Backlog"),
  manejarErroresValidacion,
  cargarDocumentoPorId("backlogId", Backlog, "Backlog", {
    populate: "listaTareas",
  }),
  eliminarBacklog
);

module.exports = router;
