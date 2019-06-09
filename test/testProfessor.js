const expect = require("chai").expect;

const connect = require('../connection/connector').connect;
const disconnect = require('../connection/connector').disconnect;
const connection = require('../connection/connections').test;

let User = require("../models/User");
let Professor = require("../models/Professor");
let professorFacade = require("../facade/professorFacade");

describe("Testing Professor Facade", () => {
	before(async () => {
		await connect(connection);
		await Professor.deleteMany({});
		await Professor.insertMany([{ name: "Plato", subject: "Philosophy" }]);

		await User.deleteMany({});
		await User.insertMany([
			{
				username: "marc",
				password: "pass",
				mail: "marc@mail.com",
				age: 24
			}
		]);
	});

	after(async () => {
		await Professor.deleteMany({});
		await User.deleteMany({});
		disconnect();
	});

	/*beforeEach(() => {
		console.log("Sets up test environment before individual");
	});

	afterEach(() => {
		console.log("Sets test environment after individual");
	}); */

	it("should return a empty list of professors", async () => {
		const professors = await professorFacade.getAll();
		expect(professors).not.to.be.empty;
	});

	it("should return a professor", async () => {
		const professors = await professorFacade.getAll();
		const professor = await professorFacade.getById(professors[0]._id);
		expect(professor.name).to.be.equal(professors[0].name);
	});
});
