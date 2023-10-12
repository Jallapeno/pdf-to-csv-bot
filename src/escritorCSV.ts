import { createObjectCsvWriter } from 'csv-writer'

interface RegistroCSV {
  campo1: string
  campo2: string
  // Adicione mais campos conforme necessário
}

async function escreverCSV (caminhoDoCSV: string, dados: RegistroCSV[]): Promise<void> {
  const csvWriter = createObjectCsvWriter({
    path: caminhoDoCSV,
    header: [
      { id: 'campo1', title: 'Campo 1' },
      { id: 'campo2', title: 'Campo 2' }
      // Adicione mais campos conforme necessário
    ]
  })

  return csvWriter.writeRecords(dados)
}

export default escreverCSV
