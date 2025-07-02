"use client";
import { useState, useEffect, useReducer, useCallback } from "react";
import {
  Search,
  Grid,
  List,
  Rows,
  CheckCircle,
  ArrowDownZA,
  BadgePlus,
  X,
  Loader2,
  AlignRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskColumn from "./task-column";
import TaskModal from "./task-modal";
import type { Task, TaskStatus, Priority } from "@/types/task";
import { taskReducer, initialState } from "@/lib/task-reducer";
import {
  loadTasks,
  saveTasks,
  loadColumnTitles,
  saveColumnTitles,
} from "@/lib/storage";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { motion } from "framer-motion";
import RightPanel from "@/components/right-panel";

export default function TaskBoard() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "row">("grid");
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const DEFAULT_COLUMN_TITLES = {
    todo: "ToDo",
    inprogress: "In Progress",
    done: "Done",
  };

  const [columnTitles, setColumnTitles] = useState<Record<string, string>>(DEFAULT_COLUMN_TITLES);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  useEffect(() => {
    const savedTasks = loadTasks();
    if (savedTasks.length > 0) {
      dispatch({ type: "LOAD_TASKS", payload: savedTasks });
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    saveTasks(state.tasks);
    setTasks(state.tasks);
  }, [state.tasks]);

  useEffect(() => {
    const savedTitles = loadColumnTitles();
    if (Object.keys(savedTitles).length > 0) {
      setColumnTitles(savedTitles);
    } else {
      saveColumnTitles(DEFAULT_COLUMN_TITLES);
      setColumnTitles(DEFAULT_COLUMN_TITLES);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); 
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const filteredTasks = state.tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getTasksByStatus = (status: TaskStatus) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const handleCreateTask = useCallback((taskData: Omit<Task, "id">) => {
    dispatch({ type: "ADD_TASK", payload: taskData });
    setIsModalOpen(false);
  }, [dispatch]);

  const handleUpdateTask = useCallback((taskData: Omit<Task, "id">) => {
    if (editingTask) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...taskData, id: editingTask.id },
      });
      setEditingTask(null);
      setIsModalOpen(false);
    }
  }, [dispatch, editingTask]);

  const handleDeleteTask = useCallback((taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  }, [dispatch]);

  const handleMoveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
    dispatch({ type: "MOVE_TASK", payload: { taskId, status: newStatus } });
  }, [dispatch]);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleAddTask = useCallback((status: TaskStatus) => {
    let defaultPriority: Priority = "medium";
    if (status === "todo") defaultPriority = "high";
    else if (status === "inprogress") defaultPriority = "medium";
    else if (status === "done") defaultPriority = "low";
    else defaultPriority = "medium";
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleUpdateColumnTitle = useCallback((status: TaskStatus, newTitle: string) => {
    const updatedTitles = { ...columnTitles, [status]: newTitle };
    setColumnTitles(updatedTitles);
    saveColumnTitles(updatedTitles);
  }, [columnTitles]);

  const handleAddNewColumn = useCallback(() => {
    const newStatus = `custom-${Date.now()}` as TaskStatus;
    const updatedTitles = { ...columnTitles, [newStatus]: "New Column" };
    setColumnTitles(updatedTitles);
    saveColumnTitles(updatedTitles);
  }, [columnTitles]);

  const handleDeleteColumn = useCallback((status: TaskStatus) => {
    const updatedTitles = { ...columnTitles };
    delete updatedTitles[status];
    setColumnTitles(updatedTitles);
    saveColumnTitles(updatedTitles);

    const updatedTasks = state.tasks.filter((task) => task.status !== status);
    dispatch({ type: "LOAD_TASKS", payload: updatedTasks });
    saveTasks(updatedTasks);
  }, [columnTitles, state.tasks, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-royalBlue" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className={`p-4 sm:p-6 min-h-screen bg-gradient-to-br from-blue-50/20 via-white to-green-50/20 transition-all duration-200 ${
        !isMobileOrTablet && isRightPanelOpen ? "mr-64" : "mr-0"
      }`}>
        <div className="mb-6 sm:mb-10 flex flex-col gap-4">
          <div className="border w-full p-2 rounded-xl border-neutral-200 shadow-sm bg-white/90 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-800 tracking-tight">
                  TaskFlow
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleAddNewColumn}
                  className="text-[#465CDA] hover:text-[#3a4cb5] transition-colors"
                >
                  <BadgePlus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                  className="text-[#465CDA] hover:text-[#3a4cb5] transition-colors"
                >
                  <AlignRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border w-full p-3 rounded-xl border-neutral-200 shadow-sm bg-white/90 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold font-playfair bg-gradient-to-r from-royalBlue to-indigo-500 bg-clip-text text-transparent leading-tighter">
                  Work Dashboard
                </h2>
                <p className="text-neutral-500 text-sm sm:text-sm italics tracking-tighter ">
                Organize tasks your way with a drag-and-drop Kanban board
                </p>
              </div>
            </div>

            <div className="mt-10 mb-5 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
              <Tabs
                value={viewMode}
                onValueChange={(value) =>
                  setViewMode(value as "grid" | "list" | "row")
                }
                className="w-full sm:w-auto"
              >
                <TabsList className="flex flex-wrap sm:flex-nowrap justify-start bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg p-0 shadow-sm overflow-x-auto">
                  {[
                    { value: "grid", icon: Grid, label: "Grid" },
                    { value: "list", icon: List, label: "List" },
                    { value: "row", icon: Rows, label: "Row" },
                  ].map(({ value, icon: Icon, label }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="flex items-center px-3 py-2 sm:px-4 sm:py-1 rounded-md gap-2 hover:bg-gray-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 whitespace-nowrap"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex justify-center items-center">{label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 py-2 rounded-lg border-gray-200 shadow-sm focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  {searchQuery && !(searchQuery !== debouncedSearchQuery) && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  {searchQuery !== debouncedSearchQuery && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    </div>
                  )}
                </div>
                <Select
                  value={priorityFilter}
                  onValueChange={(value: Priority | "all") =>
                    setPriorityFilter(value)
                  }
                >
                  <SelectTrigger className="w-full sm:w-40 rounded-lg border-gray-200 bg-white shadow-sm">
                    <ArrowDownZA className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div
              className={`transition-all ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : viewMode === "list"
                  ? "flex flex-col gap-4"
                  : "flex flex-row gap-4 overflow-x-auto pb-4 sm:pb-6 -mx-2 sm:-mx-0 px-2 sm:px-0"
              }`}
            >
              {Object.entries(columnTitles).map(([status, title]) => (
                <TaskColumn
                  key={status}
                  title={title}
                  status={status as TaskStatus}
                  tasks={getTasksByStatus(status as TaskStatus)}
                  onMoveTask={handleMoveTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onAddTask={handleAddTask}
                  onUpdateTitle={handleUpdateColumnTitle}
                  onDeleteColumn={handleDeleteColumn}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
          {/* // popup panel here */}
          <TaskModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            task={editingTask}
            columnTitles={columnTitles}
          />
        </div>
      </div>
      {/* // right panel */}
      <RightPanel 
        isOpen={isRightPanelOpen} 
        onToggle={(isOpen) => setIsRightPanelOpen(isOpen)} 
        tasks={tasks}
      />
    </>
  );
}
