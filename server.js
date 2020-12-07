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
    //     completed   : false
    // });

    // let myList = new List({
    //     name    : 'Ryan\'s List',
    //     tasks   : [
    //         {task: task1._id}
    //     ]
    // });

    // myList.save(function(err, list){
    //     if (err) console.errors(err);
    //     console.log('list saved');
    // })

    let myList = List.find().exec(function(err, lists){
        if (err) return console.errors(err);
        console.log(lists[0]);
    })
    //document.getElementById('output').innerHTML = myList;
});