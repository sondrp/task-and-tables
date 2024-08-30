import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, Task } from '../types/types';

type State = {
  courses: Course[];
  tasks: Task[];
};

type Actions = {
  addItem: <K extends keyof State>(item: State[K][number], key: K) => void;
  deleteItem: <K extends keyof State>(id: string, key: K) => void;
  updateItem: <K extends keyof State>(
    id: string,
    updates: Partial<State[K][number]>,
    key: K,
  ) => void;
};

type Store = State & Actions;

export const useTaskStore = create<Store>()(
  persist(
    (set) => ({
      courses: [],
      tasks: [],

      addItem: <K extends keyof State>(item: State[K][number], key: K) =>
        set(
          produce((draft) => {
            (draft[key] as any[]).push(item);
          }),
        ),
      deleteItem: <K extends keyof State>(id: string, key: K) =>
        set(
          produce<Store>((draft) => {
            draft[key].filter((item) => item.id !== id);
          }),
        ),
      updateItem: <K extends keyof State>(
        id: string,
        updates: Partial<State[K][number]>,
        key: K,
      ) =>
        set(
          produce<Store>((draft) => {
            const item = (draft[key] as any[]).find((item) => item.id === id);
            if (item) Object.assign(item, updates);
          }),
        ),
    }),
    { name: 'task' },
  ),
);
