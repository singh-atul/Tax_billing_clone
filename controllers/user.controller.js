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
    const user = await User.find();
    if (user) {
        res.status(200).send(objectConvertor.userResponse(user));
    } else {
        res.status(401).send({
            message: `User is not present`
        })
    }
}

exports.updateUser = async (req, res) =>  {
    const user = await User.findOne({ username: req.body.username });
    user.name=req.body.name,
    user.salary= req.body.salary,
    user.role=req.body.role
    try{
        await user.save();
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send({message:"Internal Server error"});
    }
}


exports.removeUser = async (req, res) =>  {
    try{
        try{
            const user = await User.findOne({ username: req.params.userName });
            await user.remove();
            res.status(200).send({message:"User deleted successfully"});
        }
        catch(err){
            res.status(500).send({message:"Internal Server error"});
        }
    }
    catch(err){
        res.status(500).send({message:"Some internal server error"});
    }

}
