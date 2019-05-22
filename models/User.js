const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	mail: { type: String, required: true, unique: true },
	age: { type: Number, required: true },
	created: { type: Date, default: Date.now },
	lastUpdate: Date,
	idol: { type: Schema.Types.ObjectId, ref: "Professor" }
});

UserSchema.pre("save", (next) => {
	console.log("Needs Hashing");
	next();
});

UserSchema.pre("update", (next) => {
    this.update({}, { $set: { lastUpdate: Date.now } });
    next();
});

module.exports = mongoose.model("User", UserSchema);
