
//Importar os pacotes desta maneira somente é permitido caso esteja trabalhando com o EcmaScript6, pois por default o Node não possibilita
//Portanto, devemos estar com o Babel fazendo esta ligação, ou seja, provendo recursos do ES6 para o NodeJs.
import express from 'express';
import bodyParser from 'body-parser';
var mongoose = require('mongoose');

//Inicialização do Express
const app = express();

//Configurar a app para usar o body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Conexão com BD
mongoose.connect("mongodb://localhost/BDPOS", {useNewUrlParser: true});

//ROTAS
var indexRoute = require('./src/routes/index-routes'); 
var productRoute = require('./src/routes/product-routes');

//Dedfinindo uma rota padrão (rota para informações e teste puro de roteamento, pois não bate no BD)
app.use('/api', indexRoute);
//rotas para produtos
app.use('/produtos', productRoute);


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

