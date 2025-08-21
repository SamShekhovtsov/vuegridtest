import CreateTableView from '@/components/CreateTableView.vue'
import DataGridView from '@/components/DataGridView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      components: {
        default: DataGridView,
      },
    },
    {
      path: '/create',
      components: {
        default: CreateTableView,
      },
    },
  ],
})

export default router
