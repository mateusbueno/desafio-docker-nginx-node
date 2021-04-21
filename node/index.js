const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const conn = mysql.createConnection(config)

let nome, id

const sql = `INSERT INTO people(name) VALUES('Mateus')`
conn.query(sql)

conn.query("SELECT name, id FROM people ORDER BY id DESC LIMIT 1", (err, result) => {
    if (err) throw err;
    nome = result[0].name
    id = result[0].id
});

conn.end()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>' + '<p>Usuário Inserido: ' + nome + ' - ID: ' + id + '</p>')
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
