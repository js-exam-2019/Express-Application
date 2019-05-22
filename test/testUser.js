const expect = require("chai").expect;

let connect = require("../mongoConnector").connect;
let disconnect = require("../mongoConnector").disconnect;
let connection = require("../mongoConnections").test;

let User = require("../models/User");
let userFacade = require("../facade/userFacade");

describe("Testing User Facade", () => {
	before(async () => {
		await connect(connection);
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
});
