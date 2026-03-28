const express = require('express');
const postModel = require("./models/model.app")
const cors = require("cors")
const app = express();
require('dotenv').config()
app.use(cors())
app.use(express.json())

// Post Creation 

app.post('/api/notes', (req, res) => {
    const {title, description} = req.body 

    const posts = postModel.create({
        title,description 
    })

    res.status(201).json({
        message: "Post is sucessfully created...",
    })
})

// Get Post Data

app.get("/api/notes", async (req, res) => {
    const post = await postModel.find()
    res.status(200).json({
        message: "Data received sucessfully...",
        post
    })
})

// Delete Post

app.delete("/api/notes/:id",async (req, res) => {
    const _id = req.params.id
    await postModel.findByIdAndDelete(_id)

    res.status(204).json({
        message: "Deleted Sucessfully..."
    })
})

// Patch Post

app.patch('/api/notes/:id', async (req,res) => {
    const _id = req.params.id
    const {description } = req.body
    await postModel.findByIdAndUpdate(_id, {description})

    res.status(200).json({
        message: "Patch Sucessfully..."
    })
})


module.exports = app