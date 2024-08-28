import { ReactNode, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { cn } from '../utils/cn';

export type Item = {
  id: string
  tableId: string;
  [key: string]: number | string;
};

type TableProps = {
  id: string
  items: Item[];
  handleDrop: (movingItem: Item, landingTableId: string) => void
};

const ItemTypes = {
  ROW: 'row',
  TABLE: 'table',
};

// 1. Make rows draggable
// 2. Make tables droppable
// 3. Make the order changeable within the table (tr should be draggable and droppable?)

export default function Table(props: TableProps) {
  const { id, items, handleDrop } = props;

  const headers = Object.keys(items[0]).filter(h => !["tableId", "id"].includes(h));

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ROW,
    drop: (item: Item) => handleDrop(item, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <table ref={drop}>
      <thead>
        <tr>
          {headers
            .map((h, i) => (
              <th
                key={i}
                className={cn(
                  'border border-slate-400 bg-slate-300 px-4 py-2 first-letter:uppercase',
                  isOver && 'bg-ol-400 text-white',
                )}
              >
                {h}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {items.filter(item => item.tableId === id).map((item, i) => (
          <DraggableTr item={item} key={i}>
            {headers
              .map((h, i) => (
                <td key={i} className="border border-slate-400 px-4 py-2 first-letter:uppercase">
                  {item[h]}
                </td>
              ))}
          </DraggableTr>
        ))}
      </tbody>
    </table>
  );
}

type DraggableTrProps = {
  item: Item;
  children: ReactNode;
};

function DraggableTr(props: DraggableTrProps) {
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
