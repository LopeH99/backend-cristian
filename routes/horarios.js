import express from "express";
import HorariosService from "../services/horariosService.js";
import { validateHorarioCreateOrUpdate } from "../middlewares/validarHorario.js";
import errorHandler from "../lib/errorHandler.js";

const router = express.Router();
const horariosService = new HorariosService();

router.get("/", async (req, res) => {
  const horarios = await horariosService.getAll();
  let ok = false;
  if (horarios) {
    ok = true;
  }
  res.json({ ok, horarios });
});

router.post("/", validateHorarioCreateOrUpdate, async (req, res) => {
  try {
    const horario = await horariosService.create(req.body);
    let ok = false;
    if (horario) {
      ok = true;
    }
    res.status(201).json({ ok, horario });
  } catch (error) {
    const err = await errorHandler(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error en el servidor", error: err });
  }
});

//editar
router.put("/:id", validateHorarioCreateOrUpdate, async (req, res) => {
  let ok = false;
  const id = +req.params?.id;
  if (!id) {
    return res.json({ ok: false, message: "Debe ingresar un id" });
  }
  const horario = await horariosService.getOne(id);
  if (!horario) {
    return res.json({ ok: false, message: "la horario indicada no existe" });
  }
  try {
    const horario = await horariosService.update(id, req.body);
    if (horario) {
      ok = true;
    }
    res.json({ ok, horario });
  } catch (error) {
    const err = await errorHandler(error)
    return res.status(500).json({ok: false, message: "Error en el servidor", error: err})
  }
});

//eliminar
router.delete("/:id", async (req, res) => {
  let ok = false;
  const id = +req.params?.id;
  if (!id) {
    return res.json({ ok: false, message: "Debe ingresar un id" });
  }
  const horario = await horariosService.getOne(id);
  if (!horario) {
    return res.json({ ok: false, message: "el horario indicada no existe" });
  }

  try {
    const horario = await horariosService.delete(id);
    if (horario) {
      ok = true;
    }
    res.json({ ok, message: "horario eliminado", horario });
  } catch (error) {
    res.json({ ok, message: error.message });
  }
});

export default router;
