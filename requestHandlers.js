var querystring = require("querystring");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html lang="ru">'+
    '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '<title>'+
            'Типы домов' +
        '</title>'+
    '</head>'+
    '<body>'+
        '<form action="/upload" method="post">'+
            '<div>'+
                '<textarea name="min" placeholder="Общая площадь, от" size="25"></textarea>'+
                '<textarea name="max" placeholder="Общая площадь, до" size="25"></textarea>'+
            '</div>'+
            '<input type="submit" value="Submit text" />'+
        '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");

  var minSquare = 0;
  var maxSquare = 1000;
  if (querystring.parse(postData).min) {
    minSquare = querystring.parse(postData).min
  }
  if (querystring.parse(postData).max) {
    maxSquare = querystring.parse(postData).max
  }

  const { Pool } = require ("pg");
    const pool = new Pool({
    host:"localhost",
    user: "postgres",
    database: "sus_base",
    password: "123",
    port: 5432,
    });
    let resultString = "";
    // Запрос в бд с выборкой по указанному диапазону
    pool.query("SELECT name, k1min, k1max, k2min, k2max,  k3min, k3max,  k4min, k4max FROM house WHERE ((k1max>=$1 and k1min<=$2) or (k2max>=$1 and k2min<=$2) or (k2max>=$1 and k2min<=$2) or (k1max>=$1 and k2min<=$2))", [minSquare, maxSquare]).then (rows => {
        const str = rows["rows"];
        // Сортировка по количеству комнат для включения данных в итоговый список 
        for (let i=0; i<str.length; i++) {
            resultString+='<p><b>' + str[i]["name"] + '</b></p>';
            // console.log(str[i]["name"]);
            if (str[i]["k1min"]<=maxSquare && str[i]["k1max"]>=minSquare) {
                resultString+="<p>1-к: " + JSON.stringify(str[i]["k1min"]) + "-" + JSON.stringify(str[i]["k1max"]) + "</p>";
            }
            if (str[i]["k2min"]<=maxSquare && str[i]["k2max"]>=minSquare) {
                resultString+="<p>2-к: " + JSON.stringify(str[i]["k2min"]) + "-" + JSON.stringify(str[i]["k2max"]) + "</p>";
            }
            if (str[i]["k3min"]<=maxSquare && str[i]["k3max"]>=minSquare) {
                resultString+="<p>3-к: " + JSON.stringify(str[i]["k3min"]) + "-" + JSON.stringify(str[i]["k3max"]) + "</p>";
            }
            if (str[i]["k4min"]<=maxSquare && str[i]["k4max"]>=minSquare) {
                resultString+="<p>4-к: " + JSON.stringify(str[i]["k4min"]) + "-" + JSON.stringify(str[i]["k4max"]) + "</p>";
            }
            resultString+="\n";
        }
        
        var body = '<html>'+
                        '<head>'+
                            '<meta http-equiv="Content-Type" content="text/html; '+
                            'charset=UTF-8" />'+
                        '</head>'+
                        '<body>'+
                                '<form action="/" method="post">' +
                                    '<button type="submit">Назад</button>' +
                                '</form>' +
                                '<div>' +
                                resultString +
                                '</div>' +
                        '</body>'+
                    '</html>';

        pool.end();
        console.log(resultString);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
    })
  
}

exports.start = start;
exports.upload = upload;