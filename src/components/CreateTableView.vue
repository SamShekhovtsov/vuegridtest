<template>
  <h2>Table Builder</h2>
  <div>
    <form @submit.prevent="createTable">
      <label for="tableName">Table Name:</label>
      <input type="text" id="tableName" v-model="createTableRecord.name" />

      <label for="columns">Columns (comma-separated):</label>
      <input type="text" id="columns" v-model="createTableRecord.columns" />

      <label for="columns">Rows (comma-separated):</label>
      <input type="text" id="rows" v-model="createTableRecord.rows" />

      <label for="columns">Datapoints (comma-separated):</label>
      <input type="text" id="datapoints" v-model="createTableRecord.datapoints" />

      <label for="sharedWith">Shared With:</label>
      <input type="text" id="sharedWith" v-model="createTableRecord.sharedWith" />

      <label for="srcTable">Source Table:</label>
      <input type="text" id="srcTable" v-model="createTableRecord.src_table" />
    </form>
    <p>Click the button below to create a new table with the specified configuration.</p>
    <input type="submit" value="Create table" />
  </div>
</template>
<style scoped></style>
<script setup lang="ts">
import type { CreateUserTableRecord } from '@/api/userTable'
import { useUserTablesStore } from '@/stores/userTables.store'
import { ref } from 'vue'

const createTableRecord = ref<CreateUserTableRecord>({
  name: 'New Table',
  columns: [
    { name: 'Column1', type: 'string' },
    { name: 'Column2', type: 'number' },
  ],
  rows: [],
  datapoints: [],
  sharedWith: '@team',
  src_table: 'entities',
} as CreateUserTableRecord)

const userTablesStore = useUserTablesStore()

async function createTable() {
  try {
    //TODO: get datas from the form
    await userTablesStore.createUserTableRecord(createTableRecord.value)
  } catch (error) {
    console.error('Error creating table:', error)
  }
}
</script>
