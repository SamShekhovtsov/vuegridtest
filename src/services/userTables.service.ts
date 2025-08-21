import {
  createUserTableRecord,
  getUserTablesFromApi,
  type CreateUserTableRecord,
  type CreateUserTableRecordResponse,
  type UserTable,
} from '@/api/userTable'

export function useUserTablesService() {
  async function getAll(
    configId: number,
    globalSearchQuery: string = '',
    page: number,
  ): Promise<UserTable> {
    return await getUserTablesFromApi(configId, globalSearchQuery, page)
  }

  async function create(record: CreateUserTableRecord): Promise<CreateUserTableRecordResponse> {
    return await createUserTableRecord(record)
  }

  return {
    getAll,
    create,
  }
}
