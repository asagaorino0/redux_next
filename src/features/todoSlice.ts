import { TodoStateType } from '@/types/TodoStateType';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
const initialState: TodoStateType = {
  id: 0,
  todo: "",
  complete: false,
  auth: false,

};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add_todo: (state, action) => {
      const event = action.payload
      state.push({ ...event })
    },
    del_todo: (state, action) => {
      const del = action.payload
      const todos = del.todos.filter(todos => {
        return todos.todo !== del.todo;
      });
      state = todos
    },
    DONE_LIST: (state, action) => {
      const done = action.payload
      const todos = done.todos.map(todos => {
        if (todos.id === done.id)
          return {
            id: todos.id,
            todo: todos.todo,
            complete: true,
            auth: todos.auth,
          }
        else {
          return {
            id: todos.id,
            todo: todos.todo,
            complete: todos.complete,
            auth: todos.auth,
          }
        }
      })
      state = todos
    },
    check_list: (state, action) => {
      const check = action.payload
      const todos = check.todos.map(todos => {
        if (todos.id === check.id)
          return {
            id: todos.id,
            todo: todos.todo,
            complete: todos.complete,
            auth: true,
          }
        else {
          return {
            id: todos.id,
            todo: todos.todo,
            complete: todos.complete,
            auth: todos.auth,
          }
        }
      })
      state = todos
    },
    all_delete: (state) => {
      state = [];
    },
    db_input: (state) => {
      // setColor(todo)
    },
  }
});

export const { add_todo, del_todo, all_delete, DONE_LIST, check_list, db_input } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;