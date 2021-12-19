const { userModel } = require('../models/userModel');
const {
  sendSuccess,
  sendUserError,
  sendServerError,
} = require('../utils/sender');
const mongoose = require('mongoose');

module.exports = getUsers = async (req, res) => {
  const { userId } = req.params;

  const aggregationArray = [
    {
      $project: {
        _id: 1,
        name: 1,
        age: 1,
        email: 1,
      },
    },
  ];

  if (userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      sendUserError(res, 'Netinkamas identifikatorius');
      return;
    }

    aggregationArray.unshift({
      $match: {
        _id: mongoose.Types.ObjectId(userId),
      },
    });
  }

  userModel
    .aggregate(aggregationArray)
    .then((data) => {
      if (userId) { //single user
        if (data?.[0]?.name) {
          sendSuccess(res, data[0]);
        } else {
          sendUserError(res, 'Vartotojas nerastas');
        }
      } else { //multiple users
        sendSuccess(res, data);
      }
    })
    .catch((err) => {
      console.log(err);
      sendServerError(res, 'Vidinė klaida #c-gu1');
    });
};
