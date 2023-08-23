
/**
 * @author Chinmoy Das
 * @created 23/08/2023
 */
const Joi = require("joi");


const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
});

// Middleware function to validate the request body
const validateRegistration = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  next();
};
const validatelogin = (req, res, next) => {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
     
    });
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  next();
};

module.exports = {
  validateRegistration: validateRegistration,
  validatelogin: validatelogin,
};
