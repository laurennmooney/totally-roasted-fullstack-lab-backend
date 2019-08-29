const express = require("express");
const app = express();
const port = 5000;
const cartRoutes = require("./routes/cart-items.routes");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use("/", cartRoutes);

app.listen(port, () => console.log(`The server is up and running on port ${port}`));

// app.get("/", (req, res) => res.send("hello"));