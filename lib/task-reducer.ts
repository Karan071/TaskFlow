import type { Task, TaskAction } from "@/types/task"

export interface TaskState {
  tasks: Task[]
}

export const initialState: TaskState = {
  tasks: [],
}

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      const newTask: Task = {
        ...action.payload,
        id: crypto.randomUUID(),
      }
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      }

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }

    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, status: action.payload.status } : task,
        ),
      }

    case "LOAD_TASKS":
      return {
        ...state,
        tasks: action.payload,
      }

    default:
      return state
  }
}
