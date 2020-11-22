const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { buildingService } = require('../services');

const createBuilding = catchAsync(async (req, res) => {
  const building = await buildingService.createBuilding(req.body);
  res.status(httpStatus.CREATED).send(building);
});

const getBuildings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  //const options = pick(req.query, ['sortBy', 'limit', 'page']);
  var options = {
    select: 'id name description'
  };

  var result;
  if (req.query.latitude && req.query.longitude) {

    result = await buildingService.findNearBuilding(req.query.latitude, req.query.longitude);

  } else {
    result = await buildingService.queryBuildings(filter, options);
  }

  res.send(result);
});

const findById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await buildingService.findById(id);
  res.send(result);
});

module.exports = {
  createBuilding,
  getBuildings,
  findById
};
