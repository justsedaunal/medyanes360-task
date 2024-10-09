"use client";

import { React, useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";
import AddToDo from "./AddToDo";
import { getAPI } from "@/services/fetchApi";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const todosData = await getAPI("/todos/getTodos");
      setTodos(todosData);
    } catch (er) {
      console.error("Hata Oluştu: " + er);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleNewTodo = () => {
    fetchTodos(); // Yeni todo eklendiğinde tüm liste yeniden yüklenir
  };

  const handleTodoChange = () => {
    fetchTodos(); // Herhangi bir değişiklik olduğunda tüm listeyi yeniden yükle
  };

  return (
    <div className="max-w-md mx-auto">
      <AddToDo onNewTodo={handleNewTodo} />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-4">
        {isLoading ? (
          <div className="p-4 text-center">Yükleniyor...</div>
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onUpdate={handleTodoChange}
              onDelete={handleTodoChange}
            />
          ))
        ) : (
          <div className="p-4 text-center">Veri bulunamadı</div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
