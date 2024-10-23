const { image } = require('../models');

const getAllServices = async () => {
	return await image.findAll();
};

const createServices = async (body) => {
	return await image.create(body);
};

const getOneServices = async (id) => {
	return await image.findByPk(id);
};

const removeServices = async (id) => {
	return await image.destroy({ where: { id } });
};

const updateServices = async (body, id) => {
	return await image.update(body, { where: { id }, returning: true });
};

module.exports = {
	getAllServices,
	createServices,
	getOneServices,
	removeServices,
	updateServices,
};
