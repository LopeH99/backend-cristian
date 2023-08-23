import express from 'express';
import EventosService from '../services/eventosService.js'

const router = express.Router();
const eventoService = new EventosService();


router.get('/', async (req, res) => {
    const eventos = eventoService.getAll();
    let ok = false;
    if (eventos) {
        ok = true;
    }
    res.json({ok, eventos});
})


export default router;