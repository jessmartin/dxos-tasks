import { useIdentity, useQuery, useSpaces } from "@dxos/react-client";
import React, { useEffect, useState } from "react";

import { Todo } from "./proto";

// Todo List:
// 1. Log the user in and connect to a space
// 2. Draw all of the todos from the space to the screen

// Kanban Board:
// 1. Get all of the todos from the space
// 2. Draw the todos in columns: todo, done
// 3. Add a "doing" column / status to the todos data model ***

// Later: migrate the todos data model to have a Task List

export const TodoList = () => {
  useIdentity({ login: true });
  const [space] = useSpaces();
  const todos = useQuery<Todo>(space, Todo.filter());
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTask, setEditingTask] = useState<number | null>(null);

  const handleNewTodo = () => {
    console.log(newTodoTitle);
    const todo = new Todo();
    todo.title = newTodoTitle;
    todo.completed = false;
    space.db.add(todo);
    setNewTodoTitle("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-2">
        Todo List
      </h1>
      {todos && (
        <ul>
          {todos.map((task, index) => (
            <li key={index} className="flex items-center text-gray-700 mb-1">
              <input
                className="mr-2 rounded shadow"
                type="checkbox"
                checked={task.completed}
                onChange={() => (task.completed = !task.completed)}
              />
              <span
                onClick={() => {
                  setEditingTask(index);
                }}
              >
                {editingTask === index ? (
                  <span>
                    <input
                      className="mr-2 rounded shadow p-0 px-2"
                      type="text"
                      value={task.title}
                      onChange={(e) => {
                        task.title = e.target.value;
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          setEditingTask(null);
                        }
                      }}
                    />
                    <button
                      className="mr-2 bg-white rounded shadow p-0 px-2 border-gray-400"
                      onClick={() => {
                        setEditingTask(null);
                      }}
                    >
                      Save
                    </button>
                  </span>
                ) : (
                  task.title
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-1">
        <input
          className="mr-2 rounded shadow"
          type="text"
          value={newTodoTitle}
          onChange={(e) => {
            setNewTodoTitle(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleNewTodo();
            }
          }}
        />
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={handleNewTodo}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};
