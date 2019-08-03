const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const controller = require('./../controllers/AuthController');

const route = Router();

module.exports = app => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    controller.signUp,
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    controller.signIn,
  );
};
