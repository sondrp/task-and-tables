import { useState } from 'react';
import Table, { Item } from './components/Table';

const defaultItems: Item[] = [
  {
    id: '1',
    tableId: '1',
    content1: 'content1',
    content2: 'content2',
    content3: 'content3',
  },
  {
    id: '2',
    tableId: '2',
    content1: 'content1',
    content2: 'content2',
    content3: 'content3',
  },
  {
    id: '3',
    tableId: '3',
    content1: 'content1',
    content2: 'content2',
    content3: 'content3',
  },
];

function App() {
  const [items, setItems] = useState(defaultItems);

  const handleDrop = (movingItem: Item, landingTableId: string) => {
    setItems(
      items.map((item) =>
        item.id === movingItem.id ? { ...item, tableId: landingTableId } : item,
      ),
    );
  };

  return (
    <div className="flex h-screen items-center justify-center lg:gap-20 gap-2 bg-slate-200">
      <Table handleDrop={handleDrop} id="1" items={items} />
      <Table handleDrop={handleDrop} id="2" items={items} />
      <Table handleDrop={handleDrop} id="3" items={items} />
    </div>
  );
}

export default App;
