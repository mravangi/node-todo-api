var express = require('express');
var bodyParser = require('body-parser');
const _= require('lodash');

var { mongoose } = require('./db/mongoose');
var { ObjectID } = require('mongodb');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
app.use(bodyParser.json());

app.post('/todos' , (req , res)=>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err)
    })
})

app.get('/todos' , (req , res)=>{
    Todo.find().then((todo)=>{
        res.send({todo});
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req , res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
})

app.delete('/todos/:id' ,(req , res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findOneAndDelete({_id: new ObjectID(id)}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send(todo);
    }).catch((e)=>{
        return res.status(404).send();
    })
})

//برای آپدید کردن هم میتوان از put و هم از patch استفاده کرد
// put باید همه ی آیتم ها ارسال شود
//patch فقط آیتم مورد نظر

app.patch('/todos/:id' , (req , res)=>{
    var id = req.params.id;
    var body = _.pick(req.body , ['text' , 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id , {$set: body} , {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        return res.send(todo);
    }).catch((err)=>{
        return res.status(404).send(err)
    })
})

//user profile
app.get('/user/me' , authenticate , (req , res)=>{
  res.send(req.user)
})

app.post('/users',(req , res)=>{
    var body = _.pick(req.body, ['email' , 'password']);
    var user = new User(body);

    user.save().then((user)=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth' , token).send(user)
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

app.listen(3000 , ()=>{
    console.log('Started on port 3000')
})

module.exports = { app }