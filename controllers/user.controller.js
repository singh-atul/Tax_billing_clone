const User = require("../models/user.model");
const objectConvertor = require("../utils/objectConcverter");

// Get user information
exports.addUser = async (req, res) =>  {
    const userObj = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        salary: req.body.salary,
        role:req.body.role
    }
    try {
        const userCreated = await User.create(userObj);
        res.status(201).send("User created Successfully");
    } catch (err) {
        console.err("Some error while saving the user in db", err.message);
        res.status(500).send({
            message: "Some internal error while inserting the element"
        })
    }
}

exports.getUser = async (req, res) =>  {
    console.log("45454");
    const user = await User.find();
    if (user) {
        res.status(200).send(objectConvertor.userResponse(user));
    } else {
        res.status(401).send({
            message: `User is not present`
        })
    }


}