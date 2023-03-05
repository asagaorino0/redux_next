import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, clearAllTodos, selectTodos } from '@/features/todoSlice';
import { db, setTodo } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface Todo {
  id: number;
  todo: string;
  complete: boolean;
  auth: boolean;
}

function TodoItem({ todo, onDeleteClick }: { todo: Todo, onDeleteClick: () => void }) {
  return (
    <li>
      {todo.id} {todo.todo}
      <button aria-label="delete_todo" onClick={onDeleteClick}>
        -
      </button>
    </li>
  );
}

export function Todo() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [event, setEvent] = useState('');
  const [limit, setLimit] = useState('');

  const addTodoItem = () => {
    // const maxId = todos.reduce((prev: any, curr: any) => Math.max(prev.id, curr.id), 0) + 1;
    const maxId = todos.length + 1;
    const newTodo: Todo = {
      id: maxId,
      todo: event,
      complete: false,
      auth: false,
    };
    dispatch(addTodo(newTodo));
    // setTodo(newTodo, maxId)
    setEvent('');
    setLimit('');
  };

  const deleteAllTodos = () => {
    dispatch(clearAllTodos());
  };

  const deleteTodoItem = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const saveTodosToDb = async () => {
    const maxId = todos.length + 1;
    await setDoc(
      doc(db, 'todos', `${maxId}`), {
      todos
    }, { merge: true });
    console.log(todos);
  };

  return (
    <div>
      <div>
        <span>List</span>
        <br />
        <input
          type="text"
          name="event"
          autoFocus
          onChange={(e) => setEvent(e.target.value)}
          value={event}
        />
        <br />
        {/* <input
          type="date"
          name="limit"
          onChange={(e) => setLimit(e.target.value)}
          value={limit}
        /> */}
        <br />
      </div>
      <button aria-label="addTodo" onClick={addTodoItem}>
        Add Todo/
      </button>
      <button aria-label="delete_all_todos" onClick={deleteAllTodos}>
        Delete All Todos/
      </button>
      <button aria-label="db_input" onClick={saveTodosToDb}>
        DB Input/
      </button>
      <ul>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} onDeleteClick={() => deleteTodoItem(todo.id)} />
        ))}
      </ul>
      <br />
    </div>
  );
}
