import React , {Fragment , useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search'
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false); 
  }

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=20&sort=created:asc`);
    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }; 

  const showAlert = (msg,type) => {
    setAlert({msg,type});
    setTimeout( ()=> setAlert(null) , 5000);
  }; 

    return (
      <Router>
        <div className="app">
          <Navbar />
          <Alert alert={alert}/>
            <Switch>
                <Route exact path="/" render={props => (
                  <Fragment>
                      <Search 
                        setAlert={showAlert} 
                        searchUsers={searchUsers} 
                        clearUsers={clearUsers} 
                        showClear={users.length > 0 ? true : false}/>
                      <Users 
                        loading={loading} 
                        users={users}/>
                  </Fragment>
                )} />
                <Route exact path="/about" component={About}/>
                <Route exact path="/user/:login" render={props => (
                  <Fragment>
                    <User {...props} 
                    getUserRepos={getUserRepos} 
                    repos={repos} 
                    getUser={getUser} 
                    user={user} 
                    loading={loading}/>
                  </Fragment>
                )}/>
            </Switch>
        </div>
      </Router>
    ); 
  
}

export default App