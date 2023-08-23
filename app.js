/**
 * @author Chinmoy Das
 * @created 23/08/2023
 */
const express = require("express");
const app = express();
const apiRoutes = require("./routes/routes");
const mongoose = require("mongoose");

app.use(express.json());

app.use("/api/v1", apiRoutes);
//mongo connection
mongoose.connect(
  "mongodb+srv://chinmoy:mongo123@giga.l34ni6h.mongodb.net/MSMA",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(" Server will not start " + error));
db.once("open", () => {
  console.log("Db connection working");
  app.listen(7800, () => console.log("server running on port 3000"));
});
