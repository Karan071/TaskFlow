export type TaskStatus = "todo" | "inprogress" | "done" | `custom-${string}`;
export type Priority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  dueDate?: string
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: Omit<Task, "id"> }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "MOVE_TASK"; payload: { taskId: string; status: TaskStatus } }
  | { type: "LOAD_TASKS"; payload: Task[] }
