import React from "react";

export function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border p-4 animate-pulse">
      <div className="h-4 w-16 bg-gray-200 rounded-full mb-2"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>
      <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
    </div>
  );
}

export function TaskColumnSkeleton() {
  return (
    <div className="rounded-3xl border-2 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-6 gap-10">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 w-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
} 