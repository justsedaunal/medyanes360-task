"use client";
import { React, useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";
import { getAPI } from "@/services/fetchApi";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const todosData = getAPI("/todos/getTodos");
    todosData
      .then((res) => setTodos(res))
      .catch((er) => console.error("Hata Oluştu: " + er));
  });

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      {todos.map((todo) => (
        <TodoListItem todo={todo} />
      ))}{" "}
    </div>
  );
};

export default TodoList;
