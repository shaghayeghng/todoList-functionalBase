import React, { useState, useEffect } from "react";
import TaskAdder from "./TaskAdder";
import TodoList from "./TodoList";
import Cookies from "universal-cookie";
import axios from "axios";

const TodoListApp = ({setUsername}) => {
  // states
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');

  const cookies = new Cookies();
  const token = cookies.get("token");

  // componentDidMount
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await axios.get(
          "http://localhost:8000/api/v1/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`, //means the header have token
            },
          }
        ); //to be sure token is ok
        console.log(userData.data.data.doc.username);
        setUsername(userData.data.data.doc.username);
        getTodos();
      } catch (error) {
        console.log(error.response);
      }
    }
    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTodos = async () => {
    const userTodos = await axios.get("http://localhost:8000/api/v1/todos", {
      headers: {
        Authorization: `Bearer ${token}`, //means the header have token
      },
    });
    console.log(userTodos);
    setTodos(userTodos.data.todos);
  };

  // componentDidUpdate(prevProps, prevState, snapShot)
  useEffect(() => {
    filterOptionHandler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, selectedOption]);  //! initial render and run if the data change

  const filterOptionHandler = () => {
    switch (selectedOption) {
      case "finished":
        setFilteredTodos(
          todos.filter(
            (task) => task.isChecked === true
            ),
          );
        break;
      case "unfinished":
        setFilteredTodos(
          todos.filter(
            (task) => task.isChecked === false
          ),
        );
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div>
      <TaskAdder
        token={token}
        todos={todos}
        setSelectedOption={setSelectedOption}
        setTodos={setTodos}
        selectedFilter={selectedOption}
      />
      <TodoList
        token={token}
        todos={todos}
        filteredTodos={filteredTodos}
        setTodos={setTodos}
      />
    </div>
  );

}

export default TodoListApp;
