const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const floorSchema = mongoose.Schema(
  {
    buildingId: {
      type: String,
      required: true,
    },
    floorNumber: {
      type: Number,
      required: true
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    features: {
      type: ['Mixed'],
    },
  },
  {
    timestamps: true,
  }
);

floorSchema.index({ buildingId: 1, floorNumber: 1 }, { unique: true })

// add plugin that converts mongoose to json
floorSchema.plugin(toJSON);
floorSchema.plugin(paginate);


const Floor = mongoose.model('Floor', floorSchema);

module.exports = Floor;
