require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ===========================
   GET ALL POSTS
=========================== */

app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY id DESC"
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
   DATABASE CHECK
=========================== */

app.get("/dbcheck", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* ===========================
   LOGIN / CREATE USER
=========================== */

app.post("/username", async (req, res) => {
  try {
    const { username } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.json(existingUser.rows[0]);
    }

    const newUser = await pool.query(
      "INSERT INTO users(username) VALUES($1) RETURNING *",
      [username]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
   CREATE POST
=========================== */

app.post("/posts", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  try {

    const { title, body, username } = req.body;

        console.log("USERNAME:", username);

    const result = await pool.query(
      `INSERT INTO posts(title, body, username)
       VALUES($1,$2,$3)
       RETURNING *`,
      [title, body, username]
    );

    console.log("SAVED:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
   UPDATE POST
=========================== */

app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, username } = req.body;

    const result = await pool.query(
      `UPDATE posts
       SET title=$1,
           body=$2,
           username=$3
       WHERE id=$4
       RETURNING *`,
      [title, body, username, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
   DELETE POST
=========================== */

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM posts WHERE id=$1",
      [id]
    );

    res.json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
   SERVER
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
