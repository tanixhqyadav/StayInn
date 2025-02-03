const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000
  },
  perks: {
    type: [String],
    default: [],
    enum: ['WiFi', 'Parking', 'TV', 'Pool', 'Gym', 'Kitchen', 'Air Conditioning']
  },
  extraInfo: {
    type: String,
    trim: true,
    maxlength: 2000,
    default: ''
  },
  checkIn: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  checkOut: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  maxGuests: {
    type: Number,
    required: true,
    min: 1,
    max: 50
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});


const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;
