import axios from "axios";
import React, { useState } from "react";
import "./TaskAdder.css";

const TaskAdder = ({token, todos, setSelectedOption, setTodos, selectedFilter}) => {
  // states
  const [taskInput, setTaskInput] = useState('');
  
  //event handler
  const onSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (taskInput === "") {
      return alert("Nothing has been submited!");
    }
    //this function get the new todos and add them to the previous ones
    try {
      const addingTodoData = await axios.post(
        "http://localhost:8000/api/v1/todos/",
        {
          //to server
          name: "todos",
          TodoText: taskInput,
          isChecked: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, //means the header have token
          },
        }
      );
      console.log(addingTodoData);
      setTodos([
        ...todos,
        {
          //not going to server
          TodoText: taskInput,
          isChecked: false,
          _id: addingTodoData.data.data._id,
        },
      ]);
      setTaskInput("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="title">Your Todo List</h1>
      <form className="add-form" action="" onSubmit={onFormSubmit}>
        <input
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="add task to do"
          value={taskInput}
          type="text"
        />
        <button type="submit">
          <i className="fas fa-plus"></i>
        </button>
        <div className="filter-bar">
          <i className="fas fa-sort-down"></i>
          <select
            onChange={onSelectChange}
            value={selectedFilter}
          >
            <option value="all"> All</option>
            <option value="finished"> Finished</option>
            <option value="unfinished"> Unfinished</option>
          </select>
        </div>
      </form>
    </div>
  ); 
}
export default TaskAdder;
