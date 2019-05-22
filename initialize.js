let connect = require("./mongoConnector").connect;
let disconnect = require("./mongoConnector").disconnect;
let connection = require("./mongoConnections").dev;

let Professor = require("./models/Professor");
let User = require("./models/User");

!(initialize = async () => {
    await connect(connection);
    
	await Professor.deleteMany({});
	await Professor.insertMany([
        { name: "Plato", subject: "Philosophy" },
        { name: "Aristotle", subject: "Philosophy" },
        { name: "Socrates", subject: "Philosophy" },
        { name: "Spinoza", subject: "Philosophy" },
        { name: "kierkegaard", subject: "Philosophy" },
        { name: "Pythagoras", subject: "Mathematics" },
        { name: "Euler", subject: "Mathematics" },
        { name: "Gauss", subject: "Mathematics" },
        { name: "Descartes", subject: "Mathematics" },
        { name: "Archimedes", subject: "Mathematics" },
        { name: "Einstein", subject: "Physics" },
        { name: "Galileo", subject: "Physics" },
        { name: "Hawking", subject: "Physics" },
        { name: "Newton", subject: "Physics" },
        { name: "Borh", subject: "Physics" },
    ]);

    await User.deleteMany({});
	await User.insertMany([
        { username: "user", password: "password", mail: "user@mail.com", age: 25 },
        { username: "marc", password: "pass", mail: "marc@mail.com", age: 24 },
        { username: "noah", password: "pass", mail: "noah@mail.com", age: 21 },
    ]);

    await disconnect();
    console.log("Successfully added data to mongo DB.")
})();