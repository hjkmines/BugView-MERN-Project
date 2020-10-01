import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from '../src/components/Navbar'; 
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'; 
import Home from './components/pages/Home'; 
import Profile from './components/pages/Profile'; 
import Login from './components/pages/Login'; 
import Signup from './components/pages/Signup'; 
import CreatePost from './components/pages/CreatePost'; 
import UserProfile from './components/pages/UserProfile'; 
import SubscribeUserPosts from './components/pages/SubscribeUserPosts';
import AllTickets from './components/pages/AllTickets'; 
import Reset from './components/pages/Reset';  
import NewPassword from './components/pages/NewPassword'; 
import { reducer, initialState} from './reducers/userReducer'; 
import './App.css'; 

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory(); 
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) {
      dispatch({ type: 'USER', payload: user })
      // history.push('/')
    } else {
      if (!history.location.pathname.startsWith('/reset'))
      history.push('/login')
    }
  }, [])

  return (
    <Switch>
      <Route exact path='/'>
        <Home /> 
      </Route>  
      <Route path='/login'>
        <Login /> 
      </Route>
      <Route exact path='/profile'>
        <Profile /> 
      </Route>
      <Route path='/signup'>
        <Signup /> 
      </Route>
      <Route path='/createpost'>
        <CreatePost /> 
      </Route>
      <Route path='/alltickets'>
        <AllTickets /> 
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile /> 
      </Route>
      <Route path='/myfollowerspost'>
        <SubscribeUserPosts /> 
      </Route>
      <Route exact path='/reset'>
        <Reset /> 
      </Route>
      <Route path='/reset/:token'>
        <NewPassword /> 
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState); 

  return (
    <UserContext.Provider value={{ state, dispatch }}>
    <Router>
      <Navbar />
      <Routing /> 
    </Router>
    </UserContext.Provider>
  );
}

export default App;
