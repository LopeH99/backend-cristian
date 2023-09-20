const roleMiddleware = (allowedMethodsByRole) => {
  return (req, res, next) => {
    const userRole = req.authUser?.rol;

    const allowedMethods = allowedMethodsByRole[userRole] || [];

    if (!userRole) {
      return res.status(401).json({ok: false, error: 'No autenticado' });
    }

    const route = req.baseUrl;
    const method = req.method;

    if (userRole === 'ADMIN' || allowedMethods.includes('*') || allowedMethods.includes(`${method} ${route}`)) {
      next();
    } else {
      return res.status(403).json({ok: false, error: 'No autorizado' });
    }
  };
};
  
  export default roleMiddleware;
  