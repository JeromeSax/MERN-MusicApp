const asyncHandler = require('express-async-handler');
const Musician = require('../models/musicianModel');

// @desc Get all musicians
// @route GET /api/musicians
// @access Private
const getMusicians = asyncHandler(async (req, res) => {
  const musicians = await Musician.find({ user: req.user.id });
  res.status(200).json(musicians);
});

// @desc Create a musician
// @route POST /api/musicians
// @access Private
const createMusician = asyncHandler(async (req, res) => {
  const { name, instrument } = req.body;

  if (!name || !instrument) {
    res.status(400);
    throw new Error('Please provide name and instrument');
  }

  const musician = await Musician.create({
    name,
    instrument,
    user: req.user.id,
  });

  res.status(201).json(musician);
});

// @desc Update a musician
// @route PUT /api/musicians/:id
// @access Private
const updateMusician = asyncHandler(async (req, res) => {
  const { name, instrument } = req.body;

  const musician = await Musician.findById(req.params.id);

  if (!musician) {
    res.status(400);
    throw new Error('Musician not found');
  }

  if (musician.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  musician.name = name || musician.name;
  musician.instrument = instrument || musician.instrument;

  const updatedMusician = await musician.save();

  res.json(updatedMusician);
});

// @desc Delete a musician
// @route DELETE /api/musicians/:id
// @access Private
const deleteMusician = asyncHandler(async (req, res) => {
  const musician = await Musician.findById(req.params.id);

  if (!musician) {
    res.status(400);
    throw new Error('Musician not found');
  }

  if (musician.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await musician.remove();

  res.json({ message: 'Musician removed' });
});

module.exports = {
  getMusicians,
  createMusician,
  updateMusician,
  deleteMusician,
};
