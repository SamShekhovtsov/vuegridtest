<template>
  <div>
    <h2>Fetched Data:</h2>
    <ul v-if="userTablesStore.userTables.length">
      <li v-for="item in userTablesStore.userTables" :key="item.id">{{ item.name }}</li>
    </ul>
    <p v-else>Loading data...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

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
