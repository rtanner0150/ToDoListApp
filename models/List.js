const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: String,
    tasks: [{task:{type: Schema.Types.ObjectId, ref: 'Task'} }]
});

module.exports = mongoose.model('List', listSchema);