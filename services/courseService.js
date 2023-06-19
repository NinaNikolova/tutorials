const Course = require("../models/Course");

function getAll() {
    return Course.find()
}
function getAllByDate(search) {
    const query = {}
    if(search){
       query.title = new RegExp(search, 'i')
    }
         return Course.find(query).sort({createdAt: 1}).lean()
    
  
   
}
async function getRecent() {
    return Course.find({}).sort({usersCount:-1}).limit(3).lean();
}
function getById(id) {
    return Course.findById(id)
}
function create(course) {
    return Course.create(course)
}
async function edit(id, data) {
    const existing  = await Course.findById(id);
    existing.title = data.title;
    existing.description = data.description;
    existing.imageUrl = data.imageUrl;
    existing.duration = data.duration;
    return existing.save()
}
function deleteById(id) {
    return Course.findByIdAndDelete(id)
}
async function enroll(id, userId) {
    const existing  = await Course.findById(id);
    existing.users.push(userId);
    existing.usersCount++;
    return existing.save()
}

module.exports = {
    getAll, getAllByDate, deleteById, edit, create, getById, getRecent, enroll
}