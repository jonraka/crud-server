const { userModel } = require('../models/userModel');
const {
  sendSuccess,
  sendUserError,
  sendServerError,
} = require('../utils/sender');
const { joiUserUpdateSchema } = require('../utils/validators');
const bcrypt = require('bcryptjs');

module.exports = updateUser = (req, res) => {
  joiUserUpdateSchema
    .validateAsync(req.body)
    .then(({ userId, ...dataToUpdate }) => {
      if (!Object.keys(dataToUpdate).length) {
        sendUserError(res, 'Duomenys nepasikeitė');
        return;
      }

      userModel
        .findOne({
          _id: userId,
        })
        .then(async (user) => {
          if (dataToUpdate.password) {
            dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
          }
          Object.assign(user, dataToUpdate);
          return user.save();
        })
        .then((data) => {
          if (data.name) {
            sendSuccess(res, 'Duomenys atnaujinti');
          } else {
            sendServerError(res, 'Vidinė klaida #c-au1');
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.code === 11000) {
            sendUserError(res, 'El. paštas jau egzistuoja');
          } else {
            sendServerError(res, 'Vidinė klaida #c-au2');
          }
        });
    })
    .catch((err) => {
      if (err.details) {
        sendUserError(
          res,
          err.details.map((item) => [
            item.context.key,
            'Blogi duomenys',
            item.message,
          ])
        );
      } else {
        console.log(err);
        sendServerError(res, 'Vidinė klaida');
      }
    });
};
