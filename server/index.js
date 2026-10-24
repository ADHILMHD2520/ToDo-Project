require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

connectDb();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});