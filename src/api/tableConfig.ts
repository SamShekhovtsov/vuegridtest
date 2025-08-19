import { ref } from 'vue'

export interface TableConfig {
  id: string
  user_id: number
  name: number
  internal_number: number
  created_at: Date
}

export async function getTablesConfigsFromApi(): Promise<TableConfig[]> {
  const data = ref<TableConfig[]>([])

  const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/dtables/list')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const jsonData = await response.json()
  data.value = jsonData as TableConfig[]

  return data.value
}
