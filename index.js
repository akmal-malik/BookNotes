import express from "express";
import bookRoutes from "./routes/books.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", bookRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
