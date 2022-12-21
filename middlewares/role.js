const roleCheck = (role) => (req, res, next) =>
  !role === req.user.role ? res.status(401).json("Forbidden") : next();

module.exports = roleCheck;
