const mongoose = require("mongoose");
const expect = require("chai").expect;

//let connect = require("../mongoConnector");
//let connection = require("../mongoConnections").test;

describe("Testing Basic Examples", () => {
	/* before(() => {
		console.log("Sets up test environment before testing");
	});

	beforeEach(() => {
		console.log("Sets up test environment before individual");
	});

	after(() => {
		console.log("Sets test environment after testing");
	});

	afterEach(() => {
		console.log("Sets test environment after individual");
	}); */

	describe("Mathematics", () => {
		it("should say 9 is equal to 9", () => {
			const number = 9;
			expect(number).to.be.equal(9);
		});

		it("should say 9 not is equal to A", () => {
			const number = 9;
			expect(number).not.to.be.equal("A");
		});

		it("should say 9 is below 99", () => {
			const number = 9;
			expect(number).to.be.below(99);
		});

		it("should say 9 is above 1", () => {
			const number = 9;
			expect(number).to.be.above(1);
		});
	});

	describe("Logic Operators", () => {
		it("should say condition is true", () => {
			const condition = true;
			expect(condition).to.be.true;
		});

		it("should say condition is false", () => {
			const condition = false;
			expect(condition).to.be.false;
		});

		it("should say condition is undefined", () => {
			const condition = undefined;
			expect(condition).to.be.undefined;
		});

		it("should say condition not is undefined", () => {
			const condition = "defined";
			expect(condition).not.to.be.undefined;
		});
	});

	describe("List Operators", () => {
		it("should say list contains a", () => {
			const list = ["a", "b"];
			expect(list).to.contain("a");
		});

		it("should say list is empty", () => {
			const list = [];
			expect(list).to.be.empty;
		});

		it("should say list length is 2", () => {
			const list = ["a", "b"];
			expect(list).to.be.length(2);
		});
	});

	describe("Asynchronous Testing", () => {
		it("should say condition is true", (done) => {
			const condition = true;
			setTimeout(() => {
				expect(condition).to.be.true;
				done(); // calling done() tells the test it has ended the test
			}, 1500); // caps at 2000 milliseconds
        });

        it("should say number is 9", (done) => {
			const number = 9;
			setTimeout(() => {
				expect(number).to.be.equal(9);
				done(); // calling done() tells the test it has ended the test
			}, 1500); // caps at 2000 milliseconds
        });
	});
});
