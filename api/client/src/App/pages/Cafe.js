import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';


class Cafe extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.location.state)
    this.state = {
      cafe: this.props.location.state.cafe,
      username: this.props.location.state.username
    };
  }

  render() {
    return (
    <div className="App">
      <h1>Welcome {this.state.username} to Cafe {this.state.cafe[0].cafename}!</h1>
      <p>Cafe Id: {this.state.cafe[0].id} | Cafe Location: {this.state.cafe[0].location}</p>
      <Link to={'/'}>
        <h3> Leave the cafe <FaBeer/></h3>
      </Link>
    </div>
    );
  }
}
export default Cafe;