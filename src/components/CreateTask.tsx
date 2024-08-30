import { nanoid } from "nanoid";
import { Task } from "../types/types";
import { cn } from "../utils/cn";
import { useTaskStore } from "../zustand/taskStore";

export default function CreateTask({ className }: { className?: string }) {
    const addItem = useTaskStore((state) => state.addItem);
  
    const createTask = () => {
      const task: Task = {
        id: nanoid(5),
        courseId: '',
        name: '',
        desc: '',
        start: new Date(),
        end: new Date(),
        type: '',
        status: '',
        color: 'bg-ol-100',
      };
      addItem(task, 'tasks');
    };
  
    return (
      <button
        onClick={createTask}
        className={cn(
          'rounded-md border border-black bg-green-700 px-4 py-2 text-white',
          className,
        )}
      >
        New Task
      </button>
    );
  }