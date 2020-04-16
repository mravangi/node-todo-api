const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash'); 
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minLength:1,
        validate: {
            validator:validator.isEmail,
            message: `{VALUE} email is not valid..`
        }
    },
    password:{
        type: String,
        require: true,
        minLength:6
    },
    tokens: [{
        access:{
            type:String,
            require: true
        },
        token:{
            type:String,
            require:true
        }
    }]

});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject , ['_id' , 'email'])
}

UserSchema.methods.generateAuthToken = function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString() , access} , '123456').toString();

    user.tokens.push({access , token});

    return user.save().then(()=>{
        return token;
    })
}

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decode ;

    try {
        decode = jwt.verify(token , '123456');
    } catch (error) {
        return Promise.reject();
    }
    
    return User.findOne({
        '_id' : decode._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    })
}

UserSchema.pre('save' , function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10 , (err , salt)=>{
            bcrypt.hash(user.password , salt , (err , hash)=>{
                user.password = hash;
                next();
            })  
        })
    }else{
        next();
    }
})

var User = mongoose.model('user' , UserSchema)

module.exports = { User };