const asyncHandler = require('express-async-handler')

const Music = require('../models/musicModel')

// @desc Get music
// @route GET /api/music
// @access Private
const getMusic = asyncHandler(async (req, res) => {
    const music = await Music.find()
    
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
    })

    res.status(200).json(music)
})

// @desc Update music
// @route PUT /api/music/:id
// @access Private
const updateMusic = asyncHandler(async (req, res) => {
    const music = await Music.findById(req.params.id)

    if(!music) {
        res.status(400)
        throw new Error('Music not found')
    }

    const updatedMusic = await Music.findByIdAndUpdate(req.params.id, req.
    body, {
        new: true, 
    })

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

    await Music.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getMusic,
    setMusic,
    updateMusic,
    deleteMusic
}