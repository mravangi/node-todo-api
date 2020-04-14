const { MongoClient , ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , client)=>{
    if(err){
        return console.log("unable connect to mongodb");
    }

    const db = client.db('TodoApp')

    //delete many 
    // db.collection('Todos').deleteMany({text: "this is my first insert in mongodb"})
    //.then((result)=>{
    //     console.log(result);
    // },(err)=>{})

    //delete just first one witch match is condition
    // db.collection('Todos').deleteOne({text: "new text"})
    //.then((result)=>{
    //     console.log(result);
    // },(err)=>{})


    // db.collection('Todos').findOneAndDelete({completed: true})
    //.then((result)=>{
    //     console.log(result);
    // },(err)=>{})

    // db.collection('Todos').findOneAndDelete({completed: true}).then((result)=>{
    //     console.log(result);
    // },(err)=>{})

    db.collection('Todos').findOneAndDelete({_id: new ObjectID("5e959eb41640389fc468abec")}).then((result)=>{
        console.log(result);
    },(err)=>{})

    client.close();
})
