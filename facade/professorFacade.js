let Professor = require("../models/Professor");

const getAll = () => Professor.find({}).exec();
const getById = (_id) => Professor.findOne({ _id }).exec();

module.exports = {
	getAll,
	getById,
}