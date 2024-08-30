import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Course } from '../types/types';
import { cn } from '../utils/cn';
import { useTaskStore } from '../zustand/taskStore';

export default function CreateCourse({ className }: { className?: string }) {
  const addItem = useTaskStore((state) => state.addItem);

  const [courseName, setCourseName] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const course: Course = {
      id: nanoid(5),
      name: courseName,
      color: 'bg-ol-200',
    };
    addItem(course, 'courses');
    setCourseName('');
  };
  return (
    <input
      placeholder="Course name"
      onKeyDown={handleKeyDown}
      value={courseName}
      onChange={(e) => setCourseName(e.target.value)}
      className={cn(
        'rounded-md border border-slate-400 bg-inherit px-4 py-2 outline-none',
        className,
      )}
    />
  );
}
