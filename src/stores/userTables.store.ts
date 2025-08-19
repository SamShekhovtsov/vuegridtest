import { defineStore } from 'pinia'
import { useUserTablesService } from '@/services/userTables.service'
import { ref } from 'vue'
import type { UserTable } from '@/api/userTable'

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

  return {
    userTable,
    fetchUserTable,
  }
})
