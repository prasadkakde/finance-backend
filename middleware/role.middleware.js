const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('Not authenticated');
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error('Access denied');
    }

    next();
  };
};

export default roleMiddleware;