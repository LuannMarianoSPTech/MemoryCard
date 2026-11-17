var express = require("express");
var router = express.Router();

var favoritoController = require("../controllers/favoritoController");

// Jogos favoritos do usuário (usado nas páginas ps2..ps5 e na dashboard)
router.get("/listar/:idUsuario", function (req, res) {
    favoritoController.listar(req, res);
});

// Favoritar / desfavoritar (estrela dos cards)
router.post("/adicionar", function (req, res) {
    favoritoController.adicionar(req, res);
});

router.delete("/remover", function (req, res) {
    favoritoController.remover(req, res);
});

// Dados dos gráficos da dashboard
router.get("/plataformas/:idUsuario", function (req, res) {
    favoritoController.contarPorPlataforma(req, res);
});

router.get("/generos/:idUsuario", function (req, res) {
    favoritoController.contarPorGenero(req, res);
});

module.exports = router;
