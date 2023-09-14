const asyncHandler = require('express-async-handler')

const Music = require('../models/musicModel')
const User = require('../models/userModel')

// @desc Get music
// @route GET /api/music
// @access Private
const getMusic = asyncHandler(async (req, res) => {
    const music = await Music.find({ user: req.user.id })
    
    res.status(200).json(music)
})

// @desc Set music
// @route POST /api/music
// @access Private
const setMusic = asyncHandler(async (req, res) => {
    if(!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }

    const music = await Music.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(music)
})

// @desc Update music
// @route PUT /api/music/:id
// @access Private
const updateMusic = asyncHandler(async (req, res) => {
    // Find the music object by its ID
    const music = await Music.findById(req.params.id)

     // If the music object is not found, return an error response
    if(!music) {
        res.status(400)
        throw new Error('Music not found')
    }
 
    // Check for user authentication
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the music user
    if(music.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const { text } = req.body; //  update the 'text' property

    // Update the music object
//     log the request body and music ID
    console.log(req.body, req.params.id)
    // Update the text property of the music object, set the text property to the new value
    const updatedMusic = await Music.findByIdAndUpdate(req.params.id, {text: text}, { new: true } ); // Return the updated music object

    res.status(200).json(updatedMusic)
})

// @desc Delete music
// @route DELETE /api/music/:id
// @access Private
const deleteMusic = asyncHandler(async (req, res) => {
    const music = await Music.findById(req.params.id)

    if(!music) {
        res.status(400)
        throw new Error('Music not found')
    }


 
    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the music user
    if(music.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Music.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getMusic,
    setMusic,
    updateMusic,
    deleteMusic
}