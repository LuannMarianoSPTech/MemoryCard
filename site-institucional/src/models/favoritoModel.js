var database = require("../database/config");

function listar(idUsuario) {
    var instrucaoSql = `
        SELECT j.idJogo, j.titulo, g.nome AS genero, p.nome AS plataforma, f.dtFavoritado
            FROM favorito f
            JOIN jogo j       ON f.fkJogo = j.idJogo
            JOIN genero g     ON j.fkGenero = g.idGenero
            JOIN plataforma p ON j.fkPlataforma = p.idPlataforma
            WHERE f.fkUsuario = ${idUsuario}
            ORDER BY p.capitulo, j.titulo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionar(idUsuario, idJogo) {
    var instrucaoSql = `
        INSERT IGNORE INTO favorito (fkUsuario, fkJogo) VALUES (${idUsuario}, ${idJogo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function remover(idUsuario, idJogo) {
    var instrucaoSql = `
        DELETE FROM favorito WHERE fkUsuario = ${idUsuario} AND fkJogo = ${idJogo};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarPorPlataforma(idUsuario) {
    var instrucaoSql = `
        SELECT p.nome AS plataforma, COUNT(f.fkJogo) AS total
            FROM plataforma p
            LEFT JOIN jogo j     ON j.fkPlataforma = p.idPlataforma
            LEFT JOIN favorito f ON f.fkJogo = j.idJogo AND f.fkUsuario = ${idUsuario}
            GROUP BY p.idPlataforma, p.nome, p.capitulo
            ORDER BY p.capitulo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarPorGenero(idUsuario) {
    var instrucaoSql = `
        SELECT g.nome AS genero, COUNT(f.fkJogo) AS total
            FROM favorito f
            JOIN jogo j   ON f.fkJogo = j.idJogo
            JOIN genero g ON j.fkGenero = g.idGenero
            WHERE f.fkUsuario = ${idUsuario}
            GROUP BY g.idGenero, g.nome
            ORDER BY total DESC, g.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    adicionar,
    remover,
    contarPorPlataforma,
    contarPorGenero
};
