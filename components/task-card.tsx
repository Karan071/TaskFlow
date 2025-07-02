import React from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/types/task";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard = React.memo(function TaskCard({
  task,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const { isDragging, handleDragStart, handleDragEnd } = useDragAndDrop({
    onDrop: (itemId, targetId) => {},
  });

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      onDragEnd={handleDragEnd}
      className={`bg-white rounded-2xl border p-4 cursor-move hover:shadow-md transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-end mb-2">
        <span
          className={`text-xs px-1.5 rounded-full border ${getPriorityColor()}`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        {task.dueDate && (
          <span className="text-xs bg-blue-50 text-[#465CDA] px-2 rounded-full">
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>
      <div className="flex items-start justify-between mb-2 ml-1">
        <div className="flex gap-1 items-center">
          <h3 className="font-medium text-gray-900 flex-1 pr-2">
            {task.title}
          </h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 ml-1">
          {task.description}
        </p>
      )}
    </div>
  );
});

export default TaskCard;
