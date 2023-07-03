const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: { type: String,
        minlength: [3, "emri duhet te jete me i gjate se 3 "] ,
        required: [true,"This field is required"]
    },
    description: {
        type: String,
        required: [true,"This field is required"]
    },
    imgURL: {
        type: String,
        required: [true,"This field is required"]
    },
    price:{
        type: Number,
        required: [true,"This field is required"]
    },
    type:{
        type: String,
        required: [true,"This field is required"]
    } 
},
 { timestamps: true });
module.exports = mongoose.model('Menu', MenuSchema);