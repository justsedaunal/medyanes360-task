"use client";

import { deleteAPI ,putAPI} from "@/services/fetchApi";
import React , { useState } from "react";

const TodoListItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoDescription, setTodoDescription] = useState(props.todo.todoDescription);

  const editHandler = () => {
    setIsEditing(true);
  };

  const saveHandler = async () => {
    try {
      const data = await putAPI(`/todos/updateTodo`, { id: props.todo.id, todoDescription });
      alert(data.message || "Todo updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const cancelHandler = () => {
    setIsEditing(false);
    setTodoDescription(props.todo.todoDescription);
  };


  const deleteHandler = () => {
    const req = deleteAPI(`/todos/deleteTodo?id=${props.todo.id}`);
    req
      .then((res) => alert(res.message))
      .catch((er) => console.error("Hata oluştu: " + er));
  };

  return (
    <ul className="divide-y divide-gray-200 px-4">
      <li className="py-4">
        <div className="flex items-center justify-between">
          {!isEditing ? (
            <>
              <span className="text-lg font-medium">
                {props.todo.todoDescription}
              </span>
              <div className="flex justify-between items-center gap-3">
                <button onClick={editHandler} className="font-medium text-indigo-600 hover:text-indigo-800">
                  Edit
                </button>
                <button onClick={deleteHandler} className="font-medium text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={todoDescription}
                onChange={(e) => setTodoDescription(e.target.value)}
                className="border p-1 rounded"
              />
              <button onClick={saveHandler} className="font-medium text-green-600 hover:text-green-800">
                Save
              </button>
              <button onClick={cancelHandler} className="font-medium text-gray-600 hover:text-gray-800">
                Cancel
              </button>
            </div>
          )}
        </div>
      </li>
    </ul>
  );
};

export default TodoListItem;
