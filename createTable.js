//let manage = require("./manage");

function createTable(connection) {
    const sql = `CREATE TABLE IF NOT EXISTS clientes(
                  Id int NOT NULL AUTO_INCREMENT,
                  Name VARCHAR(255) NOT NULL,
                  Cpf CHAR(11) NOT NULL,
                  PRIMARY KEY (Id)
                );`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return console.log(error);
      }
        // manage.addRows(connection); // adicionar array de linhas na tabela ao criar a tabela ou reiniciar o servidor
    })
  }

  module.exports = { createTable }; // importar módulo
  