exports.notFound = function(req, res, next) {
  res.status(404);
  res.render('errors/not-found');
};

exports.serverError = function(error, req, res, next) {
  res.status(500);
  res.render('errors/server-error', {error: error});
};
