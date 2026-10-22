CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros(
id INT AUTO_INCREMENT PRIMARY KEY,
nome_livro VARCHAR(150),
nome_autor VARCHAR(150),
descricao TEXT
);

INSERT INTO livros (nome_livro, nome_autor, descricao) VALUES
('Diário de Um Banana', 
'Jeff Kinney', 
'Diário de um Banana (Diary of a Wimpy Kid) é uma famosa série 
de livros de ficção e comédia 
escrita e ilustrada pelo cartunista americano Jeff Kinney.'),
('Capitão Cueca', 
'Dav Pilkey', 
'O Capitão Cueca é o protagonista de uma famosa série de livros 
infantis, animações e filme 
criada pelo autor estadunidense Dav Pilkey.'),
('Pequeno Príncipe', 
'Antonie de Saint-Exupéry', 
'(Le Petit Prince), escrito por Antoine de Saint-Exupéry e publicado em 1943, é uma novela poética 
e filosófica que narra o encontro entre um piloto caído no deserto do Saara e um garoto loiro 
vindo de um pequeno asteroide chamado B-612.');

SELECT * FROM livros;