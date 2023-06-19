const {Schema, model, Types} = require('mongoose');

// TODO add user properties and validation according to assignment
const userSchema = new Schema({
    username: {
        type: String,
        required: [true,'Username is required'],
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long'],
        // match:[/^[a-zA-Z0-9]+$/i,'Username may contain only english letters and numbers']
    },
    hashedPassword: {
        type: String,
        required: true
    },
    courses:{
        type: [Types.ObjectId],
        ref: 'Course',
        default:[]
    }
})
// index allows to set unic in usarname
userSchema.index({username: 1 }, {
    collation:{
        locale: 'en',
        strength: 2
    }
})
const User = model('User', userSchema);
module.exports =User;