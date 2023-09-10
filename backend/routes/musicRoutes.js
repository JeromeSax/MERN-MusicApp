const express = require('express')
const router = express.Router()
const { 
    getMusic, 
    setMusic, 
    updateMusic, 
    deleteMusic,
 } = require('../controllers/musicController')

 const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getMusic).post(protect, setMusic)
router.route('/:id').delete(protect, deleteMusic).put(protect, updateMusic)

module.exports = router
