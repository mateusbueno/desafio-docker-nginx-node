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

buscaRegistros = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM people ORDER BY id DESC`,  (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

app.get('/', async(req, res) => {
    try {
        await insereRegistro('Mateus');
        const resultSelect = await buscaRegistros();
        let listaUsers = '';
        for (let i = 0; i < resultSelect.length ; i++) {
            listaUsers+='<p><b>User:</b> ' + resultSelect[i].name + ' - <b>Id:</b> ' + resultSelect[i].id + '</p>';
        }
        res.send('<h1>Full Cycle Rocks!</h1><h4>Lista de nomes cadastrados:</h4>' + listaUsers)
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
