import React, { Component } from 'react';
import CafeForm from './components/cafeForm'

const MAX_CAPACITY = 8;
const MAX_NAME_LENGTH = 30;

class CreateCafe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'cafe_name':'',
      'cafe_location': '',
      'cafe_capacity': ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props.location.state)
  }

  async createCafe() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        cafeName: this.state.cafe_name,
        location: this.state.cafe_location,
        capacity: this.state.cafe_capacity,
        isPrivate: false
      })
    };

    const response = await fetch('/api/cafe', requestOptions)
    if (response.status !== 201) throw Error(response);

    const body = await response.json();
    
    this.setState({ postId: body.id })
    return response;
  };

  readyToCreate() {
    console.log("ready to create", this.state)
    if (!this.state.cafe_name || !this.state.cafe_location || !this.state.cafe_capacity) {
      alert("Please fill out all of the details.") ;
      return false;
    }
    else if (this.state.cafe_name.length >= MAX_NAME_LENGTH) {
      alert(`Cafe name must be fewer than ${MAX_NAME_LENGTH} characters.`)
      return false;
    }
    else if (this.state.cafe_location.length >= MAX_NAME_LENGTH) {
      alert(`Cafe location name must be fewer than ${MAX_NAME_LENGTH} characters.`)
      return false;
    } 
    else if (parseInt(this.state.cafe_capacity) >= MAX_CAPACITY) {
      alert (`Cafe capacity must be fewer than ${MAX_CAPACITY} people.`)
      return false;
    }
    else {
      return true;
    }
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    if (this.readyToCreate()) {
      this.createCafe()
    } 
  }


  render() {
    return (
    <div className="App">
      <CafeForm handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                cafe_name={this.state.cafe_name}
                cafe_location={this.state.cafe_location}
                cafe_capacity={this.state.cafe_capacity}
                post_id={this.state.postId}
      />

    </div>
    );
  }
}
export default CreateCafe;