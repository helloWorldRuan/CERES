function home() {
    window.location.href = 'index.html'
}

// Máscaras dos campos
function maskTel(event) {
    let tecla = event.key;
    let telefone = event.target.value.replace(/\D+/g, "");

    if (/^[0-9]$/i.test(tecla)) {
        telefone = telefone + tecla;
        let tamanho = telefone.length;

        if (tamanho >= 12) {
            return false;
        }

        if (tamanho > 10) {
            telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (tamanho > 5) {
            telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (tamanho > 2) {
            telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            telefone = telefone.replace(/^(\d*)/, "($1");
        }

        event.target.value = telefone;
    }

    if (!["Backspace", "Delete"].includes(tecla)) {
        return false;
    }
}

function maskCNPJ() {
    var cnpj = document.getElementById('in_cnpj')

    if (cnpj.value.length == 2 || cnpj.value.length == 6) {
        cnpj.value += "."
    } else if (cnpj.value.length == 10) {
        cnpj.value += "/"
    } else if (cnpj.value.length == 15) {
        cnpj.value += "-"
    }

}

function maskCEP() {
    var cep = document.getElementById('in_cep')

    if (cep.value.length == 5) {
        cep.value += "-"
    }
}

// Checagem de campos e cadastro
function chkEmail() {
    var email = in_email.value

    var invalidEmail = email.indexOf("@") == -1
    var invalidEmail2 = email.length < 10

    if (email == "") {
        errorE.innerHTML = ""
    }
    else if (invalidEmail) {
        errorE.innerHTML = "Email inválido"
    } else if (invalidEmail2) {
        errorE.innerHTML = "Email inválido"
    } else {
        errorE.innerHTML = ""
    }
}

function chkPass() {
    var s1 = in_senha.value
    var s2 = in_conf_senha.value

    if (s1 != s2) {
        in_conf_senha.style.outline = '1px solid  #ff5213'
        error.innerHTML = "Senhas diferentes"
    } else {
        in_conf_senha.style.backgroundColor = '#d1f8cb'
        in_conf_senha.style.outline = 'none'
        error.innerHTML = ""
    }
}

function cadastrar() {

    var endereco = {
        estadoServer: sel_estado.value,
        cidadeServer: in_cidade.value,
        cepServer: in_cep.value.replaceAll('-', ''),
        complementoServer: in_complemento.value,
    }

    var telefone = in_telefone.value.replaceAll('-', '').replace(" ", "")
    var tipo = localStorage.getItem("tipo")

    var cliente = {
        nomeServer: in_nome.value,
        cnpjServer: in_cnpj.value.replaceAll('.', '').replace('/', ''),
        telefoneServer: telefone.slice(4, 13),
        dddServer: telefone.slice(1, 3),
        emailServer: in_email.value,
        usernameServer: in_user.value,
        senhaServer: in_senha.value,
        confirmacaoSenha: in_conf_senha.value,
        fkEndereco: undefined,
        tipoServer: tipo,
    }

    // console.log(tipo)
    // console.log(cnpjVar)
    // console.log(dddVar)
    // console.log(telefoneVar)
    // console.log(cepVar)

    fetch("/usuarios/cadastrarEndereco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(endereco)
    }).then(function (resposta) {
        console.log("Endereço: ", resposta);

        if (resposta.ok) {
            resposta.json()
                .then(function (resposta) {
                    console.log(resposta)

                    cliente.fkEndereco = resposta[0].idEndereco

                    fetch("/usuarios/cadastrarCliente", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(cliente)
                    }).then(function (resposta) {
                        console.log("Cliente:", resposta)

                        if (resposta.ok) {
                            alert('Cadastro realizado com sucesso!')
                            window.location.href = "login.html"

                        }
                    })

                }).catch(function (error) {
                    console.error(error)
                })

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);

    });

    return false;
}


