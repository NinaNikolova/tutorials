const mongoose = require('mongoose');

//TODO change database according to assignment
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/scaffold'
mongoose.set('strictQuery', true);
module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected')
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}