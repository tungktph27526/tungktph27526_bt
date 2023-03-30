const mongoose = require('mongoose');
const nhanvienSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    diachi:{
        type: String
    },
    luong:{
        type: Number,
        default:0
    }
})
const nhanvienmodel = new mongoose.model('nhanvien', nhanvienSchema);
module.exports =  nhanvienmodel;