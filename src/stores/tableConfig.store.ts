import { defineStore } from 'pinia'
import { useTableConfigsService } from '@/services/tableConfigs.service'
import { ref } from 'vue'
import type { TableConfig } from '@/api/tableConfig'

export const useTableConfigsStore = defineStore('tableConfigs', () => {
  const tableConfigsService = useTableConfigsService()

  const tableConfigs = ref<TableConfig[]>([])

  async function fetchTableConfigs() {
    tableConfigs.value = await tableConfigsService.getAll()
  }

  return {
    tableConfigs,
    fetchTableConfigs,
  }
})
