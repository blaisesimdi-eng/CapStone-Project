function paginate(req, res, next) {
  const { page, limit } = req.query;

  const parsedPage = page === undefined ? 1 : Number(page);
  const parsedLimit = limit === undefined ? 2 : Number(limit);
  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return res.status(200).json({
      status: res.statusCode,
      message: "Page must be a postive integer",
      data: null,
    });
  }
  if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
    return res.status(200).json({
      status: res.statusCode,
      message: "Limit must be a positive integer",
      data: null,
    });
  }
  const skip = (parsedPage - 1) * parsedLimit;
  console.log(parsedLimit, parsedPage, skip);
  req.paginate = {
    skip,
    page: parsedPage,
    limit: parsedLimit,
  };
  next();
}

module.exports = paginate;
