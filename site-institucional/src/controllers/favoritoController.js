var favoritoModel = require("../models/favoritoModel");

function idValido(valor) {
    return /^[0-9]+$/.test(String(valor));
}

function tratarErro(res, erro, acao) {
    console.log(erro);
    console.log(`\nHouve um erro ao ${acao}! Erro: `, erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!idValido(idUsuario)) {
        return res.status(400).send("idUsuario inválido!");
    }

    favoritoModel.listar(idUsuario)
        .then((resultado) => res.status(200).json(resultado))
        .catch((erro) => tratarErro(res, erro, "listar os favoritos"));
}

function adicionar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idJogo = req.body.idJogoServer;

    if (!idValido(idUsuario)) {
        res.status(400).send("Seu idUsuario está undefined ou inválido!");
    } else if (!idValido(idJogo)) {
        res.status(400).send("Seu idJogo está undefined ou inválido!");
    } else {
        favoritoModel.adicionar(idUsuario, idJogo)
            .then((resultado) => res.status(201).json(resultado))
            .catch((erro) => tratarErro(res, erro, "favoritar o jogo"));
    }
}

function remover(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idJogo = req.body.idJogoServer;

    if (!idValido(idUsuario)) {
        res.status(400).send("Seu idUsuario está undefined ou inválido!");
    } else if (!idValido(idJogo)) {
        res.status(400).send("Seu idJogo está undefined ou inválido!");
    } else {
        favoritoModel.remover(idUsuario, idJogo)
            .then((resultado) => res.status(200).json(resultado))
            .catch((erro) => tratarErro(res, erro, "remover o favorito"));
    }
}

function contarPorPlataforma(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!idValido(idUsuario)) {
        return res.status(400).send("idUsuario inválido!");
    }

    favoritoModel.contarPorPlataforma(idUsuario)
        .then((resultado) => res.status(200).json(resultado))
        .catch((erro) => tratarErro(res, erro, "buscar favoritos por plataforma"));
}

function contarPorGenero(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!idValido(idUsuario)) {
        return res.status(400).send("idUsuario inválido!");
    }

    favoritoModel.contarPorGenero(idUsuario)
        .then((resultado) => res.status(200).json(resultado))
        .catch((erro) => tratarErro(res, erro, "buscar favoritos por gênero"));
}

module.exports = {
    listar,
    adicionar,
    remover,
    contarPorPlataforma,
    contarPorGenero
};
