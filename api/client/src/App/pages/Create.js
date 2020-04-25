import React, { Component } from 'react';
import CafeForm from './cafeForm'


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

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    if (!!this.state.cafe_name && !!this.state.cafe_location && !!this.state.cafe_capacity) {
      this.createCafe()
    } 
    else {
      alert("Please fill out all of the details.")
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