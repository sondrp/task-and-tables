import { useTaskStore } from './zustand/taskStore';
import { Task } from './types/types';
import Table, { Column } from './components/Table';
import CreateCourse from './components/CreateCourse';
import CreateTask from './components/CreateTask';

const timeSettings: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

const columns: Column<Task>[] = [
  {
    key: 'id',
    hidden: true,
  },
  {
    key: 'courseId',
    hidden: true,
  },
  {
    key: 'color',
    hidden: true,
  },
  {
    key: 'start',
    order: 4,
    render: (value) =>
      new Intl.DateTimeFormat('no-NO', timeSettings).format(new Date(value)),
  },
  {
    key: 'end',
    order: 4,
    render: (value) =>
      new Intl.DateTimeFormat('no-NO', timeSettings).format(new Date(value)),
  },
];

function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const courses = useTaskStore((state) => state.courses);
  const updateItem = useTaskStore((state) => state.updateItem);

  const handleTaskDrop = (task: Task, courseId: string) => {
    const updatedTask = { ...task, courseId };
    updateItem(task.id, updatedTask, 'tasks');
  };

  return (
    <div className="relative flex h-screen items-center justify-center gap-2 bg-slate-200 lg:gap-20">
      <CreateCourse className="absolute bottom-20 right-20" />
      <CreateTask className="absolute bottom-20 left-20" />
      <Table columns={columns} tableName="All Tasks" data={tasks} />
    </div>
  );
}

export default App;
