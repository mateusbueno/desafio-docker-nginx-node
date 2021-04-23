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

insereRegistro = (name) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO people (name) VALUES (?)', [name], (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result.insertId);
        });
    });
};

buscaUltimoRegistro = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM people WHERE id = ` + id,  (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

app.get('/', async(req, res) => {
    try {
        const id = await insereRegistro('Mateus');
        const resultSelect = await buscaUltimoRegistro(id);
        res.send('<h1>Full Cycle</h1>' + '<p>Usuário Inserido: ' + resultSelect[0].name + ' - ID: ' + resultSelect[0].id + '</p>')
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
