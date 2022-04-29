const userController = require('../controllers/user.controller');
const  verifyUserReqBody  = require("../middlewares/verifyUserReqBody");

module.exports = function (app) {

    app.post("/tbc/api/v1/addUser/", [verifyUserReqBody.validateUserRequestBody], userController.addUser);
}