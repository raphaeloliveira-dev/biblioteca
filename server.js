const express = require('express');
const cors = require('cors');
const conexao = require('./db');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.status(200).json({mensagem: 'API de biblioteca esta funcionando'})
});

app.get('/biblioteca', (req, res) => {
    const sql = 'SELECT * FROM biblioteca';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar artistas' });
        }

        res.status(200).json(resultado);
    });
});

app.get('/artistas/', (req, res) => {
    const sql = 'SELECT * FROM biblioteca';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar biblioteca' });
        }

        res.status(200).json(resultado);
    });
});

app.get('/biblioteca/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM biblioteca WHERE id = ?';

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID do biblioteca inválido' });
    }

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao listar biblioteca' });
        }

        if (resultado.length === 0) {
            return res.status(404).json({ erro: 'Biblioteca não encontrado' });
        }

        res.status(200).json(resultado[0]);
    });
});

app.post('/artistas', (req, res) => {
    const { nome, genero, pais, duracao } = req.body;

    if (!nome || !genero || !pais || !duracao) {
        return res.status(400).json({ erro: 'Nome, gênero, país e duração são obrigatórios' });
    }

    const sql = 'INSERT INTO artistas (nome, genero, pais, duracao) VALUES (?, ?, ?, ?)';

    conexao.query(sql, [nome, genero, pais, duracao], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao cadastrar artista' });
        }

        res.status(201).json({
            mensagem: 'Artista cadastrado com sucesso',
            id: resultado.insertId
        });
    });
});

app.delete('/artistas/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'DELETE FROM artistas WHERE id = ?';
    conexao.query(sql,[id],(erro, resultado) => {
        if(erro){
            return res.status(500).json({
                erro: "Erro ao deletar artista."
            });
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensagem: "Artista não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Artista deletado com sucesso."
        });
    });
});

app.put("/artistas/:id", (req, res) => {
    const id = Number(req.params.id); 
    const { nome, genero, pais, duracao } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID do artista inválido." });
    }

    if (!nome || !genero || !pais || !duracao) {
        return res.status(400).json({ erro: "Nome, gênero, país e duração são obrigatórios." });
    }

    const sql = "UPDATE artistas SET nome = ?, genero = ?, pais = ?, duracao = ? WHERE id = ?";

    conexao.query(sql, [nome, genero, pais, duracao, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao atualizar artista."});
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({mensagem: "Artista não encontrado."});
        }
        res.status(200).json({mensagem: "Artista atualizado com sucesso."});
    });
});