const { MongoClient , ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , client)=>{
    if(err){
        return console.log("unable connect to mongodb");
    }

    const db = client.db('TodoApp')

    // db.collection('Todos').find({completed: false}).toArray().then((doc)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(doc, undefined , 2));
    // },(err)=>{
    //     console.log('unable to  fetch data');
    // })

    // db.collection('Todos').find({_id: new ObjectID("5e9553c8d5d9b30d20f783df")}).toArray().then((doc)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(doc, undefined , 2));
    // },(err)=>{
    //     console.log('unable to  fetch data');
    // })

    db.collection('Todos').find().count().then((count)=>{
        console.log('Todos count: '  + count);
    },(err)=>{
        console.log('unable to  fetch data');
    })

    client.close();
})
