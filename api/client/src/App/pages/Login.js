import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', cafe_id: '', fireRedirect: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.cafe_id) {
      alert('Please include a cafe id');
    }
    else if (!this.state.username) {
      alert('Please include a username')
    }
    else {
      this.setState({ fireRedirect: true })
    }

  }

  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state

    // const formStyle = {
    //   padding: 0.5rem
    // }

    return (
    <div className="App" >
      <h1>Enter a cafe</h1>
      <form onSubmit={this.handleSubmit} style={{
        display:'grid', padding:'0.5rem'
      }}>
        <label>
          Cafe ID:
          <input style={{margin:"0.5rem"}} type="text" name="cafe_id" value={this.state.cafe_id} onChange={this.handleChange} />
        </label>
        <label>
          Name:
          <input style={{margin:"0.5rem"}} type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" align="middle" class="button" style={{width:"20%",margin:"2rem",padding:"0.5rem"}}/>
      </form>

      {fireRedirect && this.state.cafe_id && (
        <Redirect 
        to={{
          pathname: from || './cafe',
          state: {cafe_id: this.state.cafe_id, username: this.state.username}
        }}
        />
      )}

    </div>
    );
  }
}


export default Login;