import express from "express";
import { db } from "../db/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [books] = await db.query("SELECT * FROM books ORDER BY created_at DESC");
    res.render("index", { books });
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
});

router.post("/add", async (req, res) => {
  const { title, author, rating, notes, isbn, date_read } = req.body;

  try {
    await db.query(
      "INSERT INTO books (title, author, rating, notes, isbn, date_read) VALUES (?, ?, ?, ?, ?, ?)",
      [title, author, rating, notes, isbn, date_read]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error adding book");
  }
});


router.post("/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM books WHERE id = ?", [req.params.id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error deleting book");
  }
});





export default router;
