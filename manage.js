function addRows(connection, res) {
    const sql = "INSERT INTO clientes(Name, Cpf) VALUES ?";
    const values = [
        ['Carlota', '12345678901'],
        ['Joaquina', '09876543210'],
        ['Silva', '12312312399'],
        ['Douglas', '98765432101']
    ];
    connection.query(sql, [values], (error, results, fields) => {
        if(error) {
            return console.log(error);
        }
            console.log("Adicionados os registros");
            response.send(rows);
            // connection.end(); // fechar conexão
    })
}


module.exports = { addRows };