CREATE DATABASE test;
USE test;

SELECT * FROM test.clientes;

CREATE TABLE IF NOT EXISTS test.clientes (
Id INT NOT NULL AUTO_INCREMENT,
Name VARCHAR(255) NOT NULL,
Cpf CHAR(11) NOT NULL,
PRIMARY KEY(Id)
);

INSERT INTO test.clientes (Name, Cpf)
	VALUES ("Carlos", 14569877546),
    ("Gustavo", 25498765482),
    ("Mariana", 65497864879);

DROP TABLE test.clientes;

SHOW VARIABLES WHERE Variable_name = 'port';