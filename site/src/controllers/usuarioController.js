var usuarioModel = require("../models/usuarioModel")


function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController")
    res.json("ESTAMOS FUNCIONANDO!")
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro)
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage)
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function entrar(req, res) {
    var email = req.body.emailServer
    var senha = req.body.senhaServer

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!")
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!")
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`)
                    console.log(`Resultados: ${JSON.stringify(resultado)}`) // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado)
                        res.json(resultado[0])
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)")
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!")
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro)
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage)
                    res.status(500).json(erro.sqlMessage)
                }
            );
    }

}

function cadastrarEndereco(req, res) {

    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var cep = req.body.cepServer;
    var complemento = req.body.complementoServer;

    if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    } else {

        usuarioModel.cadastrarEndereco(estado, cidade, cep, complemento)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarCliente(req, res) {

    var nome = req.body.nomeServer
    var cnpj = req.body.cnpjServer
    var ddd = req.body.dddServer
    var telefone = req.body.telefoneServer
    var email = req.body.emailServer
    var username = req.body.usernameServer
    var senha = req.body.senhaServer
    var fkEndereco = req.body.fkEndereco
    var fkTipo = req.body.tipoServer

    console.log(nome, cnpj, ddd, telefone, email, username, senha, fkEndereco, fkTipo);
   

   if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!")
    }else if (cnpj == undefined) {
        res.status(400).send("Sua cnpj está undefined!")
    }else if (ddd == undefined) {
        res.status(400).send("Sua ddd está undefined!")
    }else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!")
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!")
    }else if (username == undefined) {
        res.status(400).send("Seu username está undefined!")
    }else if (senha == undefined) {
        res.status(400).send("Seu senha está undefined!")
    }else if (fkEndereco == undefined) {
        res.status(400).send("Seu enedereco está undefined!")
    }else if (fkTipo == undefined) {
        res.status(400).send("Seu tipo está undefined!")
    }else {

        usuarioModel.cadastrarCliente(nome, cnpj, ddd, telefone, email, username, senha, fkEndereco, fkTipo)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro)
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    )
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

module.exports = {
    entrar,
    cadastrarEndereco,
    cadastrarCliente,
    listar,
    testar
}