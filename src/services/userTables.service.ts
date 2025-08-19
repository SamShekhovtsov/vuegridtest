import { getUserTablesFromApi, type UserTable } from '@/api/userTable'

export function useUserTablesService() {
  async function getAll(configId: number): Promise<UserTable> {
    return await getUserTablesFromApi(configId)
  }

  return {
    getAll,
  }
}
