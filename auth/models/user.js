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
    }
 })

 module.exports = model('user', schema);