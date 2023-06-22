const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { open } = require('sqlite');
const cheerio = require('cheerio');
const axios = require('axios');
const csv = require('csv-parser');
const db = new sqlite3.Database('./database/data.db');

function executeInitialSchema() {
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS sag_awards`);
  });
    // Create the database table if it doesn't exist
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS sag_awards (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          year TEXT,
          category TEXT,
          full_name TEXT,
          show TEXT,
          won TEXT
        )
      `);
    });
  
    fs.createReadStream('./database/screen_actor_guild_awards.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Process each row of the CSV file
        db.serialize(() => {
          db.run(
            `INSERT INTO sag_awards (year, category, full_name, show, won) VALUES (?, ?, ?, ?, ?)`,
            [row.year, row.category, row.full_name, row.show, row.won],
            (err) => {
              if (err) {
                console.error(err);
              }
            }
          );
        });
      })
      .on('end', () => {
        // CSV parsing is complete
        console.log('Data insertion complete.');
      });
  }

  function getDb() {
    return db;
  }

module.exports = { executeInitialSchema, getDb };


//new line