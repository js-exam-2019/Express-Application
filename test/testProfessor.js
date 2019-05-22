const expect = require("chai").expect;

let connect = require("../mongoConnector").connect;
let disconnect = require("../mongoConnector").disconnect;
let connection = require("../mongoConnections").test;

let Professor = require("../models/Professor");
let professorFacade = require("../facade/professorFacade");

let User = require("../models/User");
let userFacade = require("../facade/userFacade");

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
});
