//note = pour simplifier la chose => creer un tableau avec tout les ip qui doivent etre dans le graphique

const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('./Graph Plutonium/data/players_online.db', err => {
    if (err) throw err
    console.log('data base "player_online.db" bien active')
  })
//crÃ©ation de le table du serveur
//db.run('CREATE TABLE plutonium_players_online(hour VARCHAR, players BLOB)')

//Ajout dans la data base des joueurs de pluto
add_players_data_plutonuium()
setInterval(() => {
  add_players_data_plutonuium();
}, 100000);

async function add_players_data_plutonuium (){
  db.run('INSERT INTO plutonium_players_online(hour,players) VALUES(?,?)', [await getDateFormatted(), await getPlayer("mcpe.plutonium.best")]);
  db.all('SELECT * FROM plutonium_players_online', (err, data) => {
    console.log(data)
    if (err)
      throw err
  })
}

function getDateFormatted() {
  var now = new Date();
  var hour = (now.getHours() < 10 ? "0" + now.getHours() : now.getHours())
  var minutes = (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes())
  var seconds = (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds())
  return hour + ":" + minutes + ":" + seconds;
}

async function getPlayer(ip) {
  try {
    const response = await fetch(
      `https://api.mcstatus.io/v2/status/bedrock/`+ip
    );
    const data = await response.json();
    return data.players.online

  } catch (error) {
    console.error(error);
  }
}