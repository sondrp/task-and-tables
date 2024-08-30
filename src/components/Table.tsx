import { ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import { cn } from '../utils/cn';

const ItemTypes = {
  ROW: 'row',
};

type RenderFunction<T> = (value: T, rowData: any) => React.ReactNode;

export type Column<T> = {
  key: keyof T;
  hidden?: boolean
  header?: string;
  order?: number
  render?: RenderFunction<T[keyof T]>;
};

type TableProps<T> = {
  data: T[];
  columns?: Column<T>[];
  tableName?: string;
}

export default function Table<T extends object>(props: TableProps<T>) {
  const { data, tableName } = props;

  const headers = data.length > 0 
    ? Object.keys(data[0])
    : []

  const columns: Column<T>[] = headers.reduce((acc, next, i) => {
    if (acc.find(column => column.key === next)) return acc
    
    acc.push({
      key: next as keyof T,
      header: next,
      order: i,
    })
    return acc
  }, props.columns ? [...props.columns] : [])

  columns.sort((a, b) => {
    if (!a.order) return 100
    if (!b.order) return 0
    return a.order - b.order
  })

  return (
    <table>
      <thead>
        {tableName && (
          <tr>
            <th colSpan={headers.length} className='px-4 py-2 bg-slate-300 border border-slate-400'>{tableName}</th>
          </tr>
        )}
        <tr>
          {columns.filter(column => !column.hidden).map((column) => (
            <th
              key={column.key.toString()}
              className="px-4 py-2 border border-slate-400 bg-slate-300 first-letter:uppercase"
            >
              {column.header ?? column.key.toString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.filter(column => !column.hidden).map((column) => (
              <td
                key={column.key.toString()}
                className="whitespace-nowrap px-6 py-4 border border-slate-400"
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : (row[column.key] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
type DraggableTrProps<T> = {
  item: T;
  children: ReactNode;
};

function DraggableTr<T extends Object>(props: DraggableTrProps<T>) {
  const { children, item } = props;

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROW,
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <tr
      ref={drag}
      className={cn(
        'border border-slate-400 px-4 py-2',
        isDragging && 'bg-ol-400 opacity-50',
      )}
    >
      {children}
    </tr>
  );
}
