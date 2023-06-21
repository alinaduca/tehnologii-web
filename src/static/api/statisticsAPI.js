const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const { getDb } = require('../database/sqldatabase');

function getStatisticBar(req, res, year) {
  const db = getDb();
  const query = `SELECT full_name, count(*) AS count_actors FROM sag_awards WHERE year like '${year}%' and length(full_name)>3 group by full_name order by count_actors desc, full_name asc;`;
  const infos = [];

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      rows.forEach((row) => {
        // console.log(`${row.full_name}\t${row.count_actors}`);
        infos.push({"name" : row.full_name, "number_of_nominations" : row.count_actors});
      });
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(infos));
    }
  });
}

function getStatisticPie(req, res, year) {
  const db = getDb();
  const query = `SELECT full_name, count(*) AS count_actors FROM sag_awards WHERE year like '${year}%' and length(full_name)>3 and won='True' group by full_name order by count_actors desc, full_name asc;`;
  const infos = [];
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      rows.forEach((row) => {
        // console.log(`${row.full_name}\t${row.count_actors}`);
        infos.push({"name" : row.full_name, "number_of_nominations" : row.count_actors});
      });
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(infos));
    }
  });
}

function getStatisticLine(req, res, year) {
  const db = getDb();
  const query = `SELECT show, count(*) AS count_actors FROM sag_awards WHERE year like '${year}%' and length(full_name)>3 and length(show)>2 group by show order by count_actors desc, show asc;`;
  const infos = [];
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      rows.forEach((row) => {
        // console.log(`${row.show}\t${row.count_actors}`);
        infos.push({"show" : row.show, "number_of_actors" : row.count_actors});
      });
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(infos));
    }
  });
}

module.exports = { getStatisticBar, getStatisticPie, getStatisticLine };