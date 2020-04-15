import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';


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
    this.createCafe()
  }


  render() {
    return (
    <div className="App">
      <h1>Create a cafe</h1>

      <form onSubmit={this.handleSubmit} style={{
          display:'grid', padding:'0.5rem'
        }}>
          <label>
            Cafe Name:
            <input style={{margin:"0.5rem"}} type="text" name="cafe_name" value={this.state.cafe_name} onChange={this.handleChange} />
          </label>
          <label>
            Cafe Location:
            <input style={{margin:"0.5rem"}} type="text" name="cafe_location" value={this.state.cafe_location} onChange={this.handleChange} />
          </label>
          <label>
            Capacity:
            <input style={{margin:"0.5rem"}} type="number" name="cafe_capacity" value={this.state.cafe_capacity} onChange={this.handleChange} />
          </label>
          {/*<label>
            Is Private:
            <input style={{margin:"0.5rem"}} type="checkbox" name="is_private" value={this.state.is_private} onChange={this.handleChange} />
          </label>*/}
          <input type="submit" value="Create" align="middle" style={{width:"20%",margin:"2rem",padding:"0.5rem"}}/>
        </form>

        {
          this.state.postId && <h2>Your new cafe ID is {this.state.postId}</h2>
        }

      <Link to={'/'}>
        <h3>Return to login page <FaBeer/></h3>
      </Link>
    </div>
    );
  }
}
export default CreateCafe;