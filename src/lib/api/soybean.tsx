import { ColumnDef } from '@tanstack/react-table';


async function getSoybeanGeneData(
  chrom: number=7, pos_start: number=6711586, pos_end: number=6713607
): Promise<{
  columns: ColumnDef<Object>[],
  data: any,
  total: number,
}> {

  try {
    const response = await fetch('http://127.0.0.1:5000/get_gene_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chrom: chrom,
        pos_start: pos_start,
        pos_end: pos_end,
      })
    })

    const data = await response.json()
    const total = data['gene_info']['total']
    const gene_list = data['gene_info']['gene_list']
    const tmp_columns = data['gene_info']['columns']

    const columns = []
    for (let i = 0; i < tmp_columns.length; i++) {
      columns.push({
        accessorKey: tmp_columns[i],
        header: tmp_columns[i],
      })
    }

    return {
      columns: columns,
      data: gene_list,
      total: total,
    }
  } catch (error) {
    console.log(error)
    return {
      columns: [],
      data: {},
      total: 0,
    }
  }
}


export { getSoybeanGeneData }
