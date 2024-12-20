"use client";

import { React, useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";
import AddToDo from "./AddToDo";
import { getAPI } from "@/services/fetchApi";
import { useTasksStore } from "../store/tasksStore";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const { tasks, isLoading, readTasks } = useTasksStore();

  useEffect(() => {
    readTasks();
  }, [readTasks]);
  console.log("Tasks State:", tasks); // Burada güncellemeyi kontrol et
  console.log("Loading State:", isLoading);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       await readTasks();
  //       console.log("Tasks state:", tasks); // Bu satırı ekleyerek kontrol et
  //       console.log("Tasks Length:", tasks.length);
  //     } catch (error) {
  //       console.error("Hata oluştu: ", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [readTasks]);

  // const fetchTodos = async () => {
  //   try {
  //     setIsLoading(true);
  //     const todosData = await getAPI("/todos/getTodos");
  //     setTodos(todosData);
  //   } catch (er) {
  //     console.error("Hata Oluştu: " + er);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  const handleNewTodo = () => {
    fetchTodos(); // Yeni todo eklendiğinde tüm liste yeniden yüklenir
  };

  const handleTodoChange = () => {
    fetchTodos(); // Herhangi bir değişiklik olduğunda tüm listeyi yeniden yükle
  };
  return (
    <div className="max-w-md mx-auto">
      <AddToDo onNewTodo={readTasks} />
      <div className="rounded-lg overflow-hidden mt-4">
        {isLoading ? (
          // Yükleniyor animasyonu
          <div className="flex space-x-2 justify-center items-center h-full">
            <span className="text-white">Loading</span>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          </div>
        ) : tasks.length > 0 ? (
          // Eğer tasks array'i doluysa render et
          tasks.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onUpdate={readTasks}
              onDelete={readTasks}
            />
          ))
        ) : (
          // Yalnızca isLoading false ve tasks boşken göster
          <div className="flex flex-col items-center text-center">
            <svg
              className="h-24 w-24 animate-pulse-scale"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="7"
                stroke="#4F46E5"
                strokeWidth="2"
                fill="#93C5FD"
              />
              <line
                x1="15"
                y1="15"
                x2="21"
                y2="21"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <h1 className="mt-4 text-2xl font-semibold text-indigo-200">
              No Data Found
            </h1>
            <p className="mt-2 text-amber-950">
              You don’t have any items here yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
