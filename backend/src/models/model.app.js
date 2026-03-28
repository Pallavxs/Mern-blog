const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    description: String
})

const postModel = mongoose.model("Note", postSchema)

module.exports = postModel