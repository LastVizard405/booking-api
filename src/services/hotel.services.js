const { hotel, city, image } = require('../models');

const getAllServices = async () => {
	return await hotel.findAll({ include: [city, image] });
};

const createServices = async (body) => {
	return await hotel.create(body);
};

const getOneServices = async (id) => {
	return await hotel.findByPk(id, { include: [city, image] });
};

const removeServices = async (id) => {
	return await hotel.destroy({ where: { id } });
};

const updateServices = async (body, id) => {
	return await hotel.update(body, { where: { id }, returning: true });
};

module.exports = {
	getAllServices,
	createServices,
	getOneServices,
	removeServices,
	updateServices,
};
