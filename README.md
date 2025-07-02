# Task Management System

A modern, feature-rich task management application designed to help users organize, prioritize, and track their work efficiently. With a customizable board, intuitive drag-and-drop, calendar integration, and responsive design, it streamlines task workflows for individuals and teams across devices.

### Tech Stack
- **Frontend**: Next.js (React), TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: Custom `useDragAndDrop` hook  (`hooks/useDragAndDrop`)
- **Data Persistence**: Local Storage (`lib/storage.ts`)
- **UI Components**: Modular and reusable components (`components/ui/`)

## Challenges and Solutions

### Core Features
- **Three-column board**: "To Do", "In Progress", "Done" with additional customizable columns.
- **Task Management**: Create, edit, and delete tasks with fields for Title, Description, and Due Date.
- **Drag & Drop**: Intuitive movement of tasks between columns with visual feedback.
- **Data Persistence**: Local storage integration ensures tasks persist between sessions.
- **Responsive Design**: Mobile-first approach for seamless experience across devices.

### Enhanced Features
- **Search & Filter**: Real-time global search and filtering by status, priority, and keywords. Additionally used Debouncing (limit the amount of times )
- **Priority System**: Visual priority indicators (color-coded: High, Medium, Low). 
- **Custom Hooks**: Reusable logic for drag-and-drop.

### Polish Features
- **Loading States**: Skeleton screens and smooth loading indicators. 
- **Empty States**: Friendly messages for empty columns with call-to-actions. *
- **Micro-interactions**: Subtle hover effects, smooth transitions, and animations. 

### Advanced Features
- **Performance Optimization**: Leveraged `React.memo` and `useCallback` to minimize re-renders.

## Key Takeaways
- **Modularity**: Reusable components simplified development and testing.
- **User Experience**: Prioritized smooth interactions and intuitive design.



#### Additional Calendar View Feature
- **Purpose**: Provides a visual representation of tasks scheduled for specific dates.
- **Functionality**:
  - View all upcoming tasks in a calendar layout.
  - Click on a date to see tasks due on that day.
  - Integrates seamlessly with the existing task management system.
- **Usage**:
  ```tsx
  import { Calendar } from "@/components/ui/calendar";

  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />;
  ```
---