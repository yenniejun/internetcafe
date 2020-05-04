import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Cafe from './pages/Cafe';
import CreateCafe from './pages/Create'
import CafeList from './pages/CafeList'
import ErrorPage from './pages/ErrorPage';

class App extends Component {
  render() {
    const App = () => (
      <div>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/cafe' component={Cafe}/>
            <Route path='/create' component={CreateCafe}/>
            <Route path='/list' component={CafeList}/>
           <Route component={ErrorPage}/>
          </Switch>
      </div>
    )

    return (
        <BrowserRouter>
          <Switch>
            <App/>
          </Switch>
        </BrowserRouter>

    );
  }
}

export default App;
