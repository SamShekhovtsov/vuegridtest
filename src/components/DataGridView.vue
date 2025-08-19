<template>
  <div>
    <h2>Access custom table {{ tableConfigsStore.tableConfigs.length }}</h2>
    <select
      v-if="tableConfigsStore.tableConfigs.length"
      v-model="selectedConfig"
      @change="fetchUserTable"
    >
      <option v-for="(item, index) in tableConfigsStore.tableConfigs" :key="index" :value="item.id">
        {{ item.name }}
      </option>
    </select>
    <p v-else>Loading data...</p>
    <h2>Entities</h2>
    <table
      v-if="userTablesStore.userTable"
      border="1"
      width="100%"
      height="100%"
      class="styled-table"
    >
      <thead>
        <tr>
          <th v-for="item in userTablesStore.userTable.columns" :key="item">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(rowRecord, recordIndex) in userTablesStore.userTable.results"
          :key="recordIndex"
        >
          <td
            v-for="(itemColumnName, columnIndex) in userTablesStore.userTable.columns"
            :key="columnIndex"
          >
            {{ rowRecord[itemColumnName] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Select a config first...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr th {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}
</style>

<script setup lang="ts">
import { useTableConfigsStore } from '@/stores/tableConfig.store'
import { useUserTablesStore } from '@/stores/userTables.store'
import { onMounted, ref } from 'vue'

const userTablesStore = useUserTablesStore()
const tableConfigsStore = useTableConfigsStore()

const selectedConfig = ref<string | null>(null)
const error = ref<string>('')

async function fetchUserTable() {
  if (selectedConfig.value) {
    try {
      await userTablesStore.fetchUserTable(Number(selectedConfig.value))
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = 'Failed to fetch user tables: ' + err.message
      } else if (typeof err === 'string') {
        error.value = 'Failed to fetch user tables: ' + err
      } else {
        error.value = 'Failed to fetch user tables: unknown error'
      }
      console.error('Failed to fetch user tables: ', err)
    }
  } else {
    error.value = 'Please select a custom table to fetch data.'
  }
}

onMounted(() => {
  try {
    tableConfigsStore.fetchTableConfigs()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = 'Failed to fetch data: ' + err.message
    } else if (typeof err === 'string') {
      error.value = 'Failed to fetch data: ' + err
    } else {
      error.value = 'Failed to fetch data: unknown error'
    }

    console.error('Failed to fetch data: ', err)
  }
})
</script>
