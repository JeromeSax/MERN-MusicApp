const mongoose = require('mongoose');

const musicianSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    instrument: {
      type: String,
      required: [true, 'Please add an instrument']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Musician', musicianSchema);
