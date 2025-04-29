const express = require("express");
const router = express.Router();

//middlewares
const { validarId } = require("../middlewares/validarId");
const manejarErroresValidacion = require("../middlewares/manejarErrores");
const {
  verificarTareaNoAsignadaASprint,
} = require("../middlewares/tarea.validaciones");
const {
  cargarDocumentoPorId,
} = require("../middlewares/cargarDocumentoPorId ");
const {
  validarCamposSprint,
  validarListaTareasExistentes,
  validarTareaParaAgregarASprint,
} = require("../middlewares/sprint.validaciones");

//models
const Sprint = require("../models/sprint.model");
const Tarea = require("../models/tarea.model");

const {
  getSprints,
  getSprintById,
  crearSprint,
  editarSprint,
  eliminarSprint,
  agregaTareaAlSprint,
  eliminarTareaDelSprint,
} = require("../controllers/sprint.controller");

//get de todos los sprints
router.get("/", getSprints);

//get por ID
router.get(
  "/:sprintId",
  validarId("sprintId", "Sprint"),
  manejarErroresValidacion,
  cargarDocumentoPorId("sprintId", Sprint, "Sprint", {
    populate: "listaTareas",
  }),
  getSprintById
);

//crear sprint
router.post("/", validarCamposSprint, manejarErroresValidacion, crearSprint);

//editar sprint
router.put(
  "/:sprintId",
  validarId("sprintId", "Sprint"),
  manejarErroresValidacion,
  validarCamposSprint,
  validarListaTareasExistentes,
  manejarErroresValidacion,
  cargarDocumentoPorId("sprintId", Sprint, "Sprint", {
    populate: "listaTareas",
  }),
  editarSprint
);

//agregar tarea al sprint
router.put(
  "/:sprintId/add-tarea/:tareaId",
  validarId("sprintId", "Sprint"),
  validarId("tareaId", "Tarea"),
  manejarErroresValidacion,
  cargarDocumentoPorId("sprintId", Sprint, "Sprint", {
    populate: "listaTareas",
  }),
  cargarDocumentoPorId("tareaId", Tarea, "Tarea"),
  validarTareaParaAgregarASprint,
  agregaTareaAlSprint
);

//eliminar tarea del sprint
router.delete(
  "/sprints/:sprintId/tareas/:tareaId",
  validarId("sprintId", "Sprint"),
  validarId("tareaId", "Tarea"),
  manejarErroresValidacion,
  cargarDocumentoPorId("sprintId", Sprint, "Sprint", {
    populate: "listaTareas",
  }),
  cargarDocumentoPorId("tareaId", Tarea, "Tarea"),
  eliminarTareaDelSprint
);

//eliminar srpint
router.delete(
  "/:sprintId",
  validarId("sprintId", "Sprint"),
  manejarErroresValidacion,
  cargarDocumentoPorId("sprintId", Sprint, "Sprint", {
    populate: "listaTareas",
  }),
  eliminarSprint
);

module.exports = router;
