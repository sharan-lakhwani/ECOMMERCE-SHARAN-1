const express = require("express");

const router = express.Router();

const db = require("../../db");
const Product = require("../../models/Product");

router.get("/", async (req, res) => {
	await db.connect();

	const products = await Product.find();

	await db.disconnect();

	res.send(products);
});

//CREAR PRODUCTOS
router.post("/", async (req, res) => {
	const body = req.body;

	if (!body) {
		return;
	}

	await db.connect();
	const product = new Product(body);
	await product.save();
	await db.disconnect();

	res.send(product);
});

//UPDATE AL PRODUCTO
router.put("/:id", async (req, res) => {
	const id = req.params.id;

	const body = req.body;

	for (let propiedad in body) {
		if (!body[propiedad]) {
			delete body[propiedad];
		}
	}

	await db.connect();
	const productActualizado = await Product.findByIdAndUpdate(id, body, {
		new: true,
	});
	await db.disconnect();

	res.send(productActualizado);
});

//DELETE AL PRODUCTO
router.delete("/:id", async (req, res) => {
	const id = req.params.id;

	await db.connect();

	const productActualizado = await Product.findByIdAndDelete(id);
	if (!productActualizado) {
		res.status(404).send({ message: "Producto no encontrado" });
	}
	await db.disconnect();

	res.send({ message: "Producto eliminado" });
});

//BUSCAR PRODUCTO
// router.post("/search", async (req, res) => {
// 	const body = req.body;

// 	if (!body) {
// 		return;
// 	}

// 	await db.connect();
// 	const product = await Product.find({ title: body.title });
// 	await db.disconnect();

// 	res.send(product);
// });

module.exports = router;

//BUSCAR PRODUCTO POR TITULO
