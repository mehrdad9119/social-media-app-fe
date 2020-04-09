import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme'

//Components
import Navbar from './components/Navbar'
import AuthRoute from './utils/AuthRoute'

//Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar/>
      <div className="container">
        <Switch>
          <Route exact path='/' component={home}/>
          <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
          <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
