const mongoose = require('mongoose')
const History = require('../models/History');

const getHistoryForUser = async (req, res) => {
    debugger
    let histories;
    try {
        debugger
        histories = await History.find({"userId":req.params.userId})//.populate({path:'userId',match:req.params.userId})
        console.log(histories)
        if(histories==null){
            res.status(200).json(histories)
        }
        else
        res.status(200).json({ res:histories })

    }
    catch (error) {
        debugger
        console.log("error")
        res.status(400).json({ errorMessage: error })
    }
}

const getAllHistory = async (req, res) => {
    debugger
    let histories;
    try {
        debugger
        histories = await History.find()
        console.log(histories)
        res.status(200).json({ res:histories })
    }
    catch (error) {
        debugger
        console.log("error")
        res.status(400).json({ errorMessage: error })
    }
}

const getHistory = async (req, res) => {
    console.log(req.params.id);
    debugger
    let history;
    try {
        debugger
        history = await History.findById(req.params.id)
        debugger
        if (history == null) {
            res.send("could not have history")
        }
        return res.json({ status: 200, theHistory: history })
    }
    catch (error) {
        debugger
        res.status(400).json({ errorMessage: error })
    }
}

const saveHistory = async (req, res) => {
    const { dateTime, userId, cityName,country,description,temp } = req.body
    let currentHistory = new History({
        dateTime,userId,cityName,country,description,temp
    });

     currentHistory.save().then(() => {
        console.log(currentHistory)
        return res.status(200).json({
            currentHistory
        })
    }).catch((err)=>{res.json(err)});

}

module.exports = { getHistory, saveHistory,getAllHistory,getHistoryForUser };