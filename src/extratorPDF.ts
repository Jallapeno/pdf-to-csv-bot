import fs from 'fs'
import pdf from 'pdf-parse'

async function extrairDadosDoPDF (caminhoDoPDF: string): Promise<string> {
  const data = await fs.promises.readFile(caminhoDoPDF)
  const options = {}
  const conteudoDoPDF = await pdf(data, options)
  return conteudoDoPDF.text
}

export default extrairDadosDoPDF
