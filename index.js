import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import authRoutes from './routes/auth.js'
import eventosRoutes from './routes/eventos.js'
import horariosRoutes from './routes/horarios.js'
import licenciasRoutes from './routes/licencias.js'
import menusRoutes from './routes/menus.js'
import sugerenciasRoutes from './routes/sugerencias.js'
import usuariosRoutes from './routes/usuarios.js'
import authMiddleware from './middlewares/authMiddleware.js';
import roleMiddleware from './middlewares/rolMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());


const allowedMethodsByRole = {
  ADMIN: ['*'],
  PROFESOR: ['GET /eventos','GET /sugerencias','GET /horarios'],
  PERSONAL: ['GET /eventos','GET /sugerencias','GET /horarios','GET /menus'],
  ALUMNO: [],
};


app.use('/auth', authRoutes);
app.use('/eventos',authMiddleware,roleMiddleware(allowedMethodsByRole), eventosRoutes);
app.use('/horarios',authMiddleware,roleMiddleware(allowedMethodsByRole), horariosRoutes);
app.use('/licencias',authMiddleware,roleMiddleware(allowedMethodsByRole), licenciasRoutes);
app.use('/menus',authMiddleware,roleMiddleware(allowedMethodsByRole), menusRoutes);
app.use('/sugerencias',authMiddleware,roleMiddleware(allowedMethodsByRole), sugerenciasRoutes);
app.use('/usuarios',authMiddleware,roleMiddleware(allowedMethodsByRole), usuariosRoutes);

// Define routes and middleware here
app.get('/', (req,res) =>  {
    return res.json({message: "API Tesis"})});

app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});

