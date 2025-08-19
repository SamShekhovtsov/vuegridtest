import { ref } from 'vue'

export interface UserTableRecord {
  [key: string]: string | number | boolean
}

export interface UserTable {
  columns: string[]
  results: UserTableRecord[]
}

export async function getUserTablesFromApi(
  configId: number,
  globalSearchQuery: string = '',
): Promise<UserTable> {
  const data = ref<UserTable>()

  let requestUrl =
    import.meta.env.VITE_API_BASE_URL +
    '/dtables/fetch?config_id=' +
    configId +
    '&page=1&page_size=25'
  if (globalSearchQuery) {
    requestUrl += '&global=' + encodeURIComponent(globalSearchQuery)
  }
  const response = await fetch(requestUrl)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const jsonData = await response.json()
  data.value = jsonData as UserTable

  return data.value
}
