import {
  ShellLayout,
  useIdentity,
  useQuery,
  useSpaces,
} from "@dxos/react-client";
import React, { useEffect, useState } from "react";

import { Todo } from "./proto";
import { useShell } from "@dxos/react-shell";

export const TodoList = () => {
  useIdentity({ login: true });
  const [space] = useSpaces();
  const shell = useShell();
  const todos = useQuery<Todo>(space, Todo.filter());
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [showDeleteTask, setShowDeleteTask] = useState<number | null>(null);

  const handleNewTodo = () => {
    console.log(newTodoTitle);
    const todo = new Todo();
    todo.title = newTodoTitle;
    todo.completed = false;
    space.db.add(todo);
    setNewTodoTitle("");
  };

  return (
    <div>
      <button
        className="float-right bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2 mr-2"
        onClick={() => shell.setLayout(ShellLayout.DEVICE_INVITATIONS)}
      >
        Invite
      </button>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-2">
          Todo List
        </h1>
        {todos && (
          <ul>
            {todos.map((task, index) => (
              <li
                key={index}
                className="flex items-center text-gray-700 mb-1"
                onMouseOver={() => {
                  setShowDeleteTask(index);
                }}
                onMouseLeave={() => {
                  setShowDeleteTask(null);
                }}
              >
                <input
                  className="mr-2 rounded shadow hover:pointer-cursor"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => (task.completed = !task.completed)}
                />
                <span
                  className="hover:pointer-cursor"
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
                        className="mr-2 bg-white rounded shadow p-0 px-2 border border-gray-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTask(null);
                        }}
                      >
                        Done
                      </button>
                    </span>
                  ) : (
                    task.title
                  )}
                  {showDeleteTask === index && editingTask !== index && (
                    <button
                      className="bg-white rounded ml-2 p-0 px-2 hover:bg-gray-100 hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        space.db.remove(task);
                      }}
                    >
                      x
                    </button>
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
    </div>
  );
};
