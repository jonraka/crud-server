const mongoose = require('mongoose');
const { userModel } = require('../models/userModel');
const {
  sendSuccess,
  sendUserError,
  sendServerError,
} = require('../utils/sender');
const Joi = require('joi');
const { joiUserUpdateSchema } = require('../utils/validators');

// Client.update({_id: id}, client, { runValidators: true }, function(err) {
//     ....
//   });

module.exports = updateUser = (req, res) => {
  joiUserUpdateSchema
    .validateAsync(req.body)
    .then((bodyData) => {
      userModel
        .create(bodyData)
        .then((data) => {
          if (data._id) {
            sendSuccess(res, 'Vartotojas sukūrtas');
          } else {
            sendServerError(res, 'Vidinė klaida #c-au1');
          }
        })
        .catch((err) => {
          if (err.code === 11000) {
            sendUserError(res, 'El. paštas jau egzistuoja');
          } else {
            sendServerError(res, 'Vidinė klaida #c-au2');
          }
        });
    })
    .catch((err) => {
      if (res.details) {
        sendUserError(
          res,
          err.details.map((item) => [
            item.context.key,
            'Netinkamas laukas',
            item.message,
          ])
        );
      } else {
        sendServerError(res, 'Internal Error');
      }
    });
};
