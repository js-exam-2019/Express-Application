let Professor = require("../models/Professor");

const getAll = () => Professor.find({}).exec();
const getById = (_id) => Professor.find({ _id }).exec();

const changeIdol = async (idolizedBy, _id) => {
	return Professor.findOneAndUpdate({ _id }, { $push: { idolizedBy } }, { new: true }).exec();
};

module.exports = {
	getAll,
	getById,
	changeIdol,
}