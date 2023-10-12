import fs from 'fs'
import { parse } from 'csv-parse'

async function lerCSV (caminhoDoCSV: string): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const registros: string[][] = []

    fs.createReadStream(caminhoDoCSV)
      .pipe(parse({ delimiter: ',' }))
      .on('data', (row) => {
        registros.push(row)
      })
      .on('end', () => {
        resolve(registros)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

export default lerCSV
