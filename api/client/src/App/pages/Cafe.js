import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';


class Cafe extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.location.state)
    this.state = {
      cafe_id: this.props.location.state.cafe_id,
      username: this.props.location.state.username
    };
  }

  render() {
    return (
    <div className="App">
      <h1>Welcome {this.state.username} to Cafe {this.state.cafe_id}!</h1>
      <Link to={'/'}>
        <h3> Leave the cafe <FaBeer/></h3>
      </Link>
    </div>
    );
  }
}
export default Cafe;