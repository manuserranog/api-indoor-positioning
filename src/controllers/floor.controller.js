const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { floorService } = require('../services');

const create = catchAsync(async (req, res) => {
  const building = await floorService.create(req.body);
  res.status(httpStatus.CREATED).send(building);
});

const findAll = catchAsync(async (req, res) => {
  const buildingId = req.query.buildingId;
  const floorNumber = req.query.floorNumber;

  if (buildingId && floorNumber) {
    result = await floorService.findOneByBuildingIdAndFloorNumber(buildingId,floorNumber);
  } else {
    result = await floorService.queryFloors();
  }

  res.send(result);
});

const findById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await floorService.findById(id);

  res.send(result);
});


const findOneByBuildingIdAndFloorNumber = catchAsync(async (req, res) => {
  const buildingId = req.query.buildingId;
  const floorNumber = req.query.floorNumber;

  const result = await floorService.findOneByBuildingIdAndFloorNumber(buildingId, floorNumber);

  res.send(result);
});



module.exports = {
  create,
  findAll,
  findById,
  findOneByBuildingIdAndFloorNumber
};
