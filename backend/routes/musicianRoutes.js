const express = require('express')
const router = express.Router()
const { 
    getMusician, 
    setMusician, 
    updateMusician, 
    deleteMusician,
 } = require('../controllers/musicianController')

 const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getMusician).post(protect, setMusician)
router.route('/:id').delete(protect, deleteMusician).put(protect, updateMusician)

module.exports = router