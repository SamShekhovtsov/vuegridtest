import { defineStore } from 'pinia'
import { useUserTablesService } from '@/services/userTables.service'
import { ref } from 'vue'
import type { UserTable } from '@/api/userTable'

export const useUserTablesStore = defineStore('userTables', () => {
  const userTablesService = useUserTablesService()

  const userTable = ref<UserTable>()

  async function fetchUserTable(configId: number) {
    userTable.value = await userTablesService.getAll(configId)
  }

  return {
    userTable,
    fetchUserTable,
  }
})
