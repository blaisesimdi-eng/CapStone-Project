const jwt = require("jsonwebtoken");
function authtenticate(req, res, next) {
  const authHeaders = req.headers.authorization || req.headers.Authorization;
  //Ensure authorization is valid
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authorId = decoded.id;
    req.firstName = decoded.firstName;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({
      status: res.statusCode,
      message: "Invalid or expired token",
    });
  }
}

module.exports = authtenticate;
