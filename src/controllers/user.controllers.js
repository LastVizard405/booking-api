const { getAllServices, createServices, getOneServices, removeServices, updateServices } = require('../services/user.services');
const catchError = require('../utils/catchError');

const jwt = require('jsonwebtoken');

const getAll = catchError(async (req, res) => {
	const results = await getAllServices();
	return res.json(results);
});

const create = catchError(async (req, res) => {
	const result = await createServices({ ...req.body, password: req.passwordHash });
	return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	const result = await getOneServices(id);
	if (!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async (req, res) => {
	const { id } = req.params;
	const result = await removeServices(id);
	if (!result) return res.sendStatus(404);
	return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
	const { id } = req.params;
	const result = await updateServices(req.body, id);
	if (result[0] === 0) return res.sendStatus(404);
	return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
	const user = req.userLogged;
	if (!user) return res.status(401).json({ error: 'Invalid credentials' });

	const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
	return res.json({ user, token });
});

const logged = catchError(async (req, res) => {
	return res.json(req.user);
});

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update,
	login,
	logged,
};
