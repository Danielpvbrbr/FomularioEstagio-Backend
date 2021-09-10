const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = '8000';
const { connection } = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Seviço execultado com sucesso !');
});

app.post('/api/postcontt', (req, res) => {
    const newNome = req.body.newNome;
    const newSexo = req.body.newSexo;
    const newCidade = req.body.newCidade;
    const newData = req.body.newData;;

    connection.query('INSERT INTO contatostb (nome, sexo, dataReg, cidade) VALUES (?,?,?,?)', [newNome, newSexo, newData, newCidade],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.get('/api/getcontt', (req, res) => {
    connection.query('SELECT * FROM contatostb', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.delete('/api/delID/:id', (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM contatostb WHERE id=${id}`,
        (result, err) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

// SELECT
// COUNT(*) AS qtd,
// sexo,
// cidade
// FROM
// contatostb
// WHERE
// cidade = "Bicas" AND MONTH(dataReg) = "09"
// GROUP BY
// codcontato
// SELECT
//     COUNT(*) AS qtd,
//     sexo,
//     cidade,
//     dataReg
    
// FROM
//     contatostb
 
// GROUP BY
//     codcontato

//SELECT COUNT(*) AS qtd, sexo, cidade FROM contatostb WHERE cidade ="Juiz de fora" GROUP BY sexo

//SELECT COUNT(*) AS qtd, sexo, cidade FROM contatostb WHERE cidade ="Bicas" GROUP BY sexo
//UNION ALl
//SELECT COUNT(*) AS qtd, sexo, cidade FROM contatostb WHERE cidade ="Juiz de fora" GROUP BY sexo

//SELECT dataReg, COUNT(*) AS qtd, sexo, cidade FROM contatostb GROUP BY codcontato

app.get('/api/get/jf', (req, res) => {
    connection.query('SELECT COUNT(*) AS qtd, sexo, cidade FROM contatostb WHERE cidade ="Juiz de fora" GROUP BY sexo', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.get('/api/get/bc', (req, res) => {
    connection.query('SELECT COUNT(*) AS qtd, sexo, cidade FROM contatostb WHERE cidade = "Bicas" GROUP BY sexo', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })

});

app.put('/ap/upd', (req, res) => {
    const id = req.body.id;
    const newNome = req.body.newNome;
    const newSexo = req.body.newSexo;
    const newCidade = req.body.newCidade;
    const newData = req.body.newData;

    connection.query(`UPDATE contatostb SET nome=?, dataReg=?, sexo=?, cidade=? WHERE codcontato=?`, [newNome, newData, newSexo, newCidade, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
});

app.delete('/ap/delete/:id', (req, res) => {
    const id = req.params.id;

    connection.query(`DELETE FROM contatostb WHERE codcontato = ${id}`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
})



app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
    console.log(`Acessar http://localhost:${port}`);
});