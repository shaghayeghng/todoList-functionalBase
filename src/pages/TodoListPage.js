import React from 'react';
import TodoListApp from '../components/TodoListApp';

const TodoListPage = ({
    setUsername
}) => {
    return <TodoListApp setUsername = {
        setUsername
    }
    />;
};

export default TodoListPage;