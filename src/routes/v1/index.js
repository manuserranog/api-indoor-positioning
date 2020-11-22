const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const buildingRoute = require('./building.route');
const beaconRoute = require('./beacon.route');
const floorRoute = require('./floor.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/buildings', buildingRoute);
router.use('/floors', floorRoute);
router.use('/beacons', beaconRoute);

module.exports = router;
