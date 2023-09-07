const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Get music' })
})

router.post('/', (req, res) => {
    res.status(200).json({ message: 'Set music' })
})

router.put('/:id', (req, res) => {
    res.status(200).json({ message: `Update music ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Delete music ${req.params.id}` })
})

module.exports = router
