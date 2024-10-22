const { city } = require('../models');

const getAllServices = async () => {
	return await city.findAll();
};

const createServices = async (body) => {
	return await city.create(body);
};

const getOneServices = async (id) => {
	return await city.findByPk(id);
};

const removeServices = async (id) => {
	return await city.destroy({ where: { id } });
};

const updateServices = async (body, id) => {
	return await city.update(body, { where: { id }, returning: true });
};

module.exports = {
	getAllServices,
	createServices,
	getOneServices,
	removeServices,
	updateServices,
};
