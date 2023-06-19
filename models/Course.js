const { Schema, model, Types } = require('mongoose');

// i - caseinsencetive
const URL_PATTERN = /^https?:\/\/.+/i
// TODO add user properties and validation according to assignment
const courseSchema = new Schema({
    title: {
        type: String,
        unigue: true,
        minlength: [4, 'Course title must be at least 4 characters long'],
    },
    description: {
        type: String,
        minlength: [20, 'Description must be at least 20 characters long'],
        maxlength: [50, 'Description must be at most 50 characters long'],
    },
    imageUrl: {
        type: String,
        validate: {
            validator: (value) => { URL_PATTERN.test(value) },
            message: 'Invalid URL'
        }
        // match: [/^https?:\/\/.+/i, 'Invalid URL']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
    },
    createdAt: {
        type: String,
        required: [true, 'Created At is required'],
        // !!! very important !!! - in my rest-api
        default: () => (new Date()).toISOString().slice(0, 10)
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    users: {
        type: [Types.ObjectId],
        ref: "User",
        default: []
    }




})
// index allows to set unique usarname and is important for search - caseinsentative
courseSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})
// example for factory function
const Course = model('Course', courseSchema);
module.exports = Course;