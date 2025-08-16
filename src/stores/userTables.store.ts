import { defineStore } from 'pinia'
import { useUserTablesService } from '@/services/userTables.service'
import { ref } from 'vue'
import type { UserTable } from '@/api/userTable'

export const useUserTablesStore = defineStore('userTables', () => {
  const userTablesService = useUserTablesService()

  const userTables = ref<UserTable[]>([])

  async function fetchUserTables() {
    userTables.value = await userTablesService.getAll()
  }

  return {
    userTables,
    fetchUserTables,
  }
})
