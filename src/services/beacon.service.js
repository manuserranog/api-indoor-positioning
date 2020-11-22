const { Beacon } = require('../models');
/**
 * Create a beacon
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createBeacon = async (userBody) => {
  const beacon = await Beacon.create(userBody);
  return beacon;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBeacon = async (building) => {
  //const beacons = await Beacon.paginate(filter, options);
  const beacons = await Beacon.find({ building: building });
  return beacons;
};

module.exports = {
  createBeacon,
  queryBeacon
};
