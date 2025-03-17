<script setup lang="ts">
import { useTaskStore, type Task } from "@/stores/taskStore";
import TaskList from "../components/TaskList.vue";
import TaskFormModal from "../components/TaskFormModal.vue";
import TaskControl from "../components/TaskControl.vue";
import { ref } from "vue";
import AboutApplication from "@/components/AboutApplication.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconAbout from "@/components/icons/IconAbout.vue";

const taskStore = useTaskStore();
const showModal = ref(false);
const showAbout = ref(false);
const editingTask = ref<Task | null>(null);

function handleEdit(task: Task) {
  editingTask.value = task;
  showModal.value = true;
}

function handleSave(taskData: Task) {
  if (taskData.id) {
    taskStore.updateTask(taskData);
  } else {
    taskStore.addTask(taskData);
  }
}
</script>

<template>
  <main class="container">
    <div class="header">
      <h1>Task Manager</h1>
      <div>
        <button
          v-if="!showAbout"
          @click="showModal = true"
          class="new-task-button"
        >
          <div style="align-items: center; display: flex; gap: 0.5rem">
            <IconPlus style="width: 20px" />
            <span> New Task </span>
          </div>
        </button>
        <button @click="showAbout = !showAbout" style="margin-left: 8px">
          <div style="align-items: center; display: flex; gap: 0.5rem">
            <IconAbout v-if="!showAbout" style="width: 20px" />
            {{ showAbout ? "Back to Tasks" : "About" }}
          </div>
        </button>
      </div>
    </div>
    <div v-if="!showAbout">
      <TaskControl />
      <TaskList :tasks="taskStore.filteredSortedTasks" @edit="handleEdit" />
      <TaskFormModal
        v-model:show="showModal"
        :task-to-edit="editingTask"
        @save="handleSave"
      />
    </div>
    <div v-else>
      <AboutApplication />
    </div>
  </main>
</template>

<style scoped>
.new-task-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
  }
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
