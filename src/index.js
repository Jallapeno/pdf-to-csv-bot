// const extrairDadosDoPDF = require('./extratorPDF');
const fs = require('fs');

// let caminhoDoPDF = '/home/jallapeno/projects/pdf-files/pdf-teste.pdf';
// let caminhoDoPDF = '/home/jallapeno/projects/pdf-files/508550399-Nota-Fiscal-Americanas.pdf';

// extrairDadosDoPDF(caminhoDoPDF)
//     .then(dados => {
//         console.log(dados);
//     })
//     .catch(error => {
//         console.error('Ocorreu um erro:', error);
//     });


function obterNomesDosArquivos(caminhoDaPasta) {
    return new Promise((resolve, reject) => {
        fs.readdir(caminhoDaPasta, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const arquivosPDF = files.filter(file => file.endsWith('.pdf'));
                resolve(arquivosPDF);
            }
        });
    });
}

const caminhoDaPasta = '/home/jallapeno/projects/pdf-files/';

obterNomesDosArquivos(caminhoDaPasta)
    .then(nomesDosArquivos => {
        console.log('Nomes dos arquivos PDF:', nomesDosArquivos);
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
