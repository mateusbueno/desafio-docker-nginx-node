# Desafio Docker + nginx + node

Atenção: após a primeira execução dos containers, é preciso rodar os seguintes comandos para o Mysql:
`docker exec -it db bash`
Dentro do bash do container do Mysql:
`mysql -uroot -p`
Digite a senha configurada no docker-compose.
`USE nodedb;`
`CREATE TABLE people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id));`
`exit;`

Aí sim será possível rodar a aplicação sem problemas.