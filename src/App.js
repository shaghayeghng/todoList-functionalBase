import React, { useState, useEffect } from 'react';  //*useEffect for lifecycle methods
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import AuthPage from './pages/AuthPage';
import TodoListPage from './pages/TodoListPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import Cookies from 'universal-cookie';

import './app.css';

const App = () => {
  //states
  const [isAuthenticated, setIsAuthenticated] = useState(false);  //function setState hame be pre state hame be state dastresi darim
  const [username, setUsername] = useState('');

  const cookie = new Cookies();
  
  // componentDidMount
  useEffect(() => {
    // console.log('runned1');
    const authCookie = cookie.get('token');
    authCookie ? authHandler() : logoutHandler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  //! [] --> initial render
  //! nothing --> inotial render and run after every rerender
  //! [data] --> initial render and run if the data change

  const authHandler = () => {
    setIsAuthenticated(true);
  };
    
  const logoutHandler = () => {
    setIsAuthenticated(false);
    cookie.remove('token');
  };
  // const usernameHandler = (term) => { //! setUsername
  //   setState({ username: term });
  // }

  return (
    <>
      <Nav 
        isAuthenticated={isAuthenticated}
        logoutHandler={logoutHandler}
        username={username}
      />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/auth'>
          <AuthPage
            isAuthenticated={isAuthenticated}
            authHandler={authHandler} 
          />
          </Route> 
            
        <ProtectedRoute
          auth={isAuthenticated}
          path='/todolist'
        >
            <TodoListPage setUsername={setUsername} /> 
        </ProtectedRoute>
        {/*age mese balayi bashe byd to ProtectedRoute ...rest ezafe koni*/}
      </Switch>
    </>
  );
};

export default App;