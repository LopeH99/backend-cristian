import express from "express";
import UsuariosService from "../services/usuariosService.js";
import { validarUsuarioCrear } from "../middlewares/validarUsuario.js";
import errorHandler from "../lib/errorHandler.js";

const router = express.Router();
const usuariosService = new UsuariosService();

const validRoles = ["ADMIN", "ALUMNO", "PROFESOR", "PERSONAL"];

router.get("/", async (req, res) => {
  if (
    req.query?.rol &&
    !validRoles.includes(req.query.rol.toLocaleUpperCase())
  ) {
    return res.status(400).json({ ok: false, message: "rol invalido" });
  }
  const usuarios = await usuariosService.getAll(req.query);
  let ok = false;
  if (usuarios) {
    ok = true;
  }
  return res.json({ ok, usuarios });
});

router.get("/:id", async (req, res) => {
  const usuario = await usuariosService.getOne(+req.params?.id);
  let ok = false;
  if (usuario) {
    ok = true;
  }
  return res.json({ ok, usuario });
});

router.post("/", validarUsuarioCrear, async (req, res) => {
  let ok = false;
  try {
    const usuario = await usuariosService.create(req.body);
    if (usuario) {
      ok = true;
      delete usuario.password;
    }
    return res.json({ ok, usuario });
  } catch (error) {
    const err = await errorHandler(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error en el servidor", error: err });
  }
});

router.put("/:id", validarUsuarioCrear, async (req, res) => {
  if (!req.params?.id) {
    return res.json({ ok: false, message: "Debe ingresar un id" });
  }
  const id = +req.params?.id;
  let ok = false;
  try {
    const usuario = await usuariosService.update(id, req.body);
    if (usuario) {
      ok = true;
    }
    return res.json({ ok, usuario });
  } catch (error) {
    const err = await errorHandler(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error en el servidor", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params?.id) {
    return res.json({ ok: false, message: "Debe ingresar un id" });
  }
  const id = +req.params?.id;
  if (id === 1) {
    return res.json({
      ok: false,
      message: "No puede eliminar el usuario super admin",
    });
  }
  let ok = false;
  try {
    const usuario = await usuariosService.delete(id);
    if (usuario) {
      ok = true;
    }
    return res.json({ ok, message: "Usuario eliminado" });
  } catch (error) {
    return res.json({ ok, message: error.message });
  }
});

export default router;
