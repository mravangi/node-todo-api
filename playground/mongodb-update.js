const { MongoClient , ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , client)=>{
    if(err){
        return console.log("unable connect to mongodb");
    }

    const db = client.db('TodoApp')

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5e959eb41640389fc468abe9")
    // },{
    //     $set:{
    //         completed: false
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result)=>{
    //     console.log(result);
    // },(err)=>{})

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5e95638f2cb31f0d5834d917")
    },{
        $inc:{
            age: 2
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    },(err)=>{})

    client.close();
})
