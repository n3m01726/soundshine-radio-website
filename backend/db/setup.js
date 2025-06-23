const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const { saveConfig } = require("../config/configManager");
require("dotenv").config();

async function runSetup({
  hostname,
  username,
  password,
  database,
  prefix,
  addFakeData,
  deleteFakeData,
  siteUsername,
  sitePassword,
  userEmail,
  site_name,
}) {
  // Connexion initiale (sans base)
  const rootConn = await mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    multipleStatements: true,
  });
  // Création de la base si elle n'existe pas
  await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  await rootConn.end();

  // Connexion à la base
  const conn = await mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database,
    multipleStatements: true,
  });

  // Vérification des tables RadioDJ (lecture seule)
  const [subcatRows] = await conn.query("SHOW TABLES LIKE 'subcategory'");
  if (subcatRows.length === 0) {
    throw new Error(
      "La table 'subcategory' de RadioDJ est absente. Installe RadioDJ avant ce script."
    );
  }
  const [eventRows] = await conn.query("SHOW TABLES LIKE 'events'");
  if (eventRows.length === 0) {
    throw new Error(
      "La table 'events' de RadioDJ est absente. Installe RadioDJ avant ce script."
    );
  }

  // Transaction pour robustesse
  await conn.beginTransaction();
  try {
    // Création des tables personnalisées uniquement (jamais de suppression ni de modification des tables RadioDJ)
    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_subcategory_info\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      subcategory_id INT NOT NULL,
      description VARCHAR(200) DEFAULT NULL,
      image VARCHAR(80) DEFAULT NULL,
      guests VARCHAR(20) DEFAULT NULL,
      curator VARCHAR(20) DEFAULT NULL,
      scheduleTime VARCHAR(20) DEFAULT NULL,
      scheduleDay VARCHAR(20) DEFAULT NULL,
      mxcloud VARCHAR(20) DEFAULT NULL,
      theme VARCHAR(80) DEFAULT NULL,
      tags VARCHAR(80) DEFAULT NULL,
      enabled INT(1) DEFAULT NULL,
      backtime DATE DEFAULT NULL,
      is_fake INT(1) DEFAULT 0,
      INDEX (subcategory_id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_events_info\` (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      event_id INT NOT NULL,
      image VARCHAR(80) DEFAULT NULL,
      guests VARCHAR(20) DEFAULT NULL,
      curator VARCHAR(20) DEFAULT NULL,
      tags VARCHAR(80) DEFAULT NULL,
      is_fake INT(1) DEFAULT 0,
      INDEX (event_id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_likes\` (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      song_id INT UNSIGNED NOT NULL,
      type ENUM('like','dislike') NOT NULL,
      INDEX(song_id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_users\` (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      avatar VARCHAR(255),
      last_login DATETIME,
      member_since DATETIME,
      bio VARCHAR(255),
      job_title VARCHAR(255),
      facebook VARCHAR(255),
      instagram VARCHAR(255),
      twitter VARCHAR(255),
      twitch VARCHAR(255),
      tiktok VARCHAR(255),
      snapchat VARCHAR(255),
      discord VARCHAR(255),
      linkedin VARCHAR(255),
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      nice_nickname VARCHAR(255),
      email VARCHAR(255),
      background_image VARCHAR(255),
      fav_quote VARCHAR(255),
      is_fake INT(1) DEFAULT 0,
      shows_id INT,
      posts_id INT
    ) CHARACTER SET utf8 COLLATE utf8_general_ci;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_user_level\` (
      id INT NOT NULL PRIMARY KEY,
      level_name VARCHAR(20) NOT NULL,
      nice_name VARCHAR(50) NOT NULL,
      id_caps VARCHAR(50) NULL,
      level_ids VARCHAR(50) NULL
    );`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_capabilities\` (
      id int(11) NOT NULL,
      capability varchar(50) NOT NULL,
      nice_capname varchar(50) NOT NULL
    );`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_categories\` (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      is_fake INT(1) DEFAULT 0,
      slug VARCHAR(255) NOT NULL
    ) CHARACTER SET utf8 COLLATE utf8_general_ci;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_tags\` (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      is_fake INT(1) DEFAULT 0,
      slug VARCHAR(255) NOT NULL
    ) CHARACTER SET utf8 COLLATE utf8_general_ci;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_posts\` (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      date_posted DATETIME DEFAULT NULL,
      posted_by INT DEFAULT NULL,
      slug VARCHAR(255) NOT NULL,
      featured_image VARCHAR(255) DEFAULT NULL,
      post_type VARCHAR(255) DEFAULT NULL,
      category_id INT DEFAULT NULL,
      tag_id INT DEFAULT NULL,
      is_fake INT DEFAULT '0',
      is_featured INT DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_post_categories\` (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      post_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      is_fake INT(1) DEFAULT 0
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;`);

    await conn.query(`CREATE TABLE IF NOT EXISTS \`${prefix}_post_tags\` (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      post_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      is_fake INT(1) DEFAULT 0
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;`);

    // Insertion des niveaux d'utilisateur
    await conn.query(`INSERT IGNORE INTO \`${prefix}_user_level\` (id, level_name, nice_name, level_ids) VALUES
      (1, 'superadmin', 'Administrateur Root',NULL),
      (2, 'administrator', 'Administrateur.trice',NULL),
      (3, 'blogEditor', 'Writer Manager',NULL),
      (4, 'hosteditor', 'Hosts Manager',NULL),
      (5, 'author', 'Auteur.trice',NULL),
      (6, 'host', 'Host / DJ',NULL),
      (7, 'contributor', 'Contributeur.trice',NULL),
      (8, 'subscriber', 'Abonné.e',NULL)`);

    // Insertion des capabilities
    await conn.query(`INSERT IGNORE INTO \`${prefix}_capabilities\` (id, capability, nice_capname) VALUES
      (1, 'create_post', 'Créer un article'),
      (2, 'edit_post', 'Éditer un article'),
      (3, 'publish_post', 'Publier un article'),
      (4, 'propose_post', 'Proposer un article'),
      (5, 'delete_propose_post', 'Supprimer une proposition'),
      (6, 'edit_propose_post', 'Éditer une proposition'),
      (7, 'edit_all_post', 'Voir tous les articles'),
      (8, 'delete_post', 'Supprimer un article'),
      (9, 'manage_categories', 'Gérer les catégories'),
      (10, 'upload_avatar', 'Téléverser un avatar'),
      (11, 'upload_background', 'Téléverser une image de fond'),
      (12, 'create_profile', 'Créer un utilisateur'),
      (13, 'edit_profile', 'Éditer mon profil'),
      (14, 'delete_profile', 'Supprimer mon profil'),
      (15, 'publish_profile', 'Activer un profil'),
      (16, 'add_episode', 'Ajouter un épisode'),
      (17, 'delete_episode', 'Supprimer un épisode'),
      (18, 'overwrite_episode', 'Écraser un épisode'),
      (19, 'create_show_page', 'Créer une page d''émission'),
      (20, 'publish_show', 'Publier une page d''émission'),
      (21, 'edit_show_page', 'Éditer une page d''émission'),
      (22, 'delete_show_page', 'supprimer une page d''émission')`);

    // Création du premier utilisateur admin (hashé, si inexistant)
    const [adminExists] = await conn.query(
      `SELECT id FROM \`${prefix}_users\` WHERE username = ?`,
      [siteUsername]
    );
    if (adminExists.length === 0) {
      const hashedPassword = await bcrypt.hash(sitePassword, 10);
      await conn.query(
        `INSERT INTO \`${prefix}_users\` (username, password, email, is_fake) VALUES (?, ?, ?, 0)`,
        [siteUsername, hashedPassword, userEmail]
      );
    }

    // Sauvegarde de la config
    saveConfig({ hostname, username, password, database, prefix, site_name });

    await conn.commit();
    await conn.end();
    return "Installation safe : tables personnalisées créées/complétées, admin créé si besoin. Aucune modification RadioDJ.";
  } catch (err) {
    await conn.rollback();
    await conn.end();
    throw err;
  }
}

module.exports = { runSetup };
