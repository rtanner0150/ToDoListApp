const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name        : String,
    assignedTo  : String,
    priority    : {type: String, enum: ['Low', 'Medium', 'High']},
    completed   : Boolean
},
{
    timestamps  : true
});

module.exports = mongoose.model('Task', taskSchema);