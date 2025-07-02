"use client";

import TaskBoard from "@/components/task-board";

export default function Home() {
  try {
    return (
      <div className="min-h-screen bg-neutral-200 antialiased">
        <TaskBoard />
      </div>
    );
  } catch (error) {
    console.error("Failed to render task board:", error);
    return (
      <div className="min-h-screen bg-neutral-200 antialiased flex items-center justify-center">
        <p className="text-ed">
          Failed to load task board. Please refresh the page.
        </p>
      </div>
    );
  }
}
