const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const beaconSchema = mongoose.Schema(
  {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    bluetoothAddress: {
      type: String,
    },
    distance: {
      type: Number,
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
beaconSchema.plugin(toJSON);
beaconSchema.plugin(paginate);

/**
 * @typedef Building
 */
const Beacon = mongoose.model('Beacon', beaconSchema);

module.exports = Beacon;
