<script setup lang="ts">
import { useTaskStore } from "@/stores/taskStore";
import IconCalendar from "./icons/IconCalendar.vue";

const taskStore = useTaskStore();
</script>

<template>
  <div class="controls">
    <div class="filters">
      <label>
        Status:
        <select v-model="taskStore.filterStatus">
          <option>All</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </label>

      <label>
        Priority:
        <select v-model="taskStore.filterPriority">
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </label>
    </div>
    <div class="sorting">
      <button
        @click="taskStore.setSort('createdDate')"
        :class="{ active: taskStore.sortBy === 'createdDate' }"
      >
        <div style="align-items: center; display: flex; gap: 0.5rem">
          <IconCalendar style="width: 24px" />
          <span> Sort by Date </span>
        </div>
      </button>
      <button
        @click="taskStore.setSort('priority')"
        :class="{ active: taskStore.sortBy === 'priority' }"
      >
        Sort by Priority
      </button>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

select {
  padding: 0.25rem;
  border-radius: 4px;
}

.sorting {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background: white;
}

button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

@media (max-width: 600px) {
  .filters {
    flex-direction: column;
  }
}
</style>
