import express from 'express';
import LicenciasService from '../services/licenciasService.js'

const router = express.Router();
const licenciasService = new LicenciasService();


router.get('/', async (req, res) => {
    const licencias = await licenciasService.getAll(req.query);
    let ok = false;
    if (licencias) {
        ok = true;
    }
    res.json({ok, licencias});
})


router.post('/', async (req, res) => {
    let ok = false;
    try {
        const licencias = await licenciasService.create(req.body);
        if (licencias) {
            ok = true;
        }
        res.json({ok, licencias});
    } catch (error) {
        res.json({ok, message: error.message})
    }
   
})

//editar
router.put('/:id', async (req, res) => {
    let ok = false;
    const id = +req.params?.id;
    if (!id) {
        return res.json({ ok: false, message: "Debe ingresar un id" });
    }
    const licencia = await licenciasService.getOne(id);
    if (!licencia) {
        return res.json({ ok: false, message: "la licencia indicada no existe" });        
    }

    try {
        const licencia = await licenciasService.update(id, req.body);
        if (licencia) {
            ok = true;
        }
        res.json({ok, licencia});
    } catch (error) {
        res.json({ok, message: error.message})
    }   
})

//autorizar
router.post('/autorizar/:id', async (req, res) => {
    let ok = false;
    const id = +req.params?.id;
    if (!id) {
        return res.json({ ok: false, message: "Debe ingresar un id" });
    }
    const licencia = await licenciasService.getOne(id);
    if (!licencia) {
        return res.json({ ok: false, message: "la licencia indicada no existe" });        
    }

    const authUser = req.authUser;
    try {
        const licencia = await licenciasService.autorizar(id, authUser.id);
        if (licencia) {
            ok = true;
        }
        res.json({ok, licencia, message: 'Licencia autorizada'});
    } catch (error) {
        res.json({ok, message: error.message})
    }   
})

//eliminar
router.delete('/:id', async (req, res) => {
    let ok = false;
    const id = +req.params?.id;
    if (!id) {
        return res.json({ ok: false, message: "Debe ingresar un id" });
    }
    const licencia = await licenciasService.getOne(id);
    if (!licencia) {
        return res.json({ ok: false, message: "la licencia indicada no existe" });        
    }

    try {
        const licencia = await licenciasService.delete(id);
        if (licencia) {
            ok = true;
        }
        res.json({ok, message: 'licencia eliminada', licencia});
    } catch (error) {
        res.json({ok, message: error.message})
    }   
})

export default router;