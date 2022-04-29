const userController = require('../controllers/user.controller');
const  verifyUserReqBody  = require("../middlewares/verifyUserReqBody");

module.exports = function (app) {

    //Add User
    app.post("/tbc/api/v1/addUser/", [verifyUserReqBody.validateUserRequestBody], userController.addUser);
    //Get detail of all users
    app.get("/tbc/api/v1/addUser/", userController.getUser);

    

    
}