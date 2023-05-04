const { Router } = require("express");
const ProductsController = require("../controllers/products");
const AuthController = require("../controllers/auth");

const allRouterApi = (app) => {
	const router = Router();

	app.use("/api", router);

	router.use("/products", ProductsController);
	router.use("/auth", AuthController);
};

module.exports = allRouterApi;
