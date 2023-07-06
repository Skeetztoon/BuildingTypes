const { Pool } = require ("pg");
const pool = new Pool({
  host:"localhost",
  user: "postgres",
  database: "sus_base",
  password: "123",
  port: 5432,
});

const axios = require("axios");
const cheerio = require("cheerio");

for (i=1; i<105; i++) {
    pool.query("SELECT link FROM house WHERE id=$1", [i]).then (rows => {
        let str = JSON.stringify(rows); // Можно было сразу из JSON'a выбирать
        let link = str.substring(str.indexOf("series"), str.indexOf("html")+"html".length);
        console.log(link);
                axios
        .get("http://tipdoma.ru/" + `${link}`)
        .then((result) => {
          const $ = cheerio.load(result.data);
          const table = $(".table[style='background-color:transparent']");

          let k1SquareWrapper = $(table).find(".success td")[1],
            k1Square = $(k1SquareWrapper).text();
          let k1min = 0;
          let k1max = 0;
          // Проверка полученных значений площади
          if (k1Square.length!=2) {
          if (k1Square!="null" && k1Square!="?" && k1Square.length!=2) {
            let k1Split = k1Square.split("-");
            if (parseInt(k1Split[0],10)<100) {
              k1min = parseInt(k1Split[0],10)};
            if (parseInt(k1Split[1],10)<100) {
              k1max = parseInt(k1Split[1],10)};
          }} else {
            k1min = k1Square;
            k1max = k1Square;
          }

          let k2SquareWrapper = $(table).find(".danger td")[1],
            k2Square = $(k2SquareWrapper).text();
          let k2min = 0;
          let k2max = 0;
          if (k2Square.length!=2) {
          if (k2Square!="null" && k2Square!="?" && k2Square.length!=2) {
            let k2Split = k2Square.split("-");
            k2min = parseInt(k2Split[0],10);
            k2max = parseInt(k2Split[1],10);
            if (parseInt(k2Split[0],10)<100) {
              k2min = parseInt(k2Split[0],10)};
            if (parseInt(k2Split[1],10)<100) {
              k2max = parseInt(k2Split[1],10)};
          }}else {
            k2min = k2Square;
            k2max = k2Square;
          }

          let k3SquareWrapper = $(table).find(".warning td")[1],
            k3Square = $(k3SquareWrapper).text();
          let k3min = 0;
          let k3max = 0;
          if (k3Square.length!=2) {
          if (k3Square!="null" && k3Square!="?" && k3Square.length!=2) {
            let k3Split = k3Square.split("-");
            k3min = parseInt(k3Split[0],10);
            k3max = parseInt(k3Split[1],10);
            if (parseInt(k3Split[0],10)<100) {
              k3min = parseInt(k3Split[0],10)};
            if (parseInt(k3Split[1],10)<100) {
              k3max = parseInt(k3Split[1],10)};
          }}else {
            k3min = k3Square;
            k3max = k3Square;
          }

          let k4SquareWrapper = $(table).find(".info td")[1],
            k4Square = $(k4SquareWrapper).text();
          let k4min = 0;
          let k4max = 0;
          if (k4Square.length!=2) {
          if (k4Square!="null" && k4Square!="?" && k4Square.length!=2) {
            let k4Split = k4Square.split("-");
            k4min = parseInt(k4Split[0],10);
            k4max = parseInt(k4Split[1],10);
            if (parseInt(k4Split[0],10)<100) {
              k4min = parseInt(k4Split[0],10)};
            if (parseInt(k4Split[1],10)<100) {
              k4max = parseInt(k4Split[1],10)};
          }}else {
            k4min = k4Square;
            k4max = k4Square;
          }

          pool.query("UPDATE house SET k1min=$1, k1max=$2 WHERE link=$3", [k1min, k1max, link], (err, res) => {
            console.log(err, res)
          });

          pool.query("UPDATE house SET k2min=$1, k2max=$2 WHERE link=$3", [k2min, k2max, link], (err, res) => {
            console.log(err, res)
          });

          pool.query("UPDATE house SET k3min=$1, k3max=$2 WHERE link=$3", [k3min, k3max, link], (err, res) => {
            console.log(err, res)
          });

          pool.query("UPDATE house SET k4min=$1, k4max=$2 WHERE link=$3", [k4min, k4max, link], (err, res) => {
            console.log(err, res)
          });
          
          console.log(link);
          console.log(k1min, k1max);
    })})};
