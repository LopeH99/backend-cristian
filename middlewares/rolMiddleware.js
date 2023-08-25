const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.authUser?.rol;
  
      if (!userRole) {
        return res.status(401).json({ error: 'No autenticado' });
      }
  
      // Controlar si el rol indicado esta autorizado
      if (allowedRoles.includes(userRole)) {
        next(); // Sigue con el proximo middleware
      } else {
        return res.status(403).json({ error: 'No autorizado' });
      }
    };
  };
  
  export default roleMiddleware;
  