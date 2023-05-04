const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
	const db = await mongoose.connect(`${process.env.DB_URI}`);

	console.log("Conectado a la base de datos");
}

async function disconnect() {
	await mongoose.disconnect();
}

module.exports = {
	connect,
	disconnect,
};
