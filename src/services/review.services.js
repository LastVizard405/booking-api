const { review } = require('../models');

const getAllServices = async () => {
	return await review.findAll();
};

const createServices = async (body) => {
	return await review.create(body);
};

const getOneServices = async (id) => {
	return await review.findByPk(id);
};

const removeServices = async (id) => {
	return await review.destroy({ where: { id } });
};

const updateServices = async (body, id) => {
	return await review.update(body, { where: { id }, returning: true });
};

module.exports = {
	getAllServices,
	createServices,
	getOneServices,
	removeServices,
	updateServices,
};
