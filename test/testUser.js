const expect = require("chai").expect;

const connect = require('../connection/connector').connect;
const disconnect = require('../connection/connector').disconnect;
const connection = require('../connection/connections').test;

let User = require("../models/User");
let userFacade = require("../facade/userFacade");

let Professor = require("../models/Professor");
let professorFacade = require("../facade/professorFacade");

describe("Testing User Facade", () => {
	before(async () => {
		await connect(connection);
		await Professor.deleteMany({});
		await Professor.insertMany([{ name: "Plato", subject: "Philosophy" }, { name: "Aristotle", subject: "Philosophy" }]);

		await User.deleteMany({});
		await User.insertMany([
			{
				username: "marc",
				password: "pass",
				mail: "marc@mail.com",
				age: 24
			},
			{
				username: "vito",
				password: "pass",
				mail: "vito@mail.com",
				age: 24
			}
		]);
	});

	after(async () => {
		await User.deleteMany({});
		disconnect();
	});

	/*beforeEach(() => {
		console.log("Sets up test environment before individual");
	});

	afterEach(() => {
		console.log("Sets test environment after individual");
	}); */

	it("should return a list of users", async () => {
		const users = await userFacade.getAll();
		expect(users).not.to.be.empty;
	});

	it("should return a list of users", async () => {
		const user = await userFacade.signup("noah", "pass", "noah@mail.com", 24);
		expect(user).not.to.be.undefined;
	});

	it("should return a list of users", async () => {
		const user = await userFacade.signin("marc", "pass");
		expect(user).not.to.be.undefined;
	});

	it("should return a signin error 403", async () => {
		const user = await userFacade.signin("marc", "wrong pass");
		expect(user.status).to.be.equal(403);
	});

	it("should return a user with username marc", async () => {
		const username = "marc";
		const user = await userFacade.getByUsername(username);
		expect(user.username).to.be.equal(username);
	});

	it("should return a user with and updated password", async () => {
		const username = "marc";
		const password = "myPassword";
		const user = await userFacade.changePassword(username, password);
		expect(user.password).to.be.equal(password);
	});

	it("should return a username error 403", async () => {
		const username = "unknown";
		const password = "myPassword";
		const user = await userFacade.changePassword(username, password);
		expect(user.status).to.be.equal(403);
	});

	it("should return an user with updated idol", async () => {
		const professor = await professorFacade.getAll();
		let user = await userFacade.getByUsername("marc");
		user = await userFacade.updateIdol(user.username, professor[1]._id);
		expect(user.idol.name).to.be.equal(professor[1].name);
	});

	it("should delte an user", async () => {
		const listBefore = await userFacade.getAll();
		const user = await userFacade.getByUsername("marc");
		await userFacade.deleteProfile(user._id);
		const listAfter = await userFacade.getAll();

		console.log(listBefore, listAfter)

		expect(listBefore.length).to.be.equal(listAfter.length + 1);
	});
});

