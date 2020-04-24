import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';
import CafeListTable from './cafeListTable'
import ModalButton from './modalButton'
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
    <div className="modal">
      <div className="modal-title-container">
        <h1 className="modal-title">Existing Cafes</h1>
      </div>
      <div className="modal-table">
        {
          !!this.state.cafes && this.state.cafes.length > 0 && 
            <CafeListTable cafes={this.state.cafes} />
        }
      </div>

      <ModalButton text={"Return to Login"} to={'/'}/>

    </div>
    );
  }
}
export default CafeList;