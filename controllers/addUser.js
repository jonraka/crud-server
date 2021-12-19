const { userModel } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const {
  sendSuccess,
  sendUserError,
  sendServerError,
} = require('../utils/sender');

const { joiUserAddSchema } = require('../utils/validators');

module.exports = addUser = (req, res) => {
  joiUserAddSchema
    .validateAsync(req.body)
    .then(async (bodyData) => {
      bodyData.password = await bcrypt.hash(bodyData.password, 10);

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
            console.log(err);
            sendServerError(res, 'Vidinė klaida #c-au2');
          }
        });
    })
    .catch((err) => {
      if (err.details) {
        sendUserError(
          res,
          err.details?.map((item) => [
            item?.context?.key,
            'Netinkamas laukas',
            item?.message,
          ])
        );
      } else {
        console.log(err);
        sendServerError(res, 'Vidinė klaida');
      }
    });
};
