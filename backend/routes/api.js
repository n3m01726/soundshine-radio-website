const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
require("dotenv").config();

// Utilitaire pour obtenir une connexion MySQL
async function getConnection() {
  return mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    multipleStatements: true,
  });
}

// GET /api/shows : liste des shows RadioDJ (table subcategory)
router.get("/shows", async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query("SELECT * FROM subcategory");
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts : liste des posts du site web (table personnalisée)
router.get("/posts", async (req, res) => {
  try {
    const conn = await getConnection();
    const prefix = process.env.PREFIX || "";
    const [rows] = await conn.query(`SELECT * FROM \`${prefix}_posts\``);
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/fakeData : insère des fausses données de développement
router.post("/fakeData", async (req, res) => {
  try {
    const conn = await getConnection();
    const prefix = process.env.PREFIX || "";
    // Fake post
    await conn.query(
      `INSERT INTO \`${prefix}_posts\` (title, content, date_posted, posted_by, slug, featured_image, post_type, category_id, tag_id, is_fake, is_featured) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "Post de test",
        "Ceci est un post de test généré pour le développement.",
        1,
        "post-de-test",
        "test.jpg",
        1,
        1,
        1,
        1,
        0,
      ]
    );
    // Fake user
    await conn.query(
      `INSERT INTO \`${prefix}_users\` (username, password, email, is_fake) VALUES (?, ?, ?, 1)`,
      ["testuser", "testpassword", "testuser@example.com"]
    );
    await conn.end();
    res.json({ success: true, message: "Fake data insérée." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/charts : top 40 des chansons les plus jouées
router.get("/charts", async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query(
      `SELECT * FROM songs WHERE song_type = 0 AND id_subcat != 18 AND id_subcat != 19 AND id_subcat != 5 AND enabled = 1 ORDER BY count_played DESC LIMIT 40`
    );
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
