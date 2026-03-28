const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect(env.process.Db_link)
    .then(()=>{
        console.log('Database is connected ...')
    })
}

module.exports = connectToDb