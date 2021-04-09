import React from "react";
import "./Todo.css";
import axios from "axios";

const Todo = ({token, todo, todos, setTodos}) => {
  const deleteHandler = async () => {
    try {
      const deleteTodoData = await axios.delete(
        `http://localhost:8000/api/v1/todos/${todo._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(
        todos.filter(
          (el) => el._id !== todo._id //*return
        )
      );
      console.log(deleteTodoData);
    } catch (error) {
      return alert(error.response);
    }
  };

  //* put=replace , patch=modify (patch is for minor edits like attributes)
  const completeHandler = async () => {
    try {
      const completeTodoData = await axios.patch(
        `http://localhost:8000/api/v1/todos/${todo._id}`,
        {
          isChecked: !todo.isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(completeTodoData);

      setTodos(
        todos.map((task) => {
          if (task._id === todo._id) {
            return {
              ...task, //* spread
              isChecked: !task.isChecked,
            };
          }
          return task;
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="todo-list">
      <ul>
        <li>
          <span className={`task-name ${todo.isChecked ? "completed" : ""}`}>
            {todo.TodoText}
          </span>
          <span>
            <button className="complete-btn" onClick={ completeHandler}>
              <i className="fas fa-check"></i>
            </button>
            <button className="delete-btn" onClick={ deleteHandler}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
        </li>
      </ul>
    </div>
  );

}

export default Todo;
