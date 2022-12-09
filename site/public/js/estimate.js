// Variáveis globais de input
var i = 0

var size1 = 0
var size2 = 0
var size3 = 0

var saca1 = 0
var saca2 = 0
var saca3 = 0

var price1 = 0
var price2 = 0
var price3 = 0

var tipo1 = 0
var tipo2 = 0
var tipo3 = 0

// Informações
var open = 0
function infoModal() {
    if (open == 0) {
        open++
        var modal = document.querySelector('.info-modal')
        modal.style.opacity = 1
        modal.style.height = '200px'
    } else{
        var modal = document.querySelector('.info-modal')
        modal.style.opacity = 0
        modal.style.height = 0
        open = 0
    }

}

console.log(open)


// Recomeçar o cálculo
function refresh() {
    i = 0
    field.innerHTML = ""
    section.style.display = "none"
}

// Adiciona inputs para armazém
function addInput() {
    i += 1
    if (i == 1) {

        // Adiciona títulos dos inputs
        field.innerHTML += `
            <div class="content-campo">
                <div class="campo">
                    <label>Tamanho em m²</label>
                </div>
                <div class="campo">
                    <label>Sacas</label>
                </div>
                <div class="campo">
                    <label>Valor saca</label>
                </div>
                <div class="campo">
                    <label>Tipo</label>
                </div>
            </div>`

        // Adiciona botão Calcular    
        insertButton.innerHTML = "<a href='#section'><button onclick='calcular()'>Calcular</button></a>"
    }
    if (i < 4) {
        field.innerHTML += `
            <div class="content-campo">
                <div class="campo">
                    <input id="in_size${i}" type='text' placeholder='23m²'> 
                </div>
                <div class="campo">
                    <input id="in_saca${i}" type='text' placeholder='58'> 
                </div>
                <div class="campo">
                    <input id='in_price${i}' type='text' placeholder='R$1400'> 
                </div>
                <div class="campo">
                    <select id="sel_tipo${i}">
                        <option value="n">Semente</option>
                        <option value="ca">Café</option>
                        <option value="ch">Cacau</option>
                        <option value="ar">Araucária</option>
                    </select>
                </div>
            </div>`
    }
}

// Calcula orçamento final de acordo com a quantidade de inputs
function calcular() {

    // 1 Armazém
    size1 = Number(in_size1.value)
    saca1 = Number(in_saca1.value)
    price1 = Number(in_price1.value)
    tipo1 = sel_tipo1.value

    // 2 Armazéns
    if (i > 1) {
        size2 = Number(in_size2.value)
        saca2 = Number(in_saca2.value)
        price2 = Number(in_price2.value)
        tipo2 = sel_tipo2.value
    }

    // 3 Armazéns
    if (i > 2) {
        size3 = Number(in_size3.value)
        saca3 = Number(in_saca3.value)
        price3 = Number(in_price3.value)
        tipo3 = sel_tipo3.value
    }

    // Booleanas de validação
    var noType = tipo1 == "n" || tipo2 == "n" || tipo3 == "n"

    var noSize = size1 <= 0 || i > 1 && size2 <= 0 || i > 2 && size3 <= 0

    var sacaNO = saca1 < 50 || i > 1 && saca2 < 50 || i > 2 && saca3 < 50

    var coffePrice = (tipo1 == "ca" && price1 < 1000 || tipo1 == "ca" && price1 > 1500) || (tipo2 == "ca" && price2 < 1000 || tipo2 == "ca" && price2 > 1500) || (tipo3 == "ca" && price3 < 1000 || tipo3 == "ca" && price3 > 1500)

    var cocoaPrice = (tipo1 == "ch" && price1 < 650 || tipo1 == "ch" && price1 > 900) || (tipo2 == "ch" && price2 < 650 || tipo2 == "ch" && price2 > 900) || (tipo3 == "ch" && price3 < 650 || tipo3 == "ch" && price3 > 900)

    var arauPrice = (tipo1 == "ar" && price1 < 100 || tipo1 == "ar" && price1 > 500) || (tipo2 == "ar" && price2 < 100 || tipo2 == "ar" && price2 > 500) || (tipo3 == "ar" && price3 < 100 || tipo3 == "ar" && price3 > 500)

    if (noType) {
        alert("Selecione o tipo de semente antes de prosseguir!")
    } else if (noSize) {
        alert("Informe um tamanho válido para o seu armazém")
    } else if (coffePrice) {
        alert("☕ Valor da saca de café fora da cotação da Cepea/Esalq")
    } else if (cocoaPrice) {
        alert("🍫 Valor da saca de cacau fora da cotação da Cepea/Esalq")
    } else if (arauPrice) {
        alert("🌲 Valor da saca de araucária fora da cotação da Cepea/Esalq")
    } else if (sacaNO) {
        alert("Sacas insuficientes para realizar a simulação")
    } else {
        section.style.display = "flex"
        boxes.style.width = "70%"

        var sensor = (size1 + size2 + size3) / 15
        var custo = (sensor * 32 + 200) * 1.5
        var saca = (saca1 + saca2 + saca3) * 0.35
        var price = ((saca1 * price1) + (saca2 * price2) + (saca3 * price3)) - custo
        t_sensor.innerHTML = Math.round(sensor)
        t_custo.innerHTML = custo.toLocaleString('pt-br', { style: "currency", currency: "BRL" })
        t_saca.innerHTML = Math.round(saca)
        t_economy.innerHTML = price.toLocaleString('pt-br', { style: "currency", currency: "BRL" })
    }

}