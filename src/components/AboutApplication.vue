<template>
  <div class="about-application">
    <h1>About This Application</h1>
    <p>
      This is a task management application designed to help you organize and
      track your tasks efficiently.
    </p>
    <h2>Detailed Features:</h2>
    <ol>
      <li>
        <strong>Task List View</strong>
        <ul>
          <li>Display a list of tasks</li>
          <li>
            Each task should have:
            <ul>
              <li>Title</li>
              <li>Description</li>
              <li>Priority (Low/Medium/High)</li>
              <li>Status (Not Started/In Progress/Completed)</li>
              <li>Created Date</li>
            </ul>
          </li>
          <li>Ability to filter tasks by status and priority</li>
          <li>Ability to sort tasks by different criteria</li>
        </ul>
      </li>
      <li>
        <strong>Task Creation Modal</strong>
        <ul>
          <li>Form to add new tasks</li>
          <li>Validation for required fields</li>
          <li>Dropdown for priority and status</li>
          <li>Cancel and Save buttons</li>
        </ul>
      </li>
      <li>
        <strong>Task Edit Functionality (Optional)</strong>
        <ul>
          <li>Edit existing tasks</li>
          <li>Inline editing or modal-based editing</li>
          <li>Ability to change task status and priority</li>
        </ul>
      </li>
      <li>
        <strong>Local Storage Persistence</strong>
        <ul>
          <li>Save tasks to browser's local storage</li>
          <li>Load tasks from local storage on app initialization</li>
        </ul>
      </li>
    </ol>
    <h2>Tech Stack:</h2>
    <ul class="feature-list">
      <li>Vue 3 Composition API</li>
      <li>Pinia State Management</li>
      <li>Local Storage Persistence</li>
      <li>Responsive Design</li>
      <li>Priority & Status Filters</li>
      <li>Drag & Drop Ready</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutApplication",
});
</script>

<style scoped>
.about-application {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
}

p {
  color: #555;
}
</style>
