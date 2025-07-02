"use client";

import React from "react";
import { useState, useEffect } from "react";
import type { Task, TaskStatus } from "@/types/task";
import TaskCard from "./task-card";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { TaskCardSkeleton, TaskColumnSkeleton } from "./skeleton";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

interface TaskColumnProps {
  title: React.ReactNode;
  status: TaskStatus;
  tasks: Task[];
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: (status: TaskStatus) => void;
  onUpdateTitle: (status: TaskStatus, newTitle: string) => void;
  onDeleteColumn: (status: TaskStatus) => void;
  viewMode: string;
}

const TaskColumn = React.memo(function TaskColumn({
  title,
  status,
  tasks,
  onMoveTask,
  onEditTask,
  onDeleteTask,
  onAddTask,
  onUpdateTitle,
  onDeleteColumn,
  viewMode,
}: TaskColumnProps) {
  const [draggedOver, setDraggedOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title as string);
  const [isLoading, setIsLoading] = useState(true);

  const { isDraggedOver, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop({
      onDrop: (itemId) => {
        onMoveTask(itemId, status);
      },
    });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveTitle = () => {
    onUpdateTitle(status, editedTitle);
    setIsEditing(false);
  };

  const getColumnColor = () => {
    switch (status) {
      case "todo":
        return "bg-gradient-to-r from-ed to-magentaPink";
      case "inprogress":
        return "bg-gradient-to-r from-hotPink to-fuchsiaPurple";
      case "done":
        return "bg-gradient-to-r from-lavenderPurple to-royalBlue";
      default:
        return "bg-gradient-to-r from-fuchsiaPurple to-lavenderPurple";
    }
  };


  const getButtonColor = () => {
    switch (status) {
      case "todo":
        return "bg-ed hover:bg-magentaPink";
      case "inprogress":
        return "bg-hotPink hover:bg-fuchsiaPurple";
      case "done":
        return "bg-lavenderPurple hover:bg-royalBlue";
      default:
        const customStatus = status as string;
        const index = parseInt(customStatus.split("-")[1]);
        const colorIndex = index % 4;
        switch (colorIndex) {
          case 0:
            return "bg-ed hover:bg-magentaPink";
          case 1:
            return "bg-hotPink hover:bg-fuchsiaPurple";
          case 2:
            return "bg-lavenderPurple hover:bg-royalBlue";
          case 3:
            return "bg-fuchsiaPurple hover:bg-lavenderPurple";
          default:
            return "bg-ed hover:bg-magentaPink";
        }
    }
  };

  if (isLoading) {
    return <TaskColumnSkeleton />;
  }

  return (
    <div
      className={`${
        viewMode === "row"
          ? "min-w-[300px] flex-shrink-0 flex-grow basis-0"
          : ""
      }`}
    >
      <div
        className={`rounded-3xl border-2 p-4 transition-colors shadow-sm ${
          viewMode === "row" ? "h-full w-[300px]" : ""
        } ${isDraggedOver ? "bg-blue-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, status)}
      >
        <div className="flex items-center justify-between mb-6 gap-10">
          <div className="flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${getColumnColor()}`}
            />
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
                className="text-sm md:text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-sm md:text-lg font-semibold">{title}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDeleteColumn(status)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          <span
            className={`bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full ${
              tasks.length === 0 ? "font-normal" : "font-semibold"
            } shadow-sm`}
          >
            {`${tasks.length} total`}
          </span>
        </div>

        <button
          className={`flex justify-center items-center w-full rounded-full mb-5 py-1.5 gap-1 ${getButtonColor()} transition-colors hover:opacity-90`}
          onClick={() => onAddTask(status)}
        >
          <Plus className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-white">Add Task</span>
        </button>

        <div
          className="space-y-4"
          style={{ minHeight: tasks.length === 0 ? "200px" : "auto" }}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-base italic">No tasks added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default TaskColumn;
