import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Task, Priority, TaskStatus } from "@/types/task";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2 } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  task?: Task | null;
  columnTitles: Record<string, string>;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task,
  columnTitles,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setStatus("todo");
      setDueDate(undefined);
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!title.trim()) throw new Error("Title is required");
      if (!description.trim()) throw new Error("Description is required");

      onSubmit({
        title,
        description,
        priority,
        status,
        dueDate: dueDate?.toISOString(),
      });
      onClose();
    } catch (error) {
      console.error("Failed to submit task:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <DialogContent className="sm:max-w-md rounded-lg shadow-lg">
              <DialogHeader className="border-b border-gray-200 pb-4">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  {task ? "Edit Task" : "Add Task"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title <span className="text-ed">*</span>
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Task title..."
                      className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description <span className="text-ed">*</span>
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Task details..."
                      rows={4}
                      className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "inertia", stiffness: 300 }}
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Priority
                      </label>
                      <Select
                        value={priority}
                        onValueChange={(value: Priority) => setPriority(value)}
                      >
                        <SelectTrigger className="w-full rounded-md border-gray-300 focus:border-royalBlue focus:ring-royalBlue">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-md shadow-lg">
                          <SelectItem value="low" className="hover:bg-gray-100">
                            Low
                          </SelectItem>
                          <SelectItem
                            value="medium"
                            className="hover:bg-gray-100"
                          >
                            Medium
                          </SelectItem>
                          <SelectItem
                            value="high"
                            className="hover:bg-gray-100"
                          >
                            High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "inertia", stiffness: 300 }}
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <Select
                        value={status}
                        onValueChange={(value: TaskStatus) => setStatus(value)}
                      >
                        <SelectTrigger className="w-full rounded-md border-gray-300 focus:border-royalBlue focus:ring-royalBlue">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-md shadow-lg">
                          {Object.keys(columnTitles).map((statusKey) => (
                            <SelectItem
                              key={statusKey}
                              value={statusKey}
                              className="hover:bg-gray-100"
                            >
                              {columnTitles[statusKey]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "inertia", stiffness: 300 }}
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Due Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {dueDate ? (
                            format(dueDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </motion.div>

                <div className="flex justify-end gap-3 pt-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "tween", stiffness: 100, damping: 10 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-royalBlue"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "tween", stiffness: 100, damping: 10 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-royalBlue rounded-md hover:bg-royalBlue focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : task ? (
                        "Update Task"
                      ) : (
                        "Create Task"
                      )}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
