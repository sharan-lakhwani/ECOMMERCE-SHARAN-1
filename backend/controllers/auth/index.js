const bcrypt = require("bcrypt");
const User = require("../../models/User");
const db = require("../../db");

const express = require("express");

const router = express.Router();

router.post("/signin", async (req, res) => {
	const body = req.body;

	await db.connect();
	const user = await User.findOne({
		email: body.email,
	});

	//USER

	if (!user) {
		return res.status(400).send({
			message: "Usuario o contraseña incorrectos",
		});
	}

	const verify = await bcrypt.compare(body.password, user.password);
	if (!verify) {
		return res.status(400).send({
			message: "Usuario o contraseña incorrectos",
		});
	}

	await db.disconnect();

	res.send({
		message: "Usuario logueado con éxito",
	});
});

router.post("/signup", async (req, res) => {
	const body = req.body;

	const passwordEncriptada = bcrypt.hashSync(body.password, 10);

	await db.connect();

	const user = await User.create({
		email: body.email,
		password: passwordEncriptada,
		name: body.name,
		country: body.country,
	});
	await user.save();

	await db.disconnect();

	res.send({
		message: "Usuario creado con éxito",
	});
});

module.exports = router;
