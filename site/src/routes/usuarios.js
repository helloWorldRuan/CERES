var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})

router.post("/cadastrarCliente", function (req, res) {
    usuarioController.cadastrarCliente(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;