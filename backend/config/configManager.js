const fs = require("fs");
const path = require("path");

function saveConfig({
  hostname,
  username,
  password,
  database,
  prefix,
  site_name,
}) {
  const envContent = `DBHOST=${hostname}
DBUSER=${username}
DBPASSWORD=${password}
DBNAME=${database}
PREFIX=${prefix}
SITE_NAME=${site_name}
`;
  fs.writeFileSync(path.join(__dirname, "../.env"), envContent, {
    encoding: "utf8",
  });
}

module.exports = { saveConfig };
