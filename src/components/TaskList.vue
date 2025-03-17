<script setup lang="ts">
import { useTaskStore, type Task } from "../stores/taskStore";
import IconDelete from "./icons/IconDelete.vue";
import IconEdit from "./icons/IconEdit.vue";
const taskStore = useTaskStore();

function confirmDelete(taskId: string) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskStore.deleteTask(taskId);
  }
}
defineProps<{
  tasks: Task[];
}>();
</script>

<template>
  <div v-if="tasks.length" class="task-list">
    <div v-for="task in tasks" :key="task.id" class="task-card">
      <div style="justify-content: space-between; display: flex">
        <h3>{{ task.title }}</h3>
        <div class="actions">
          <button @click="$emit('edit', task)">
            <IconEdit style="width: 1.2rem" />
          </button>
          <button @click="confirmDelete(task.id)">
            <IconDelete style="width: 1.2rem; color: red" />
          </button>
        </div>
      </div>

      <p>{{ task.description }}</p>
      <div class="meta">
        <span :class="['priority', task.priority.toLowerCase()]">
          {{ task.priority }}
        </span>
        <span class="status">{{ task.status }}</span>
        <span class="date">{{ task.createdDate.toLocaleString() }}</span>
      </div>
    </div>
  </div>
  <div v-else class="empty-state">
    No tasks found matching the current filters.
  </div>
</template>

<style scoped>
.task-list {
  display: grid;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}
.actions {
  display: flex;
  gap: 0.5rem;
}

.task-card {
  background: rgba(236, 236, 236, 0.377);
  padding: 1rem;
  border-radius: 8px;
  max-width: 800px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-card p {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin: 0.5rem 0;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .task-card {
    padding: 0.75rem;
    max-width: 300px;
  }

  .task-card p {
    font-size: 0.9em;
  }

  .meta {
    flex-direction: column;
    gap: 0.3rem;
    align-items: flex-start;
  }
}
.priority {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

.priority.low {
  background: #c8e6c9;
}
.priority.medium {
  background: #fff3cd;
}
.priority.high {
  background: #f8d7da;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.9em;
}

@media (max-width: 600px) {
  .task-card {
    padding: 0.75rem;
  }

  .meta {
    gap: 0.5rem;
  }
}
</style>
