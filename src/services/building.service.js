//import HaversineGeolocation from '../utils/HaversineGeolocation';

const httpStatus = require('http-status');
const { Building } = require('../models');
const ApiError = require('../utils/ApiError');

const HaversineGeolocation = require ('../utils/HaversineGeolocation')


/**
 * Create a user
 * @param {Object} buildingBody
 * @returns {Promise<User>}
 */
const createBuilding = async (buildingBody) => {
  const building = await Building.create(buildingBody);
  return building;
};

const queryBuildings = async (filter, options) => {
  const buildings = await Building.find(filter, options);
  return buildings;
};

const findById = async (id) => {
  const building = await Building.findById(id);
  if (!building) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  return building;
};


const findNearBuilding = async (lat,lng) => {
  const buildings = await Building.find().lean().select('latitude longitude name');

  const currentPoint = {latitude:lat,longitude:lng, accuracy:0}
  const data = HaversineGeolocation.getClosestPosition(
    currentPoint,
    buildings,
    'km'
  );

  return data;
};


module.exports = {
  createBuilding,
  queryBuildings,
  findById,
  findNearBuilding,
};
