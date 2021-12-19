const { userModel } = require('../models/userModel');
const {
  sendSuccess,
  sendUserError,
  sendServerError,
} = require('../utils/sender');
const mongoose = require('mongoose');

module.exports = getUsers = async (req, res) => {
  const { userId } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    sendUserError(res, 'Netinkamas identifikatorius');
    return;
  }

  userModel
    .deleteOne({
      _id: userId,
    })
    .then(({ deletedCount }) => {
      if (deletedCount) {
        sendSuccess(res, 'Vartotojas ištrintas');
      } else {
        sendUserError(res, 'Vartotojas nerastas');
      }
    })
    .catch((err) => {
      console.log(err);
      sendServerError('Nepavyko ištrinti vartotojo');
    });
};
