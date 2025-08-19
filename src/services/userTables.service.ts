import { getUserTablesFromApi, type UserTable } from '@/api/userTable'

export function useUserTablesService() {
  async function getAll(
    configId: number,
    globalSearchQuery: string = '',
    page: number,
  ): Promise<UserTable> {
    return await getUserTablesFromApi(configId, globalSearchQuery, page)
  }

  return {
    getAll,
  }
}
