const mongoose = require('mongoose')
const historySchema = mongoose.Schema({
    dateTime: {
        type: Date,
     
    },
    userId: {
        type:String,
        ref:'User'
    },
    cityName: {
        type: String,
        minlength: 2,
    },   
    description: {
        type: String,
    },
    country: {
        type: String,
    },
    temp: {
        type: String,
    }

})
module.exports = mongoose.model('History', historySchema);