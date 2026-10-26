function logger(req, res, next) {
  const time = new Date().toLocaleDateString();
  console.log(`[${req.method}]${time} [${req.url}]`);
  next();
}
module.exports = logger;
