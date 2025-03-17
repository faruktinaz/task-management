<script setup lang="ts">
import type { Task } from "@/stores/taskStore";
import { ref, watch } from "vue";

const props = defineProps<{
  show: boolean;
  taskToEdit?: Task | null;
}>();

const emit = defineEmits(["update:show", "save"]);

const form = ref({
  id: "",
  title: "",
  description: "",
  priority: "Medium" as "Low" | "Medium" | "High",
  status: "Not Started" as "Not Started" | "In Progress" | "Completed",
});

watch(
  () => props.taskToEdit,
  (task) => {
    if (task) {
      form.value = { ...task };
    } else {
      resetForm();
    }
  }
);

function resetForm() {
  form.value = {
    id: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Not Started",
  };
}

function handleSave() {
  if (!form.value.title.trim()) return alert("Title is required");
  emit("save", { ...form.value });
  emit("update:show", false);
  resetForm();
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>{{ form.id ? "Edit Task" : "New Task" }}</h2>
      <form @submit.prevent="handleSave">
        <div>
          <h3>Title*</h3>
          <input v-model="form.title" required class="text-input" />
        </div>

        <div>
          <h3>Description</h3>
          <textarea
            v-model="form.description"
            class="text-input"
            style="resize: vertical"
          />
        </div>
        <label>
          Priority
          <select v-model="form.priority">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label>
          Status
          <select v-model="form.status">
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>

        <div class="actions">
          <button type="button" @click="$emit('update:show', false)">
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
}

.text-input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  width: 100%;
  max-width: 300px;
}

form {
  display: grid;
  gap: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
