import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import './App.css';
import 'react-bootstrap';
import Home from './Home';
import SignUp from './SignUp';
import Organizations from './Organizations';
import Universities from './Universities';
import EventInfo from './EventInfo';
import API from './API';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    API.loadData();
  }, [])
 
  return (
    <div className="App">
      <Router>
        <HomeNavbar setUser={setUser} user={user}/>
        <div>
          <Main setUser={setUser} user={user}/>
        </div>
      </Router>
    </div>
  );
}

function HomeNavbar(props) {
  function logOut() {props.setUser({})}
  return(
    <nav className="navbar navbar-expand">
      <div className='container'>
        <ul className="navbar-nav mr-auto">
          <span className="navbar-brand text-white">Event Manager</span>
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Events</NavLink></li>
          {props.user.user_id && !props.user.user_type ?<li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/Organizations">Organizations</NavLink></li>:""}
          {props.user.user_type?<li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/Universities">Universities</NavLink></li>:""}
        </ul>
        {
          props.user.full_name ?
          <ul className="navbar-nav ml-auto">
            <li className="navbar-brand text-white">{props.user.full_name}</li>
            <li className="nav-item"><NavLink className="nav-link" to="/" onClick={logOut}>Log out</NavLink></li>
          </ul>
          :
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/LogIn">Log in</NavLink></li>
            <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/SignUp">Register</NavLink></li>
          </ul>
        }
      </div>
    </nav>
  );
}

function Main(props) {
  return(
    <Switch>
      <Route exact path="/" render={(p) => <Home {...p} user={props.user} />} />
      <Route exact path="/Universities" render={(p) => <Universities {...p} user={props.user} />} />
      <Route exact path="/SignUp" render={(p) => <SignUp {...p} setUser={props.setUser} register={true} />}/>
      <Route exact path="/LogIn" render={(p) => <SignUp {...p} setUser={props.setUser} register={false} />}/>
      <Route exact path="/Organizations" render={(p) => <Organizations {...p} user={props.user} />} />
      <Route exact path="/EventInfo/:id" render={(p) => <EventInfo {...p} user={props.user} />} />
    </Switch>
  );
}

export default App
