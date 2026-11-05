const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    console.log(req);
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({
        status: res.statusCode,
        message: "Acess denied, input correct token",
      });
    }

    // console.log(req.role, allowedRoles);
    next();
  };
};
module.exports = authorizeRole;
