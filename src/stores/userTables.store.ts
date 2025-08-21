import { defineStore } from 'pinia'
import { useUserTablesService } from '@/services/userTables.service'
import { ref } from 'vue'
import type {
  CreateUserTableRecord,
  CreateUserTableRecordResponse,
  UserTable,
} from '@/api/userTable'

export const useUserTablesStore = defineStore('userTables', () => {
  const userTablesService = useUserTablesService()

  const userTable = ref<UserTable>()

  async function fetchUserTable(
    configId: number,
    globalSearchQuery: string = '',
    page: number = 1,
  ): Promise<void> {
    userTable.value = await userTablesService.getAll(configId, globalSearchQuery, page)
  }

  async function createUserTableRecord(
    record: CreateUserTableRecord,
  ): Promise<CreateUserTableRecordResponse> {
    return await userTablesService.create(record)
  }

  return {
    userTable,
    fetchUserTable,
    createUserTableRecord,
  }
})
