import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>404 - Not Found</h2>
            <a href="/login">Go to Login</a>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;