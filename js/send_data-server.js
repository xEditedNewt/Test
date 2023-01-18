const sqlite3 = require('sqlite3')
const express = require("express");
const cors = require('cors');
const app = express();
const lien_api = '/api/v1'

let db = new sqlite3.Database('./data/players_online.db', err => {
  if (err) throw err
  console.log('data base "player_online.db" bien active')
})
async function set_api(){
    app.use(cors())
    app.get(`${lien_api}/players`,async (req,res) =>{
      db.all('SELECT * FROM plutonium_players_online', (err, data) => {
      res.json({
        dataa: data
      })
    })
  })
}
set_api()

app.listen(5000,() => console.log('listening on port 5000'))