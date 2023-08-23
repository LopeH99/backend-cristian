import express from 'express';
import MenusService from '../services/menusService.js'

const router = express.Router();
const menusService = new MenusService();


router.get('/', async (req, res) => {
    const menus = menusService.getAll();
    let ok = false;
    if (menus) {
        ok = true;
    }
    res.json({ok, menus});
})


export default router;