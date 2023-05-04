const express = require("express");
const allRouterApi = require("./controllers/index");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
	cors({
		origin: "*",
	})
);

allRouterApi(app);

app.use("/", express.static("../frontend"));

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
