import express from 'express';
import UsuariosService from '../services/usuariosService.js'

const router = express.Router();
const usuariosService = new UsuariosService();

const validRoles = ['ADMIN', 'ALUMNO', 'PROFESOR', 'PERSONAL'];

router.get('/', async (req, res) => {
    if (req.query?.rol && !validRoles.includes(req.query)) {
        return res.status(400).json({ ok: false, message: 'rol invalido' });
    }
    const usuarios = await usuariosService.getAll(req.query);
    let ok = false;
    if (usuarios) {
        ok = true;
    }
    return res.json({ok , usuarios});
})

router.get('/:id', async (req, res) => {
    const usuario = await usuariosService.getOne(+req.params?.id);
    let ok = false;
    if (usuario) {
        ok = true;
    }
    return res.json({ok , usuario});
})


router.post('/', async (req, res) => {
    let ok = false;
    try {
        const usuario = await usuariosService.create(req.body);
        if (usuario) {
            ok = true;
        }
        return res.json({ok , usuario});
    } catch (error) {
        return res.json({ok , message: error.message});
    }
    
})


export default router;