const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
    accName: {
        type: String,
        required: true
    },
    accNo: {
        type: String,
        required: true

    },
    bank: {

        type: String,
        required: true
    },
    name: {

        type: String,
        required: true
    },
    phone: {

        type: Number,
        required: true
    },
   


});

const Details = mongoose.model('Details', DetailsSchema);

module.exports = Details;
