import { ref } from 'vue'

export interface UserTable {
  id: string
  name: number
}

export async function getUserTablesFromApi(): Promise<UserTable[]> {
  const data = ref<UserTable[]>([])

  const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/dtables/list')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const jsonData = await response.json()
  data.value = jsonData as UserTable[]

  return data.value
}
