const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { beaconService } = require('../services');

const create = catchAsync(async (req, res) => {
  const building = await beaconService.createBeacon(req.body);
  res.status(httpStatus.CREATED).send(building);
});

const get = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await beaconService.queryBeacon(req.query.buildingId);
  res.send(result);
});

module.exports = {
  create,
  get,
};
