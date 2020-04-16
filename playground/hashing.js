const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123456";

bcrypt.genSalt(10, (err , salt)=>{
    bcrypt.hash(password , salt , (err , hash)=>{
        console.log(hash)
    })
})

var hashedPassword = "$2a$10$aM94q29V1z3J2uoJoCmBoe64EzSV8udB1mVA7nNVh1A5/eYWXHMKG";

bcrypt.compare("123456" , hashedPassword , (err , res)=>{
    console.log(res)
})

// var message = "Im Mostafa";
// var hash = SHA256(message).toString();

// console.log(`Message ${message}`);
// console.log(`Hash ${hash}`);

// var data = {
//     id: 4
// }

// //signe

// var token = jwt.sign(data , '123abc');

// console.log(token);

// //verify

// var decode = jwt.verify(token , '123abc');

// console.log(decode);
