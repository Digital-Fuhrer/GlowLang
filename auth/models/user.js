 const {Schema, model} = require('mongoose');

 const schema = new Schema({    
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        unique: false,
        partialFilterExpression: {
            'auctionId.0': { $exists: true }
          }
    },
    difficult: {
        type: String,
        default: false
    },
    stars: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    }
 })

 module.exports = model('user', schema);