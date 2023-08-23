import express from 'express';
import HorariosService from '../services/horariosService.js'

const router = express.Router();
const horariosService = new HorariosService();


router.get('/', async (req, res) => {
    const horarios = horariosService.getAll();
    let ok = false;
    if (horarios) {
        ok = true;
    }
    res.json({ok, horarios});
})


export default router;