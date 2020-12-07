const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://rtanner:Stealth20@todolistapp.e1vg3.mongodb.net/todolist-db?retryWrites=true&w=majority'

let Task = require('./models/Task.js');
let List = require('./models/List.js');

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) return console.errors(err);
    console.log('Connected to database');
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('mongoose connected');

    // const poopSchema = new mongoose.Schema({
    //     name: String,
    //     number: Number
    // });
    // const Poop = mongoose.model('Poop', poopSchema);

    // let task1 = new Task({
    //     name        : 'Do Laundry',
    //     priority    : 'Medium',
    //     assignedTo  : 'Ryan',
    //     completed   : true
    // });
    // task1.save(function(err){
    //     if (err) console.errors(err);
    //     console.log('task saved');
    // });

    // let myList = new List({
    //     name    : 'Ryan\'s List'
    // });
    // myList.tasks.push(task1);
    // myList.save(function(err, list){
    //     if (err) console.errors(err);
    //     console.log('list saved');
    // });

    // let myList = List.findOneAndDelete().exec(function(err, list){
    //     if (err) return console.errors(err);
    //     console.log('list deleted');
    // })

    /* getting populate() to work:
        problem was that i was creating the task locally, adding it to the list, and saving the list to the DB
        but i wasn't saving the task to the DB, so the list had a refId to an object that did not exist
        making sure the task is saved to the DB as well allows me to populate() by id correctly 
        must remember */
    // let myList = List.findOne().populate('tasks').exec(function(err, list){
    //     if (err) return console.errors(err);
    //     //console.log(list);
    //     Task.find({name: 'Add some data'}).then(function(task){
    //         if (err) return console.errors(err);
    //         list.tasks.push(task);
    //     }); 
        
    // });

    // let myTask = Task.find({name: 'Add some data'}).exec(function(err, task){
    //     if (err) return console.errors(err);
    //     console.log(task);
    // });
    // console.log(myList);

    Task.findOneAndUpdate({name: 'Do Laundry'}, {priority: 'Low'}, function(){console.log('item updated?')});
});