const Joi = require("joi");
const HttpStatus = require("http-status-codes");
const bcrypt = require("bcryptjs");

const users = require("../models/userModel");

module.exports = {
  async SignupUser(request, response) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      date: Joi.string().required(),
    });

    const { error, value } = schema.validate(request.body);

    if (error && error.details) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ validationErrorMessage: error.details });
    }

    const userEmail = await users
      .findOne({
        email: request.body.email,
      })
      .exec();

    if (userEmail) {
      return response
        .status(HttpStatus.CONFLICT)
        .json({ message: "Email già registrata" });
    }

    return bcrypt.hash(value.password, 10, (error, hashedPassword) => {
      if (error) {
        response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Errore nella codifica della password" });
      }

      const newUser = {
        name: value.name,
        lastName: value.lastName,
        email: value.email,
        password: hashedPassword,
        date: value.date,
      };

      users
        .create(newUser)
        .then((user) => {
          response
            .status(HttpStatus.CREATED)
            .json({ message: "Utente creato con successo!", user });
        })
        .catch((error) => {
          response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Errore interno. Riprova più tardi" });
        });
    });
  },

  async LoginUser(request, response) {
    if (!request.body.email || !request.body.password) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Non sono ammessi campi vuoti." });
    }

    await users
      .findOne({ email: request.body.email })
      .then((userFound) => {
        if (!userFound) {
          response
            .status(HttpStatus.NOT_FOUND)
            .json({ message: "Utente non registrato." });
        }

        return bcrypt
          .compare(request.body.password, userFound.password)
          .then((isPasswordCorrect) => {
            if (!isPasswordCorrect) {
              response
                .status(HttpStatus.FORBIDDEN)
                .json({ message: "Password non corretta." });
            }

            response.status(HttpStatus.OK).json({
              message: "Login effettuato con successo :)",
              userFound,
            });
          });
      })
      .catch((error) => {
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Si è verificato un errore, riprovare più tardi." });
      });
  },
};
