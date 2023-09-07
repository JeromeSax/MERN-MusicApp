const asyncHandler = require('express-async-handler')

// @desc Get music
// @route GET /api/music
// @access Private
const getMusic = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get music' })
})

// @desc Set music
// @route POST /api/music
// @access Private
const setMusic = asyncHandler(async (req, res) => {
    if(!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }

    res.status(200).json({ message: 'Set music' })
})

// @desc Update music
// @route PUT /api/music/:id
// @access Private
const updateMusic = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update music ${req.params.id}` })
})

// @desc Delete music
// @route DELETE /api/music/:id
// @access Private
const deleteMusic = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete music ${req.params.id}` })
})

module.exports = {
    getMusic,
    setMusic,
    updateMusic,
    deleteMusic
}