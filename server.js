import express from 'express';
import dotenv from 'dotenv';
import conectarBanco from './db.js';

dotenv.config();

const app = express();
const PORTA = Number(process.env.PORTA) || 3000;
const conexao = conectarBanco();

app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.get('/livros', async (req, res) => {
  try {
    const sql = 'SELECT * FROM livros';
    const [resposta] = await conexao.query(sql);
    res.json(resposta);
  } catch (error) {
    console.error('Erro ao consultar livros:', error);
    res.status(500).json({ erro: 'Erro ao consultar livros.' });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

app.put('/lvros/:id', async (req,res) =>{
    const id = req.params.id;
    const { nome_livro, nome_autor, descricao} = req.body;
    const novoLivro = [
        nome_livro,
        nome_autor,
        descricao
    ];
   const [reposta] = await conexao.query("UPDATE livro set nome_livro = ? , nome_autor = ?, descticao = ?", novoLivro);
    if(reposta.affectedRows > 0){
        res.json({message: "Livro atualizado"});
    }else{
        res.status(400).json({message: "Livro não atualizado"});
    }

});

app.listen(PORTA, () =>{
    console.log("Servidor rodando em http://localhost:${PORTA}");   
});

app.post("/livros", async (req,res) => {
    const { nome_livro, nome_autor, descricao} = req.body;
    const [reposta] = await conexao.query("INSERTO INTO livros (nome_livro, nome_autor, descricao) VALUES (?, ?, ?", [nome_livro, nome_livro, descricao]);
    res.status(201).json({
        id: reposta.insertId,
        message: "Livro não cadastrado com sucesso!"
    });
});
