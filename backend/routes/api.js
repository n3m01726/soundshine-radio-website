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
    const [rows] = await conn.query(
      "SELECT * FROM subcategory WHERE parentid = 10"
    );
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

// GET /api/schedule : retourne la grille de programmation par jour
router.get("/schedule", async (req, res) => {
  try {
    const conn = await getConnection();
    const dayMap = {
      "&1": "monday",
      "&2": "tuesday",
      "&3": "wednesday",
      "&4": "thursday",
      "&5": "friday",
      "&6": "saturday",
      "&0": "sunday",
    };
    const [rows] = await conn.query(
      `SELECT day, time, name, tags as host
       FROM events
       LEFT JOIN z_events_info ON events.ID = z_events_info.event_id
       WHERE enabled = 1`
    );
    await conn.end();
    const schedule = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    for (const event of rows) {
      const dayKey = dayMap[event.day];
      if (dayKey) {
        schedule[dayKey].push({
          time: event.time,
          show: event.name,
          host: event.host,
        });
      }
    }
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/lastplayed : morceaux joués récemment (mock)
router.get("/lastplayed", async (req, res) => {
  res.json([
    { id: 1, title: "Song A", artist: "Artist 1" },
    { id: 2, title: "Song B", artist: "Artist 2" },
    { id: 3, title: "Song C", artist: "Artist 3" },
    { id: 4, title: "Song D", artist: "Artist 4" },
    { id: 5, title: "Song E", artist: "Artist 5" },
  ]);
});

// GET /api/requests : demandes de morceaux (mock)
router.get("/requests", async (req, res) => {
  res.json([
    { id: 1, name: "Alice", message: "Peux-tu passer Song X ?" },
    { id: 2, name: "Bob", message: "Un classique de Queen stp !" },
    { id: 3, name: "Charlie", message: "Joyeux anniversaire à Emma !" },
  ]);
});

module.exports = router;
