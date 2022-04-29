/**
 * This file will contain the middlewares for valdiating the username and email
 */
const User = require("../models/user.model");
const constants = require("../utils/constants");

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

validateUserRequestBody = async (req, res, next) => {

    if (!req.body.username) {
        res.status(400).send({
            message: "Failed! UserName is not provided !"
        });
        return;
    }  
    if (!req.body.salary) {
        res.status(400).send({
            message: "Failed! Salary is not provided !"
        });
        return;
    }  
    
    if(!Object.values(constants.userRoles).includes(req.body.role)){
        res.status(400).send({
            message: "Failed! Invalid role provided!"
        });
        return;
    }
    //Validating the username
    const user = await User.findOne({ username: req.body.username });
    if (user != null) {
        res.status(400).send({
            message: "Failed! UserName  already exists!"
        });
        return;
    }
    //Validating the email Id
    if (!isValidEmail(req.body.email)) {
        res.status(400).send({
            message: "Failed! Email is not valid!"
        });
        return;
    }

    const email = await User.findOne({ email: req.body.email });
    if (email != null) {
        res.status(400).send({
            message: "Failed! Email already exists!"
        });
        return;
    }
    next();
};





const verifyUserRequestBody = {
    validateUserRequestBody: validateUserRequestBody,
};
module.exports = verifyUserRequestBody



