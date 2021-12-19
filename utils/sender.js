const sendSuccess = (res, data) =>
  res.status(200).send({
    success: true,
    data,
  });

const sendServerError = (res, data) =>
  res.status(500).send({
    success: false,
    error: data,
  });

const sendUserError = (res, data) =>
  res.status(400).send({
    success: false,
    error: data,
  });

const sendNotAuthorized = (res, data) =>
  res.status(401).send({
    success: false,
    error: data,
  });

const sendNotFound = (res) =>
  res.status(404).send({
    success: false,
    error: 'Puslapis nerastas',
  });

const sendJsonError = (res) =>
  res.status(400).send({
    success: false,
    error: 'Invalid JSON',
  });

module.exports = {
  sendSuccess,
  sendServerError,
  sendUserError,
  sendNotAuthorized,
  sendNotFound,
  sendJsonError,
};
