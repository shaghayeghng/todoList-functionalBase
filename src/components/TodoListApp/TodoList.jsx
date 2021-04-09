import React from "react";
import Todo from "./Todo";

const TodoList = ({ token, todos, filteredTodos, setTodos }) => {
  return (
    <div>
      {filteredTodos.map((todo) => {
        return (
          <Todo
            token={token}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            key={todo._id}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
