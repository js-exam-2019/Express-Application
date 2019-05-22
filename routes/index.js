var express = require("express");
var router = express.Router();

let connect = require("../mongoConnector").connect;
let disconnect = require("../mongoConnector").disconnect;
let connection = require("../mongoConnections").dev;

let userFacade = require("../facade/userFacade");
let professorFacade = require("../facade/professorFacade");

router.post("/signup", async function(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;
	const passwordConfirm = req.body.passwordConfirm;
	const age = req.body.age;
	const mail = req.body.email;

	if (password != passwordConfirm) return { err: "passwords doesnt match", status: 403 };

	try {
		await connect(connection);
		const user = await userFacade.signup(username, password, mail, age);
		console.log(user[0]);
		req.session.user = user[0];
	} catch (error) {
		return new Error("Whoopps");
	} finally {
		await disconnect();
	}

	res.redirect("/profile");
});

router.post("/signin", async function(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;

	try {
		await connect(connection);
		const user = await userFacade.signin(username, password);
		req.session.user = user;
	} catch (error) {
		return new Error("Whoopps");
	} finally {
		await disconnect();
	}

	res.redirect("/profile");
});

router.post("/signout", async function(req, res, next) {
	req.session.destroy();
	res.redirect("/");
});

router.post("/changepassword", async function(req, res, next) {
	const passwordPrevious = req.body.passwordPrevious;
	const password = req.body.password;
	const passwordConfirm = req.body.passwordConfirm;
	const sessionUser = req.session.user;

	if (sessionUser.password != passwordPrevious) {
		return { err: "current password doesnt match", status: 403 };
	} else if (password != passwordConfirm) {
		return { err: "passwords doesnt match", status: 403 };
	}

	try {
		await connect(connection);
		const user = await userFacade.changePassword(sessionUser.username, password);
		req.session.user = user;
	} catch (error) {
		return new Error("Whoopps");
	} finally {
		await disconnect();
	}

	res.redirect("/profile");
});

router.post("/updateidol/:id", async function(req, res, next) {
	const userId = req.session.user._id;
	const id = req.params.id;

	try {
		await connect(connection);
		const user = await professorFacade.changeIdol(userId, id);
		req.session.user = user;
	} catch (error) {
		return new Error("Whoopps");
	} finally {
		await disconnect();
	}

	console.log(req.session.user);
	res.redirect("/profile");
});

/* GET home page. */
router.get("/profile", async function(req, res, next) {
	if (req.session.user) {
		if (!req.session.professors) {

			try {
				await connect(connection);
				const professors = await professorFacade.getAll();
				
				//req.session.user.idol = idol;
				req.session.professors = professors;
			} catch (error) {
				return new Error("Whoopps");
			} finally {
				await disconnect();
			}
		}

		res.render("profile", { user: req.session.user, professors: req.session.professors });
	} else {
		console.log("You are not logged in");
		res.redirect("/");
	}
});

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/embedded-javascript", function(req, res, next) {
	res.render("ejs", { title: "Embedded JavaScript" });
});

router.get("/middleware", function(req, res, next) {
	res.render("middleware", { title: "Middleware" });
});

router.get("/mongoose", function(req, res, next) {
	res.render("mongoose", { title: "Mongoose" });
});

router.get("/test", function(req, res, next) {
	res.render("test", { title: "Test" });
});

router.get("/logging", function(req, res, next) {
	res.render("logging", { title: "Logging" });
});

module.exports = router;
