// @desc Get music
// @route GET /api/music
// @access Private
const getMusic = (req, res) => {
    res.status(200).json({ message: 'Get music' })
}

// @desc Set music
// @route POST /api/music
// @access Private
const setMusic = (req, res) => {
    res.status(200).json({ message: 'Set music' })
}

// @desc Update music
// @route PUT /api/music/:id
// @access Private
const updateMusic = (req, res) => {
    res.status(200).json({ message: `Update music ${req.params.id}` })
}

// @desc Delete music
// @route DELETE /api/music/:id
// @access Private
const deleteMusic = (req, res) => {
    res.status(200).json({ message: `Delete music ${req.params.id}` })
}

module.exports = {
    getMusic,
    setMusic,
    updateMusic,
    deleteMusic
}