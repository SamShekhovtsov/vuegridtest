<script setup lang="ts">
import DataGridView from './components/DataGridView.vue'
</script>

<template>
  <h1>Display Datat in Vue Grid</h1>
  <p>
    This is a simple Vue.js application that fetches data from an API and displays it in a grid
    format. The data is fetched when the component is mounted, and any errors during the fetch
    process are displayed below the grid.
  </p>
  <DataGridView />
</template>

<style scoped></style>
<style>
/* Basic styling */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
