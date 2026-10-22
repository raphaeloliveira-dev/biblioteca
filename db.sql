CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros(
id INT AUTO_INCREMENT PRIMARY KEY,
nome_livro VARCHAR(150),
nome_autor VARCHAR(150),
descricao TEXT
);

SELECT * FROM livros;

