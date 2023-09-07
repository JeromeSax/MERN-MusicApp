const express = require('express')
const router = express.Router()
const { 
    getMusic, 
    setMusic, 
    updateMusic, 
    deleteMusic,
 } = require('../controllers/musicController')

router.route('/').get(getMusic).post(setMusic)
router.route('/:id').delete(deleteMusic).put(updateMusic)

module.exports = router
