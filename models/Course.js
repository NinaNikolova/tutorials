const {Schema, model, Types} = require('mongoose');

// TODO add user properties and validation according to assignment
const courseSchema = new Schema({
    title:{
        type: String,
        required: [true,'Title is required'],
        unigue: true,
        minlength: [4, 'Course title must be at least 4 characters long'],
    },
    description:{
        type: String,
        required:[true,'Description is required'],
        minlength: [20, 'Description must be at least 20 characters long'],

    },
    imageUrl:{
        type: String,
        required: [true,'ImageUrl is required'],
        match: [/^https?:\/\/.+/, 'Invalid URL']
    },
duration:{
    type: String,
    required: [true,'Duration is required'],
},
createdAt:{
    type: String,
    required: [true,'Created At is required'],
},
users:{
    type:[Types.ObjectId],
    ref:"User",
    default:[]
}




})
// index allows to set unic in usarname
courseSchema.index({title: 1 }, {
    collation:{
        locale: 'en',
        strength: 2
    }
})
const Course = model('Course', courseSchema);
module.exports =Course;