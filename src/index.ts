import express, { type Request, type Response } from 'express'
import multer from 'multer'
import extrairDadosDoPDF from './extratorPDF'
import escreverCSV from './escritorCSV'
import lerCSV from './leitorCSV'

const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage }).single('pdfFile')

app.post('/upload', function (req: Request, res: Response) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    const caminhoDoPDF = req.file.path

    let registrosCSV: string[][] = []

    if (fs.existsSync(caminhoDoCSV)) {
      lerCSV(caminhoDoCSV)
        .then(async planilhaExistente => {
          registrosCSV = planilhaExistente
          return extrairDadosDoPDF(caminhoDoPDF)
        })
        .then(async dados => {
          registrosCSV = registrosCSV.concat(dados.split('\n').map(row => row.split(',')))
          return escreverCSV(caminhoDoCSV, registrosCSV)
        })
        .then(() => {
          return res.status(200).send('Dados adicionados com sucesso à planilha CSV!')
        })
        .catch(error => {
          console.error('Ocorreu um erro:', error)
          return res.status(500).json(error)
        })
    } else {
      extrairDadosDoPDF(caminhoDoPDF)
        .then(async dados => {
          registrosCSV = dados.split('\n').map(row => row.split(','))
          return escreverCSV(caminhoDoCSV, registrosCSV)
        })
        .then(() => {
          return res.status(200).send('Novo arquivo CSV criado e dados adicionados com sucesso!')
        })
        .catch(error => {
          console.error('Ocorreu um erro:', error)
          return res.status(500).json(error)
        })
    }
  })
})

app.listen(3000, function () {
  console.log('Servidor rodando na porta 3000')
})
