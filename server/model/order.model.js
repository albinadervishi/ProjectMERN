const mongoose = require('mongoose');
const User = require('../model/user.model');
const Menu = require('../model/menu.model');

const OrderSchema = new mongoose.Schema({
    price:{
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        menu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
        },
        quantity: {
            type: Number,
        }
    }],
},
 { timestamps: true });
 
module.exports = mongoose.model('Order', OrderSchema);