var database = require("../database/config");

function buscarUltimasMedidas(idArmazem, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        (SELECT MAX(Temperatura) FROM metrica) AS tempMax, (SELECT MAX(Umidade) FROM metrica) AS umiMax,
        temperatura as temperatura, 
        umidade as umidade,  
                        horario,
                        FORMAT(horario, 'HH:mm:ss') as horario_grafico
                    from metrica
                    where fkArmazem = ${idArmazem}
                    order by idMetrica desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT (SELECT MAX(Temperatura) FROM metrica) AS tempMax, (SELECT MAX(Umidade) FROM metrica) AS umiMax,
        temperatura, umidade, horario, DATE_FORMAT(Horario,'%H:%i:%s') AS horario_grafico 
        from metrica where fkArmazem = ${idArmazem}
        order by idMetrica desc limit ${limite_linhas}
        `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idArmazem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        temperatura as temperatura, 
        umidade as umidade,  
                        CONVERT(varchar, horario, 108) as horario_grafico, 
                        fkArmazem 
                        from metrica where fkArmazem = ${idArmazem} 
                    order by idMetrica desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT (SELECT MAX(Temperatura) FROM metrica) AS tempMax, (SELECT MAX(Umidade) FROM metrica) AS umiMax,
        temperatura, umidade, horario, DATE_FORMAT(Horario,'%H:%i:%s') AS horario_grafico 
        from metrica where fkArmazem = ${idArmazem}
        ORDER BY idMetrica DESC LIMIT 1`

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function selectSacas(idArmazem) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT nome, SUM(sacas) Sacas FROM Armazem
        JOIN SementeArmazenada ON  fkArmazem = idArmazem
        JOIN Semente ON fkSemente = idSemente
        WHERE fkArmazem = ${idArmazem}
        GROUP BY nome;`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT nome, SUM(sacas) sacas FROM Armazem
        JOIN SementeArmazenada ON  fkArmazem = idArmazem
        JOIN Semente ON fkSemente = idSemente
        WHERE fkArmazem = ${idArmazem}
        GROUP BY nome;
        `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    selectSacas
}