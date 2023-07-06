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

let rowsAmount = 0;

axios // Заполняет name и link
  .get("http://tipdoma.ru/list1.html")
  .then((response) => {
    const $ = cheerio.load(response.data);

    const rows = $(".row .col-md-3");
    console.log(rows.length);

    for (let i=0; i < 104; i++) {
        rowsAmount++;
        let buildingTypeWrapper = $(rows[i]).find("h4")[0], // Название
            buildingType = $(buildingTypeWrapper).text();

        let linkWrapper = $(rows[i]).find(".btn")[0], // Ссылка
            link = $(linkWrapper).attr("href");

        pool.query("INSERT INTO house (name, link) VALUES ($1,$2)", [buildingType, link], (err, res) => {
            // console.log(err, res);
        });
        
        };
    
    }).catch((err) => console.log("Fetch error " + err));

