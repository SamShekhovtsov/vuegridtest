import { getUserTablesFromApi, type UserTable } from '@/api/userTable'

export function useUserTablesService() {
  async function getAll(): Promise<UserTable[]> {
    return await getUserTablesFromApi()
  }

  return {
    getAll,
  }
}
