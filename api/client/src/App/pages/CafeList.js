import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';
import CafeListTable from './cafeListTable'
import './CafeList.css';


class CafeList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.location.state)
  }

  async getCafes() {
    const response = await fetch(`/api/cafe`);
    if (response.status !== 200) throw Error(response);
    const body = await response.json();
    console.log("get cafes", body)
    return body;
  };

  componentDidMount() {
    this.getCafes()
      .then(cafes => this.setState({cafes: cafes}))
  }

  convertIsPrivateBoolean(isPrivate) {
    if (isPrivate === true) {
      return "private"
    } else {
      return "public"
    }
  }

  render() {
    return (
    <div className="cafeList">
      <h1 className="cafeListTitle">Existing cafes</h1>
        {
          !!this.state.cafes && this.state.cafes.length > 0 && 
            <CafeListTable cafes={this.state.cafes} />
        }
      <Link to={'/'}>
        <h3 className="backToLogin">Return to login page <FaBeer/></h3>
      </Link>
    </div>
    );
  }
}
export default CafeList;