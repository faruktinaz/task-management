import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Not Started" | "In Progress" | "Completed";
  createdDate: Date;
}

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>(loadTasksFromStorage());

  const filterStatus = ref<"All" | Task["status"]>("All");
  const filterPriority = ref<"All" | Task["priority"]>("All");
  const sortBy = ref<"createdDate" | "priority">("createdDate");

  const filteredSortedTasks = computed(() => {
    let result = [...tasks.value];

    if (filterStatus.value !== "All") {
      result = result.filter((task) => task.status === filterStatus.value);
    }
    if (filterPriority.value !== "All") {
      result = result.filter((task) => task.priority === filterPriority.value);
    }

    if (sortBy.value === "createdDate") {
      result.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
    } else {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      result.sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    }

    return result;
  });

  function loadTasksFromStorage(): Task[] {
    const saved = localStorage.getItem("tasks");
    if (!saved) return [];

    const parsed = JSON.parse(saved) as Task[];

    return parsed.map((task) => ({
      ...task,
      createdDate: new Date(task.createdDate),
    }));
  }

  function setFilters(
    status: typeof filterStatus.value,
    priority: typeof filterPriority.value
  ) {
    filterStatus.value = status;
    filterPriority.value = priority;
  }

  function setSort(sortKey: typeof sortBy.value) {
    sortBy.value = sortKey;
  }

  function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }

  function addTask(newTask: Omit<Task, "id" | "createdDate">) {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      createdDate: new Date(),
    };
    tasks.value.push(task);
    saveTasksToStorage();
  }

  function deleteTask(taskId: string) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    saveTasksToStorage();
  }

  function updateTask(updatedTask: Task) {
    const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = {
        ...updatedTask,
        createdDate: tasks.value[index].createdDate,
      };
      saveTasksToStorage();
    }
  }

  return {
    tasks,
    addTask,
    saveTasksToStorage,
    filteredSortedTasks,
    filterStatus,
    filterPriority,
    sortBy,
    setFilters,
    setSort,
    deleteTask,
    updateTask,
  };
});
