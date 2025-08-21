import { ref } from 'vue'

export interface UserTableRecord {
  [key: string]: string | number | boolean
}

export interface UserTable {
  columns: string[]
  total: number
  page: number
  page_size: number
  results: UserTableRecord[]
}

export interface CreateUserTableRecord {
  name: string
  src_table: string // = 'entities' - default source table
  rows: string[]
  datapoints: string[]
  columns: UserTableColumnDefinition[]
  sharedWith: string // "@team"
}

export interface CreateUserTableRecordResponse {
  config_id: number
  name: string
  debug_internal_table: string
}

export interface UserTableColumnDefinition {
  name: string
  type: string
}

export async function getUserTablesFromApi(
  configId: number,
  globalSearchQuery: string = '',
  page: number = 1,
): Promise<UserTable> {
  const data = ref<UserTable>()

  let requestUrl =
    import.meta.env.VITE_API_BASE_URL +
    '/dtables/fetch?config_id=' +
    configId +
    '&page=' +
    page.toString() +
    '&page_size=5'
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

export async function createUserTableRecord(
  record: CreateUserTableRecord,
): Promise<CreateUserTableRecordResponse> {
  const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/dtables/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const jsonData = await response.json()
  return jsonData as CreateUserTableRecordResponse
}
