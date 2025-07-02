"use client";

import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import type { Task } from "@/types/task";
import { useState, useEffect } from "react";

interface RightPanelProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  tasks: Task[];
}

export default function RightPanel({ isOpen, onToggle, tasks }: RightPanelProps) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(currentDate);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // check device is mob or tab views
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); 
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  //  if a date has any tasks
  const hasTasksOnDate = (date: Date) => {
    return tasks.some((task) => {
      if (!task.dueDate) return false;
      const taskDate = parseISO(task.dueDate);
      return isSameDay(taskDate, date);
    });
  };

  useEffect(() => {
    // Sort tasks by due date
    const sortedAndFiltered = [...tasks]
      .filter((task) => {
        if (!task.dueDate) return false;
        const taskDate = parseISO(task.dueDate);
        return selectedDate ? isSameDay(taskDate, selectedDate) : taskDate >= currentDate;
      })
      .sort((a, b) => {
        if (!a.dueDate || !b.dueDate) return 0;
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return dateA - dateB; // ascending order
      });
    setFilteredTasks(sortedAndFiltered);
  }, [tasks, selectedDate]);

  return (
    <>
      {isOpen && isMobileOrTablet && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[99]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onToggle(false)}
        />
      )}
      <motion.div
        className={`fixed right-0 top-0 h-full bg-white shadow-lg border-l border-neutral-200 z-[100] ${
          isOpen ? "w-90" : "w-0"
        }`}
        animate={{ width: isOpen ? "18rem" : "0" }}
        transition={{ duration: 0.2 }}
        style={{ zIndex: 100 }}
      >
        <div className="p-4">
          {isOpen && (
            <>
              <div className="flex justify-between items-center mb-2 mt-5">
                <h2 className="text-xl font-bold leading-tight" style={{ color: '#465CDA' }}>Calendar View</h2>
                <button 
                  onClick={() => onToggle(false)}
                  className="text-neutral-500 hover:text-neutral-700 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                Today is {format(currentDate, "EEEE, do MMMM, yyyy")}
              </p>
              <Calendar 
                mode="single" 
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mt-8 mb-8 w-full"
                modifiers={{
                  hasTasks: (date) => hasTasksOnDate(date),
                }}
                modifiersStyles={{
                  hasTasks: {
                    border: "2px solid royalBlue", 
                    borderRadius: "50%",
                    transform: "scale(0.8)", 
                  },
                }}
                classNames={{
                  day: "w-8 h-8 flex items-center justify-center p-0 text-sm",
                  head_cell: "w-8 h-8 flex items-center justify-center p-0 text-sm",
                  cell: "w-8 h-8 flex items-center justify-center p-0",
                  row: "w-full flex justify-between",
                  month: "w-full",
                  table: "w-full",
                  day_selected: "bg-blue-500 text-white",
                  day_today: "bg-gray-100",
                }}
              />
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#465CDA' }}>
                {selectedDate ? "Tasks for " + format(selectedDate, "MMM dd, yyyy") : "Upcoming Tasks"}
              </h2>
              <div className="space-y-2 h-[calc(100vh-500px)] min-h-[200px] overflow-y-auto pr-2 pb-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="p-3 border border-royalBlue bg-blue-100 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{task.title}</h3>
                        {task.dueDate && (
                          <p className="text-xs text-neutral-500">
                            <span className="p-1 border border-1 text-royalBlue bg-blue-100 rounded-full">{format(parseISO(task.dueDate), "MMM dd, yyyy")}</span>
                          </p>
                        )}
                      </div>
                      {task.description && (
                        <p className="text-sm text-neutral-600 mt-1">{task.description}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-neutral-500">
                    {selectedDate ? "No tasks for this date." : "No upcoming tasks."}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
} 