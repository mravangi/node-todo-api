const { MongoClient , ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , client)=>{
    if(err){
        return console.log("unable connect to mongodb");
    }

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: "this is my first insert in mongodb",
    //     completed: false
    // },(err , result) =>{
    //     if(err){
    //         return console.log('Unable to insert todo ' , err)
    //     }
    //     console.log(JSON.stringify(result.ops , undefined , 2))
    // })

    db.collection('Users').insertOne({
        name: "Morteza",
        age: 28,
        location : "minab"
    },(err , result) =>{
        if(err){
            return console.log('Unable to insert todo ' , err)
        }
        console.log(JSON.stringify(result.ops[0]._id , undefined , 2))
        console.log(result.ops[0]._id.getTimestamp()) //get time stamp from id
    })

    console.log("mongodb connected");

    client.close();
})
