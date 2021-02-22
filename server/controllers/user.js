const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const User = require('../models/User');

//read


const getAll = (req, res) => {
    User.find({}, function (err, result_e) {
        console.log(result_e)
        return res.status(200).json({
            result: result_e
        })
    })
}

const getAllUsers = async (req, res) => {
    let users;
    try {
        debugger
        users = await User.find()
        console.log(User)
        console.log("url = ", req.url, "  req-body  = ", req.body, "res-type  = ", res.get('Content-Type'));
        res.status(200).json({ users })
    }
    catch (error) {
        debugger
        res.status(400).json({ errorMessage: error })
    }
}
const getUserByEmail = async (req, res) => {
    debugger
    try {
        let user = await User.findOne({ email: req.params.email})
        if (user == null) {
            console.log("!!!!!!!!!!")
            res.status(400)
            res.send("could not have user")
        }
        else {
            console.log("___________")
            res.send(user)
        }
        return user
    } catch (error) {

        console.log(error.errorMessage)
        res.status(400).json({ err: error.errorMessage })

    }

}

const getUserLogin = async (req, res) => {
    console.log("!!!")
    debugger
    try {
        let user = await User.findOne({ email: req.params.email, pass: req.params.pass })
        if (user == null) {
            res.status(400)
            res.send("could not have user")
        }
        else {
            console.log("!!")
            
            res.status(200).send( user )
        }
        return user
    } catch (error) {
        console.log("error.errorMessage",error)

        console.log(error.errorMessage)
        res.status(400).json({ err: error.errorMessage })

    }

}

const getUser = async (req, res) => {
    console.log(req.params.id);
    debugger
    let user;
    try {
        debugger
        user = await User.findById(req.params.id)
        debugger
        if (user == null) {
            res.send("could not have user")
        }
        return res.json({ status: 200, theUser: user })
    }
    catch (error) {
        debugger
        res.status(400).json({ errorMessage: error })
    }
}


//create
const saveUser = async (req, res) => {

    const { first_name, last_name, email, pass } = req.body
    const currentUser = new User({
        first_name,
        last_name,
        email,
        pass
    });
    currentUser.save().then(() => {
        console.log(currentUser)
        return res.status(200).json({
            currentUser
        })
    })
    .catch((err)=>{res.json(err)});
}

module.exports = { getUser, getAllUsers, getAll, saveUser, getUserLogin ,getUserByEmail};