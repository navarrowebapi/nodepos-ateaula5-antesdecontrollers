const express = require('express');
var router = express.Router();//intercepta todas as rotas
var Produto = require("../app/models/product");
var mongoose = require('mongoose');

//ROTAS PARA PRODUTO
router.post("/", function (req, res) {
    var produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(function (error) {
        if (error)
            res.send("Erro ao tentar salvar um novo produto" + error);

        res.status(201).json({ message: 'produto inserido com sucesso' });
    });
})


//READ ou GET-ALL
//localhost:3000/produtos
router.get('/', function (req, res) {
    Produto.find(function (err, prods) {
        if (err)
            res.send(err);
        res.status(200).json({
            message: "retorno de todos os produtos",
            todosProdutos: prods
        });
    });
});

//GETBYID
//localhost:3000/produtos/5b3405fcc712400cfcc61a39
router.get('/:productId', function (req, res) {
    const id = req.params.productId;
    Produto.findById(id, function (err, produto) {
        if (err) {
            res.status(500).json({
                message: "Erro ao tentar encontrar produto; ID mal formado"
            });
        }
        else if (produto == null) {
            res.status(400).json({
                message: "produto não encontrado para o id passado"
            });
        } else {
            res.status(200).json({
                message: "retorno do produto",
                produto: produto
            });
        }
    });
});

//PUT - atualizar um produto passando os novos dados e o id do produto a ser atualizado.
//Verbo PUT - Ex.: localhost:3000/produtos/5b3405fcc712400cfcc61a39
router.put('/:productId', function (req, res) {
    const id = req.params.productId;
    console.log(id);
    Produto.findById(id, function (err, produto) {
        if (err) {
            res.status(500).json({
                message: "Erro ao tentar encontrar produto; ID mal formado"
            });
        }
        else if (produto == null) {
            res.status(400).json({
                message: "produto não encontrado para o id passado"
            });
        } else {
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;
            produto.save(function (error) {
                if (error)
                    res.send("Erro ao tentar atualizar produto" + error);
                res.status(200).json({ message: 'produto atualizado com sucesso' });
            });
        }
    });
});

//DELETE - deletar um produto passando o id do produto a ser removido.
//localhost:3000/produtos/5b3405fcc712400cfcc61a39
router.delete('/:productId', function (req, res) {
    Produto.findByIdAndRemove(req.params.productId, (err, produto) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Produto removido com sucesso",
            id: produto.id
        };
        return res.status(200).send(response);
    });
});


module.exports = router;