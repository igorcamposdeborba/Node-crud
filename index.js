const mysql = require("mysql");
const express = require("express"); // importação do express
require("nodemon");

const app = express(); // instanciar objeto
app.use(express.static('public')); // arquivos estáticos (html, css, javascript, público para o cliente)

// porta de conexao com o banco mysql
const port = 3000;

// importações
let create = require("./createTable");
const { response } = require("express");

// criar conexão com o banco de dados MySQL
let connection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
});

// REST: body parser do express
app.use(express.json());


// template para chamar conexão com o servidor a cada consulta SQL
function executeSQLQuery(query, response) {
  connection.getConnection((err, conn) => {
    if (err == true){
      throw err;
    }
    console.log(`Conectado com o id ${conn.threadId}`);
    conn.query(query, (err, rows) => {
      conn.release();

      if (!err) {
        response.send(rows); // enviar consulta ao banco de dados
      } else {
        console.log(err);
      }
    });
  });
}

// CONSULTAS SQL
// Selecionar toda a tabela
app.get("/", (req, res) => {
  executeSQLQuery("SELECT * FROM clientes", res);
});

// Selecionar por id
app.get('/:id?', (req, res) => {
  executeSQLQuery("SELECT * FROM clientes WHERE Id=" + [req.params.id], res);
});

// Deletar por id
app.delete("/:id?", (req, res) => {
  executeSQLQuery("DELETE FROM clientes WHERE Id=" + parseInt(req.params.id), res);
})

// Atualizar por id
app.put('', (req, res) => {
  const { id, name, cpf } = req.body;
  executeSQLQuery("UPDATE clientes SET Name='" + [name] +"', Cpf= '" + [cpf] + "' WHERE Id=" + [id] + ";", res);
})

// Adicionar array de linhas na tabela
app.post("", (req, res) => {
  const values = [
    ['Carlota', '12345678901'],
    ['Joaquina', '09876543210'],
    ['Silva', '12312312399'],
    ['Douglas', '98765432101']
  ];
  const sql = "INSERT INTO clientes (Name, Cpf) VALUES ";
  
  executeSQLQuery((sql, [values]), res);
})

// Adicionar linha individual na tabela
app.post("", (req, res) => {
  executeSQLQuery("INSERT INTO clientes (Name, Cpf) VALUES ('" + req.body.name + "', '" + req.body.cpf + "');", res);
})

app.listen(port); // iniciar servidor web api
console.log("API funcionando");