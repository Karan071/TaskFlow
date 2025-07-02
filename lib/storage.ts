import type { Task } from "@/types/task"

const STORAGE_KEY = "taskflow-tasks"
const COLUMN_TITLES_KEY = "taskflow-column-titles"

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error)
  }
}

export function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      //if no tasks exist : add sample 
      const sampleTask1: Task = {
        id: "sample-task-1",
        title: "Sample Task",
        description: "This is a sample task. You can edit or delete it.",
        priority: "medium",
        status: "todo",
        dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      }
      const sampleTask2: Task = {
        id: "sample-task-2",
        title: "Sample Task 2",
        description: "This is another sample task. You can edit or delete it.",
        priority: "high",
        status: "todo",
        dueDate: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow
      }
      saveTasks([sampleTask1, sampleTask2])
      return [sampleTask1, sampleTask2]
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error)
    return []
  }
}

export function clearTasks(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Failed to clear tasks from localStorage:", error)
  }
}

export function saveColumnTitles(titles: Record<string, string>): void {
  try {
    localStorage.setItem(COLUMN_TITLES_KEY, JSON.stringify(titles))
  } catch (error) {
    console.error("Failed to save column titles:", error)
  }
}

export function loadColumnTitles(): Record<string, string> {
  try {
    const stored = localStorage.getItem(COLUMN_TITLES_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error("Failed to load column titles:", error)
    return {}
  }
}
