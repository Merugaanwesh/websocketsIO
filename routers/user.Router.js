const express = require("express");
const Router = express.Router();
const userController = require("../controllers/user.Controller");
const getMessageCon = require("../controllers/getMessage.controller");
//const verifyjwt = require("../middleware/jwtverification")
Router.post("/api/userRegistration", userController.userRegistration);
Router.post("/api/login", userController.logIn);
Router.get("/api/getMessage/:user1/:user2", getMessageCon.getMessage);
module.exports = Router;
