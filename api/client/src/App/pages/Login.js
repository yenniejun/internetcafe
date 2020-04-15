import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', cafe_id: '', fireRedirect: false, cafe: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getCafe(cafeId) {
    console.log("get cafe")
    const response = await fetch(`/api/cafe/${cafeId}`);

    if (response.status == 404) {
      alert(`Cafe with ID ${cafeId} does not exist`)
    }

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  componentDidUpdate(prevProps) {
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
      this.getCafe(this.state.cafe_id)
        .then(res => {
          this.setState({ cafe: res })
        })
        .catch(err => console.log("ERROR!", err))
        .then(this.setState({ fireRedirect: true}));
    }

  }

  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state

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
          <input type="submit" value="Submit" align="middle" style={{width:"20%",margin:"2rem",padding:"0.5rem"}}/>
        </form>

        {fireRedirect && !!this.state.cafe && (
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