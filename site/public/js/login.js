

function login() {

    var emailVar = in_user.value;
    var senhaVar = in_senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert('⚠ Usuário ou senha incorretas!')
        return false;
    }
    else {
        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;

                    loader.style = "z-index: 1; opacity: 1"
                    box = document.querySelector('.box').style = "opacity: 1; width: 100vw; height: 100vh"

                    setTimeout(function () {
                        window.location = "./dashboard.html";
                    }, 1000);

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }

}



