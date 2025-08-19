<template>
  <div>
    <h2>Fetched Data:</h2>
    <table
      v-if="userTablesStore.userTables.length"
      border="1"
      width="100%"
      height="100%"
      class="styled-table"
    >
      <thead>
        <th>UserId</th>
        <th>Name</th>
      </thead>
      <tbody>
        <tr v-for="item in userTablesStore.userTables" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Loading data...</p>
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

.styled-table thead th {
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
import { useUserTablesStore } from '@/stores/userTables.store'
import { onMounted, ref } from 'vue'

const userTablesStore = useUserTablesStore()

const error = ref<string>('')

onMounted(() => {
  try {
    userTablesStore.fetchUserTables()
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
