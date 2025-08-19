import { ref } from 'vue'

export interface UserTableRecord {
  [key: string]: string | number | boolean
}

export interface UserTable {
  columns: string[]
  results: UserTableRecord[]
}

export async function getUserTablesFromApi(configId: number): Promise<UserTable> {
  const data = ref<UserTable>()

  const response = await fetch(
    import.meta.env.VITE_API_BASE_URL +
      '/dtables/fetch?config_id=' +
      configId +
      '&page=1&page_size=25',
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const jsonData = await response.json()
  data.value = jsonData as UserTable

  return data.value
}
