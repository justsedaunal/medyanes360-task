"use client";

import React from "react";

const TodoListItem = (props) => {
  return (
    <ul class="divide-y divide-gray-200 px-4">
      <li class="py-4">
        <div class="flex items-center justify-between">
          <label for="todo1" class="ml-3 block text-gray-900">
            <div class="flex">
              <span class="text-lg font-medium">{props.todo.todoDescription}</span>
            </div>
          </label>
          <div class="flex justify-between items-center gap-3">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-800"
            >
              Edit
            </a>
            <a href="#" class="font-medium text-red-600 hover:text-red-800">
              Delete
            </a>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default TodoListItem;
