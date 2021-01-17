const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

const ITEM = mongoose.model("ITEM", ItemSchema);

module.exports = {
    ITEM
};