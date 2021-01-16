const HttpStatus = require("http-status-codes");

const users = require("../models/userModel");
module.exports = {
  async getUser(request, response) {
    await users
      .findById(request.body._id)
      .then((userFound) => {
        return response
          .status(HttpStatus.OK)
          .json({ message: "Utente trovato.", userFound });
      })
      .catch((error) => {
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Si è verificato un errore, riprovare più tardi." });
      });
  },
};
