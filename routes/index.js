var express = require('express');
var router = express.Router();

const connect = require('../connection/connector').connect;
const disconnect = require('../connection/connector').disconnect;
const connection = require('../connection/connections').dev;

let userFacade = require('../facade/userFacade');
let professorFacade = require('../facade/professorFacade');

router.post('/signup', async (req, res, next) => {
	const { username, password, passwordConfirm, age, mail } = req.body;
	console.log(req.body);
	if (password != passwordConfirm) res.send({ err: 'passwords doesnt match', status: 403 });

	try {
		await connect(connection);
		const user = await userFacade.signup(username, password, mail, age);
		req.session.user = user;
		res.redirect('/profile');
	} catch (error) {
		res.send({ error, msg: 'failed to signup' });
	} finally {
		await disconnect();
	}
});

router.post('/signin', async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	await connect(connection);
	const response = await userFacade.signin(username, password);
	console.log('TEST::', response);
	await disconnect();

	if (response.err) {
		res.send(response);
	}

	req.session.user = response;
	res.redirect('/profile');
});

router.post('/signout', async (req, res, next) => {
	req.session.destroy();
	res.redirect('/');
});

router.post('/changepassword', async (req, res, next) => {
	const { passwordPrevious, password, passwordConfirm } = req.body;
	const sessionUser = req.session.user;

	if (sessionUser.password != passwordPrevious) {
		res.send({ err: 'current password doesnt match', status: 403 });
	} else if (password != passwordConfirm) {
		res.send({ err: 'passwords doesnt match', status: 403 });
	}

	try {
		await connect(connection);
		const user = await userFacade.changePassword(sessionUser.username, password);
		req.session.user = user;
	} catch (error) {
		res.send({ error, msg: 'failed to change password' });
	} finally {
		await disconnect();
	}

	res.redirect('/profile');
});

router.post('/updateidol', async (req, res, next) => {
	const id = req.body.id;
	const username = req.session.user.username;

	try {
		await connect(connection);
		console.log(username, id);
		const user = await userFacade.updateIdol(username, id);
		req.session.user = user;
	} catch (error) {
		return new Error('Whoopps');
	} finally {
		await disconnect();
	}

	console.log(req.session.user);
	res.redirect('/profile');
});

router.post('/agree-cookies', async (req, res, next) => {
	req.session.agreedCookies = true;
	res.redirect('/');
});

router.get('/profile', async (req, res, next) => {
	if (req.session.user) {
		if (!req.session.professors) {
			try {
				await connect(connection);
				const professors = await professorFacade.getAll();

				req.session.professors = professors;
			} catch (error) {
				return new Error('Whoopps');
			} finally {
				await disconnect();
			}
		}

		res.render('profile', { user: req.session.user, professors: req.session.professors });
	} else {
		console.log('You are not logged in');
		res.redirect('/');
	}
});

router.post('/delete', async (req, res, next) => {
	if (req.session.user) {
		await connect(connection);
		await userFacade.deleteProfile(req.session.user._id);
		await disconnect();
		console.log(`user ${req.session.user.username} was successfully deleted!`);
		req.session.destroy();
		res.redirect('/');
	} else {
		console.log('You are not logged in');
		res.redirect('/');
	}
});

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express', agreedCookies: req.session.agreedCookies });
});

router.get('/embedded-javascript', (req, res, next) => {
	res.render('ejs', { title: 'Embedded JavaScript' });
});

router.get('/middleware', (req, res, next) => {
	res.render('middleware', { title: 'Middleware' });
});

router.get('/mongoose', (req, res, next) => {
	res.render('mongoose', { title: 'Mongoose' });
});

router.get('/test', (req, res, next) => {
	res.render('test', { title: 'Test' });
});

router.get('/logging', (req, res, next) => {
	res.render('logging', { title: 'Logging' });
});

module.exports = router;
