const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const buildingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
buildingSchema.plugin(toJSON);
buildingSchema.plugin(paginate);

buildingSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef Building
 */
const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;
