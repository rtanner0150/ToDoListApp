const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

module.exports = mongoose.model('List', listSchema);