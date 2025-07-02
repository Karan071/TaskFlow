import { useState } from "react";

interface UseDragAndDropProps {
  onDrop: (itemId: string, targetId: string) => void;
}

export const useDragAndDrop = ({ onDrop }: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData("text/plain", itemId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setIsDraggedOver(false);
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId) {
      onDrop(itemId, targetId);
    }
  };

  return {
    isDragging,
    isDraggedOver,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}; 