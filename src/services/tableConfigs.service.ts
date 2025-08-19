import { getTablesConfigsFromApi, type TableConfig } from '@/api/tableConfig'

export function useTableConfigsService() {
  async function getAll(): Promise<TableConfig[]> {
    return await getTablesConfigsFromApi()
  }

  return {
    getAll,
  }
}
