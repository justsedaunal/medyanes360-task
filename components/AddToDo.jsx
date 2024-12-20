"use client";

import { React, useState } from "react";
import { postAPI } from "@/services/fetchApi";
import { useTasksStore } from "../store/tasksStore";
const AddToDo = ({ onNewTodo }) => {
  const [todoDescription, setTodoDescription] = useState("");
  const createTask = useTasksStore((state) => state.createTask);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!todoDescription.trim()) {
      alert("Lütfen bir görev ekleyin.");
      return;
    }

    const newTask = {
      todoDescription,
    };

    try {
      const res = await createTask(newTask);
      setTodoDescription("");
      alert(res.message || "Görev başarıyla eklendi!");
    } catch (error) {
      console.error("Hata oluştu: " + error);
    }
  };

  const changeHandler = (e) => {
    if (e.currentTarget.id === "tododescription") {
      setTodoDescription(e.currentTarget.value);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={submitHandler}
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            id="tododescription"
            value={todoDescription}
            onChange={changeHandler}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddToDo;
