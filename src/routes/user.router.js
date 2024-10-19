const { getAll, create, getOne, remove, update, login, logged } = require('../controllers/user.controllers');
const express = require('express');
const hash = require('../middlewares/hash.middlewares');
const credentials = require('../middlewares/login.middlewares');
const { verifyJWT } = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/').get(verifyJWT, getAll).post(hash, create);

routerUser.route('/login').post(credentials, login);

routerUser.route('/me').get(verifyJWT, logged);

routerUser.route('/:id').get(verifyJWT, getOne).delete(verifyJWT, remove).put(verifyJWT, update);

module.exports = routerUser;
