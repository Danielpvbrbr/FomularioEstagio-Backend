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
    const nome = req.body.nome;
    const sexo = req.body.sexo;
    const dataCadastro = req.body.dataCadastro;
    const cidade = req.body.cidade;
    
    connection.query('INSERT INTO contatostb (nome, sexo, dataCadastro, cidade) VALUES (?,?,?,?)',[nome, sexo, dataCadastro, cidade],
    (err, result) => {
        if(err){
            console.log(err)
        }else {
            res.send(result)
        }
    })
});

app.get('/api/getcontt',(req, res) => {
    connection.query('SELECT * FROM contatostb',(err, result) => { 
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
});
app.get('/api/get',(req, res) => {
    connection.query('SELECT COUNT(*) as qtd ,sexo, cidade FROM contatostb WHERE cidade="Bicas" group by sexo',(err, result) => { 
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
});



app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
    console.log(`Acessar http://localhost:${port}`);
});