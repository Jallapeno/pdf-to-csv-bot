const fs = require('fs');
const pdf = require('pdf-parse');

async function extrairDadosDoPDF(caminhoDoPDF) {
    const data = await fs.promises.readFile(caminhoDoPDF);
    const options = {}; // Opções para a extração (se necessário)
    const conteudoDoPDF = await pdf(data, options);
    return conteudoDoPDF.text.split('\n').filter(Boolean); // Divide o texto em linhas e remove linhas vazias
}

module.exports = extrairDadosDoPDF;
