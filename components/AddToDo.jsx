"use client";

import { React, useState } from "react";
import { postAPI } from "@/services/fetchApi";

const AddToDo = () => {
  const [todoDescription, setTodoDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    //post todo
    const req = postAPI("/todos/postTodo",  { todoDescription: todoDescription } );
    req
      .then((res) => alert(res.message))
      .catch((er) => console.error("Hata oluştu: " + er));
  };

  const changeHandler = (e) => {
    if (e.currentTarget.id == "tododescription") {  
      setTodoDescription(e.currentTarget.value);
    }
  };

  return (
    <>
      <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <form
          class="w-full max-w-sm mx-auto px-4 py-2"
          onSubmit={submitHandler}
        >
          <div class="flex items-center border-b-2 border-teal-500 py-2">
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Add a task"
              id="tododescription"
              onChange={changeHandler}

            />
            <button
              class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
     
      </div>
    </>
  );
};

export default AddToDo;
