const express = require('express');
const routerUser = require('./user.router');
const routerCity = require('./city.router');
const routerHotel = require('./hotel.router');
const router = express.Router();

router.use('/users', routerUser);
router.use('/cities', routerCity);
router.use('/hotels', routerHotel);

module.exports = router;
