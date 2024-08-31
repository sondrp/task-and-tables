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

const renderNoTime = (value: Date | string) => new Intl.DateTimeFormat('no-NO', timeSettings).format(new Date(value))

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
    render: renderNoTime,
  },
  {
    key: 'end',
    order: 4,
    render: renderNoTime,
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

  const tables: Map<string, Task[]> = courses.reduce(
    (acc, course) => {
      acc.set(course.id, []);
      return acc;
    },
    new Map([['No parent', []]]),
  );

  tasks.forEach((task) => {
    if (tables.has(task.courseId)) {
      tables.get(task.courseId)!.push(task);
    } else {
      tables.get('No parent')!.push(task);
    }
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center gap-2 bg-slate-200 p-20 lg:gap-20">
      <CreateCourse className="absolute bottom-20 right-20" />
      <CreateTask className="absolute bottom-20 left-20" />
      <div className="flex flex-col gap-4">
        {Array.from(tables.entries()).map(([courseId, rows]) => (
          <Table
            key={courseId}
            tableName={courseId}
            data={rows}
            handleDrop={(row: Task) => handleTaskDrop(row, courseId)}
            columns={columns}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
