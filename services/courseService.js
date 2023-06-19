const Course = require("../models/Course");

function getAll() {
    return Course.find()
}
function getAllByDate() {
    return Course.find().sort({createdAt: 1}).lean()
}
function getById(id) {
    return Course.findById(id)
}
function create(course) {
    return Course.create(course)
}
async function edit(id, course) {
    
}
function deleteById(id) {
    return Course.findByIdAndDelete(id)
}

module.exports = {
    getAll, getAllByDate, deleteById, edit, create, getById
}