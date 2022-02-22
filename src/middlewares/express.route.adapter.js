// eslint-disable-next-line consistent-return
exports.expressRouteAdapter = ({ routeHandler }) => async (req, res, next) => {
  try {
    const httpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
      user: req.user,
    };

    if (req.files || req.file) {
      httpRequest.files = req.files || [req.file];
    }

    const httpResponse = await routeHandler(httpRequest);

    if (httpResponse.redirect) return res.redirect(httpResponse.redirect);

    return res.status(httpResponse.status).json({
      ...httpResponse.body,
      date: (new Date()).toString(),
    });
  } catch (err) {
    next(err);
  }
};
