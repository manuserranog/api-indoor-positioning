const httpStatus = require('http-status');
const { Floor } = require('../models');
const { buildingService } = require('../services');
const ApiError = require('../utils/ApiError');

var ObjectId = require('mongoose').Types.ObjectId;

const create = async (floorBody) => {
  if(!ObjectId.isValid(floorBody.buildingId)){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Building id not valid');
  }

  const building = buildingService.findById(floorBody.buildingId);
  var floor = null;
  if(building){
    floor = await Floor.create(floorBody);
  }


  return floor;
};

const queryFloors= async () => {
  const floors = await Floor.find().select('buildingId floorNumber');
  return floors;
};

const findById = async (id) => {
  const floor = await Floor.findById(id);
  if (!floor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Floor not found');
  }
  return floor;
};

const findByBuildingId = async (buildingId,floorNumber) => {

  const building = await Floor.find({buildingId: buildingId}).select('floorNumber');
  if (!building) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  return building;
};


const findOneByBuildingIdAndFloorNumber = async (buildingId, floorNumber) => {

  const building = await Floor.findOne({buildingId: buildingId, floorNumber: floorNumber}).lean().select('-_id type features');

  if (!building) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  return building;
};

module.exports = {
  create,
  queryFloors,
  findById,
  findByBuildingId,
  findOneByBuildingIdAndFloorNumber
};
