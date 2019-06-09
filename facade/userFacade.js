let User = require('../models/User');

const getAll = async () => await User.find({}).exec();
const getById = async (_id) => await User.findById({ _id }).exec();
const getByUsername = async (username) => await User.findOne({ username }).exec();

const signup = async (username, password, mail, age) => {
	return await new User({ username, password, mail, age }).save();
	//return await User.insertMany([{ username, password, mail, age }]);
};

const signin = async (username, password) => {
	const user = await User.findOne({ username, password })
		.populate('idol')
		.exec();
	return user != null ? user : { err: 'wrong username or password', status: 403 };
};

const changePassword = async (username, password) => {
	const user = await User.findOneAndUpdate({ username }, { password }, { new: true })
		.populate('idol')
		.exec();
	return user != null ? user : { err: 'wrong username', status: 403 };
};

const updateIdol = async (username, idol) => {
	return await User.findOneAndUpdate({ username }, { idol }, { new: true })
		.populate('idol')
		.exec();
};

const deleteProfile = async (_id) => {
	return await User.findByIdAndDelete({_id});
};

module.exports = {
	getAll,
	getById,
	getByUsername,
	signin,
	signup,
	changePassword,
	updateIdol,
	deleteProfile
};
