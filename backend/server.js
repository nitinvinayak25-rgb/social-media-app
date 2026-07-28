require("dotenv").config(); 
const pool = require("./db.js");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// GET
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
});

app.get("/dbcheck", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  ADD POST HERE
app.post("/posts", async (req, res) => {
  try {

    console.log(req.body);
    const { title, body } = req.body;

    const result = await pool.query(
      "INSERT INTO posts (title, time, body) VALUES ($1, $2, $3) RETURNING *",
      [title, new Date(), body]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//  ADD PUT HERE
app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const result = await pool.query(
      "UPDATE posts SET title=$1, time=$2, body=$3 WHERE id=$4 RETURNING *",
      [title, new Date(), body, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//  ADD DELETE HERE
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM posts WHERE id=$1", [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
// Start server
const PORT = Process.env.PORT || 5000 ;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});