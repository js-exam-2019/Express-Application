const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProfessorSchema = new Schema({
	name: String,
	subject: String,
});

ProfessorSchema.virtual("idolizedCount").get(function() {
    return this.idolizedBy.lenght;
})

module.exports = mongoose.model("Professor", ProfessorSchema);