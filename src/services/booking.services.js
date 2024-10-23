const { booking } = require('../models');

const getAllServices = async () => {
	return await booking.findAll();
};

const createServices = async (body) => {
	return await booking.create(body);
};

const getOneServices = async (id) => {
	return await booking.findByPk(id);
};

const removeServices = async (id) => {
	return await booking.destroy({ where: { id } });
};

const updateServices = async (body, id) => {
	return await booking.update(body, { where: { id }, returning: true });
};

module.exports = {
	getAllServices,
	createServices,
	getOneServices,
	removeServices,
	updateServices,
};
