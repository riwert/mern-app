const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    add_date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Object,
        ref: 'User'
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);
