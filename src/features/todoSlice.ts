import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface Todo {
  id: number;
  todo: string;
  complete: boolean;
  auth: boolean;
}

interface TodoStateType {
  todos: Todo[];
}

const initialState: TodoStateType = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, complete: true } : todo
      );
    },
    authorizeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, auth: true } : todo
      );
    },
    clearAllTodos: (state) => {
      state.todos = [];
    },
    dbInput: (state) => {
      // setColor(todo)
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  completeTodo,
  authorizeTodo,
  clearAllTodos,
  dbInput,
} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
