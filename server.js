const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://rtanner:Stealth20@todolistapp.e1vg3.mongodb.net/todolist-db?retryWrites=true&w=majority';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

let port = process.env.PORT || 3000;

let Task = require('./models/Task.js');
let List = require('./models/List.js');

const dbCheck = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) return console.errors(err);
    console.log('Connected to database');
}).then(() => {console.log(dbCheck)});
//open connection to db
const db = mongoose.connection;
//error handling for db connection
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

if (process.env.NODE_ENV === 'production'){
    console.log('in production');
}

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

app.post('/tasks', (request, response) => {
    let t = new Task(request.body);
    t.save((err, t) => {
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.sendStatus(200);
    })
});

app.delete('/tasks/:id', async (request, response) => {
    try {
        await Task.deleteOne({_id: request.params.id});
        response.sendStatus(204);
    } catch {
        response.sendStatus(404);
    }
});

app.put('/tasks/:id', async (request, response) => {
    let updatedTask = new Task(request.body);
    Task.findOne({_id: request.params.id}).exec((err, item) => {
        if (err) return console.error(err);
        item.name = updatedTask.name;
        item.assignedTo = updatedTask.assignedTo;
        item.priority = updatedTask.priority;
        item.completed = updatedTask.completed;
        try {
            response.sendStatus(200);
            item.save();
        } catch {
            response.sendStatus(500);
        }
    });
});

app.patch('/tasks/toggle-complete/:id', async (request, response) => {
    Task.findOne({_id: request.params.id}).exec((err, item) => {
        if (err) return console.error(err);
        item.completed = request.body.completed;
        try {
            response.sendStatus(200);
            item.save();
        } catch {
            response.sendStatus(500);
        }
    });
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