export function verifyUserId(req, res, next) {
  if (parseInt(req.current.id, 10) !== parseInt(req.params.userId, 10)) {
    return res.sendStatus(403);
  }

  return next();
}
