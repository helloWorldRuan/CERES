
let proximaAtualizacao;

window.onload = obterDados()

function obterDados() {
    obterDadosGrafico(1)
}

var temperatura
var umidade

function obterDadosGrafico(idArmazem) {

    fetch(`/medidas/ultimas/${idArmazem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                temperatura = resposta[0].temperatura
                umidade = resposta[0].umidade
                tempMax = resposta[0].tempMax
                umiMax = resposta[0].umiMax
                var box = document.querySelectorAll(".box")

                if (temperatura > 20) {
                    box[0].style = "background-color: #ff3c4c; animation: alert .5s infinite ease"
                    statusTemp.innerHTML = "CRÍTICO"
                } else if (temperatura > 15) {
                    box[0].style = "background-color: #ffbb55"
                    statusTemp.innerHTML = "ATENÇÃO"
                } else if (temperatura > 9) {
                    box[0].style = "background-color: #49ae39"
                    statusTemp.innerHTML = "DENTRO DO IDEAL"
                } else if (temperatura > 4) {
                    box[0].style = "background-color: #ffbb55"
                    statusTemp.innerHTML = "ATENÇÃO"
                } else {
                    box[0].style = "background-color: #ff3c4c; animation: alert .5s infinite ease"
                    statusTemp.innerHTML = "CRÍTICO"
                }

                if (tempMax > 20) {
                    box[2].style = "background-color: #ff3c4c"
                    statusTempMax.innerHTML = "CRÍTICO"
                } else if (tempMax > 15) {
                    box[2].style = "background-color: #ffbb55"
                    statusTempMax.innerHTML = "ATENÇÃO"
                } else if (tempMax > 9) {
                    box[2].style = "background-color: #49ae39"
                    statusTempMax.innerHTML = "DENTRO DO IDEAL"
                } else if (tempMax > 4) {
                    box[2].style = "background-color: #ffbb55"
                    statusTempMax.innerHTML = "ATENÇÃO"
                } else {
                    box[2].style = "background-color: #ff3c4c"
                    statusTempMax.innerHTML = "CRÍTICO"
                }

                if (umidade > 25) {
                    box[1].style = "background-color: #ff3c4c; animation: alert .5s infinite ease"
                    statusUmi.innerHTML = "CRÍTICO"
                } else if (umidade > 20) {
                    box[1].style = "background-color: #ffbb55"
                    statusUmi.innerHTML = "ATENÇÃO"
                } else if (umidade > 14) {
                    box[1].style = "background-color: #49ae39"
                    statusUmi.innerHTML = "DENTRO DO IDEAL"
                } else if (umidade > 9) {
                    box[1].style = "background-color: #ffbb55"
                    statusUmi.innerHTML = "ATENÇÃO"
                } else {
                    box[1].style = "background-color: #ff3c4c; animation: alert .5s infinite ease"
                    statusUmi.innerHTML = "CRÍTICO"
                }

                if (umiMax > 25) {
                    box[3].style = "background-color: #ff3c4c"
                    statusUmiMax.innerHTML = "CRÍTICO"
                } else if (umiMax > 20) {
                    box[3].style = "background-color: #ffbb55"
                    statusUmiMax.innerHTML = "ATENÇÃO"
                } else if (umiMax > 14) {
                    box[3].style = "background-color: #49ae39"
                    statusUmiMax.innerHTML = "DENTRO DO IDEAL"
                } else if (umiMax > 9) {
                    box[3].style = "background-color: #ffbb55"
                    statusUmiMax.innerHTML = "ATENÇÃO"
                } else {
                    box[3].style = "background-color: #ff3c4c"
                    statusUmiMax.innerHTML = "CRÍTICO"
                }

                kpiTemp.innerHTML = temperatura + "ºC"
                kpiUmi.innerHTML = umidade + "%"
                kpiTempMax.innerHTML = tempMax + "ºC"
                kpiUmiMax.innerHTML = umiMax + "%"

                resposta.reverse();

                plotarGrafico(resposta, idArmazem);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/medidas/selectSacas/${idArmazem}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (respostaSaca) {
                    console.log("Sacas:", respostaSaca)

                    plotarGraficoSaca(respostaSaca)
                })
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico(resposta, idArmazem) {

    console.log('iniciando plotagem do gráfico...');

    const label = []

    const data = {
        labels: label,
        datasets: [{
            label: 'Temperatura',
            backgroundColor: '#49ae39',
            borderColor: '#49ae39',
            data: [],
        },
        {
            label: 'Umidade',
            backgroundColor: '#FFF0A6',
            borderColor: '#FFF0A6',
            data: [],
        }
        ]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        label.push(registro.horario_grafico);
        data.datasets[1].data.push(registro.umidade);
        data.datasets[0].data.push(registro.temperatura);
    }
    

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#fff'
                    },
                },

            }
        }
    }

    // Adicionando gráfico criado em div na tela
    const lineChart = new Chart(
        document.getElementById('chartLine'),
        config
    );

    setTimeout(() => atualizarGrafico(idArmazem, data, lineChart), 2000);
}

function plotarGraficoSaca(resposta) {

    label = []
    data = []

    for (var i =  0; i < resposta.length; i++){
        label.push(resposta[i].nome)
        data.push(resposta[i].Sacas)
    }

    console.log(label, data)

    const dataSaca = {
        labels: label,
        datasets: [{
            label: 'Sacas por armazém',
            data: data,
            backgroundColor: [
                '#49ae39',
                '#FFF0A6',
                '#3991ae'
            ]
        }]
    };

    const configSaca = {
        type: 'polarArea',
        data: dataSaca,
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#fff'
                    },
                }
            }
        }
    }

    const radarChart = new Chart(
        document.getElementById('chartRadar'),
        configSaca
    );
}

function atualizarGrafico(idArmazem, data, lineChart) {

    fetch(`/medidas/tempo-real/${idArmazem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(data);



                if (novoRegistro[0].horario_grafico == data.labels[data.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].horario_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(data.labels[data.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    temperatura = novoRegistro[0].temperatura
                    umidade = novoRegistro[0].umidade

                    // Simular condições
                    temperatura -= 1 + Math.random() * 20
                    umidade -= 45

                    var box = document.querySelectorAll(".box")

                    if (temperatura > 20) {
                        box[0].style = "background-color: #ff3c4c; animation: alert .5s infinite ease"
                        statusTemp.innerHTML = "CRÍTICO"
                    } else if (temperatura > 15) {
                        box[0].style = "background-color: #ffbb55"
                        statusTemp.innerHTML = "ATENÇÃO"
                    } else if (temperatura > 9) {
                        box[0].style = "background-color: #49ae39"
                        statusTemp.innerHTML = "DENTRO DO IDEAL"
                    } else if (temperatura > 4) {
                        box[0].style = "background-color: #ffbb55"
                        statusTemp.innerHTML = "ATENÇÃO"
                    } else {
                        box[0].style = "background-color: #ff3c4c; animation: alert .5s infinite ease"
                        statusTemp.innerHTML = "CRÍTICO"
                    }

                    if (umidade > 25) {
                        box[1].style = "background-color: #ff3c4c; animation: alert .5s infinite ease"
                        statusUmi.innerHTML = "CRÍTICO"
                    } else if (umidade > 20) {
                        box[1].style = "background-color: #ffbb55"
                        statusUmi.innerHTML = "ATENÇÃO"
                    } else if (umidade > 14) {
                        box[1].style = "background-color: #49ae39"
                        statusUmi.innerHTML = "DENTRO DO IDEAL"
                    } else if (umidade > 9) {
                        box[1].style = "background-color: #ffbb55"
                        statusUmi.innerHTML = "ATENÇÃO"
                    } else {
                        box[1].style = "background-color: #ff3c4c; animation: alert .5s infinite ease"
                        statusUmi.innerHTML = "CRÍTICO"
                    }

                   

                    kpiTemp.innerHTML = temperatura.toFixed(1) + "ºC"
                    kpiUmi.innerHTML = umidade.toFixed(1) + "%"

                    // tirando e colocando valores no gráfico
                    data.labels.shift(); // apagar o primeiro
                    data.labels.push(novoRegistro[0].horario_grafico); // incluir um novo momento

                    data.datasets[1].data.shift();  // apagar o primeiro de umidade
                    data.datasets[1].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                    data.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    data.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    lineChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idArmazem, data, lineChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idArmazem, data, lineChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}