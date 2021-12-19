const Joi = require('joi');
const mongoose = require('mongoose');

const joiUserAddSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z]+$/i)
    .required(),
  age: Joi.number().min(1).max(120).required(),
  email: Joi.string().trim().min(3).max(200).email().required(),
  password: Joi.string().min(5).max(100).required(),
});

const joiUserUpdateSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z]+$/i),
  age: Joi.number().min(1).max(120),
  email: Joi.string().trim().min(3).max(200).email(),
  password: Joi.string().min(5).max(100),
  userId: Joi.string().custom((val, newErr) =>
    mongoose.Types.ObjectId.isValid(val)
      ? mongoose.Types.ObjectId(val)
      : newErr.message('Netinkamas varotojo identifikatorius')
  ),
});

module.exports = {
  joiUserAddSchema,
  joiUserUpdateSchema,
};
