-- GRANT ALL PRIVILEGES ON memorycard.* TO 'user_dataViz'@'localhost';
-- FLUSH PRIVILEGES;

DROP DATABASE IF EXISTS memorycard;
CREATE DATABASE memorycard;
USE memorycard;

CREATE TABLE usuario (
    idUsuario   INT PRIMARY KEY AUTO_INCREMENT,
    nome        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    telefone    CHAR(11)     NOT NULL,
    senha       VARCHAR(30)  NOT NULL,
    dtCadastro  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plataforma (
    idPlataforma   INT PRIMARY KEY AUTO_INCREMENT,
    nome           VARCHAR(30)  NOT NULL UNIQUE,
    capitulo       TINYINT      NOT NULL,
    tema           VARCHAR(60),
    anoLancamento  YEAR
);

CREATE TABLE genero (
    idGenero  INT PRIMARY KEY AUTO_INCREMENT,
    nome      VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE jogo (
    idJogo        INT PRIMARY KEY AUTO_INCREMENT,
    titulo        VARCHAR(100) NOT NULL,
    fkPlataforma  INT NOT NULL,
    fkGenero      INT NOT NULL,
    CONSTRAINT fkJogoPlataforma FOREIGN KEY (fkPlataforma) REFERENCES plataforma(idPlataforma),
    CONSTRAINT fkJogoGenero     FOREIGN KEY (fkGenero)     REFERENCES genero(idGenero)
);

CREATE TABLE favorito (
    fkUsuario     INT NOT NULL,
    fkJogo        INT NOT NULL,
    dtFavoritado  DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (fkUsuario, fkJogo),
    CONSTRAINT fkFavoritoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario) ON DELETE CASCADE,
    CONSTRAINT fkFavoritoJogo    FOREIGN KEY (fkJogo)    REFERENCES jogo(idJogo)       ON DELETE CASCADE
);

INSERT INTO plataforma (nome, capitulo, tema, anoLancamento) VALUES
    ('PlayStation 2', 1, 'Onde tudo começou',       2000),
    ('PlayStation 3', 2, 'Uma nova geração',        2006),
    ('PlayStation 4', 3, 'Histórias que cresceram', 2013),
    ('PlayStation 5', 4, 'O próximo nível',         2020),
    ('PC',            5, 'Um universo sem limites', NULL);

INSERT INTO genero (nome) VALUES
    ('Ação e Aventura'),
    ('Mundo Aberto'),
    ('Esportes'),
    ('Tiro'),
    ('Luta'),
    ('Corrida'),
    ('Terror');

INSERT INTO jogo (titulo, fkPlataforma, fkGenero) VALUES
    -- PS2
    ('God of War I e II', 1, 1),
    ('The Warriors', 1, 5), 
    ('Need for Speed: Underground 2', 1, 6),  
    ('Tony Hawk''s', 1, 3),                    
    ('Resident Evil 4', 1, 7),                
    ('Spider-Man 3', 1, 2),                    
    ('GTA: San Andreas', 1, 2),               
    -- PS3
    ('Skate 3', 2, 3),                        
    ('Army of Two', 2, 4),                     
    ('GTA IV', 2, 2),                         
    ('GTA V', 2, 2),                          
    ('Assassin''s Creed III', 2, 2),           
    ('God of War III', 2, 1),                
    -- PS4
    ('Fortnite', 3, 4),                        
    ('Rocket League', 3, 3),                   
    ('Spider-Man', 3, 2),                     
    ('Call Of Duty - Black Ops 3', 3, 4),     
    -- PS5
    ('GTA VI', 4, 2),                         
    -- PC
    ('Valorant', 5, 4),                     
    ('Peak', 5, 1),                            
    ('Pratfall', 5, 1),                       
    ('CS:GO', 5, 4),                         
    ('Combat Arms', 5, 4);               

INSERT INTO usuario (nome, email, telefone, senha) VALUES
    ('Usuário Teste', 'teste@memorycard.com', '11999999999', 'Teste@123');

INSERT INTO favorito (fkUsuario, fkJogo) VALUES
    (1, 1), (1, 2), (1, 6), (1, 7),
    (1, 8), (1, 10), (1, 11), (1, 13),
    (1, 14), (1, 15);

SELECT u.nome AS usuario, j.titulo, g.nome AS genero, p.nome AS plataforma
    FROM favorito f
    JOIN usuario u    ON f.fkUsuario = u.idUsuario
    JOIN jogo j       ON f.fkJogo = j.idJogo
    JOIN genero g     ON j.fkGenero = g.idGenero
    JOIN plataforma p ON j.fkPlataforma = p.idPlataforma
    WHERE u.idUsuario = 1;

-- Gráfico 1: favoritos por plataforma
SELECT p.nome AS plataforma, COUNT(f.fkJogo) AS total
    FROM plataforma p
    LEFT JOIN jogo j     ON j.fkPlataforma = p.idPlataforma
    LEFT JOIN favorito f ON f.fkJogo = j.idJogo AND f.fkUsuario = 1
    GROUP BY p.idPlataforma, p.nome, p.capitulo
    ORDER BY p.capitulo;

-- Gráfico 2: gêneros mais jogados (entre os favoritos)
SELECT g.nome AS genero, COUNT(f.fkJogo) AS total
    FROM favorito f
    JOIN jogo j   ON f.fkJogo = j.idJogo
    JOIN genero g ON j.fkGenero = g.idGenero
    WHERE f.fkUsuario = 1
    GROUP BY g.idGenero, g.nome
    ORDER BY total DESC, g.nome;
