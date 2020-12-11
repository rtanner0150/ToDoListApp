const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://rtanner:Stealth20@todolistapp.e1vg3.mongodb.net/todolist-db?retryWrites=true&w=majority';
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

let Task = require('./models/Task.js');
let List = require('./models/List.js');

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) return console.errors(err);
    console.log('Connected to database');
});
//open connection to db
const db = mongoose.connection;
//error handling for db connection
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('The Express server is running at port ' + port);
});

app.get('/tasks', (request, response) => {
    Task.find((err, items) => {
        if (err) return console.error(err);
        response.send(items);
    })
});

app.get('/tasks/:id', (request, response) => {
    Task.findOne({_id: request.params.id}).exec((err, item) => {
        if (err) return console.error(err);
        response.send(item);
    })
});

app.get('/search/:prop/:val', (request, response) => {
    let propParam = request.params.prop;
    let valParam = request.params.val;
    console.log(propParam, valParam);
    //let valParam = new RegExp(request.params.val, 'i');
    Task.find({propParam: valParam}).exec((err, items) => {
        if (err) return console.error(err);
        response.send(items);
    })
});

// app.delete('/tasks/:id', (request, response) => {
//     Task.findOneAndDelete({_id: request.params.id}).exec((err, item) => {

//     });
// });

// db.once('open', function(){
//     console.log('mongoose connected');

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

    //Task.findOneAndUpdate({name: 'Do Laundry'}, {priority: 'Low'}, function(){console.log('item updated?')});
// });