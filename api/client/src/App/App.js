import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Cafe from './pages/Cafe';
import CreateCafe from './pages/Create'
import CafeList from './pages/CafeList'

class App extends Component {
  render() {
    const App = () => (
      <div>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/cafe' component={Cafe}/>
            <Route path='/create' component={CreateCafe}/>
            <Route path='/list' component={CafeList}/>
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
/*  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:3001/cafe")
          .then(res => {
            return res.text()
          })
          .then(data => {
            this.setState({ apiResponse: JSON.parse(data).cafe })
          });
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-intro">{this.state.apiResponse}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  
}*/

export default App;
