import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';


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
    console.log("convertIsPrivateBoolean")
    if (isPrivate === true) {
      return "private"
    } else {
      return "public"
    }
  }

  // https://stackoverflow.com/questions/50385680/react-html-table
  getTableContent(arr) {
      console.log("HELLO?")
      console.log("get table content", arr)

      const tableStyle = {
        // backgroundColor: "#FFFFE0",
        borderCollapse: "collapse",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
      };


      const tablebody = arr.map(function (item, i) {
          return (
            <tr key={item.id}>
               <td style={{padding:"0.3rem"}}>{item.id}</td>
               <td>{item.cafename}</td>
               <td>{item.location}</td>
               <td>{item.capacity}</td>
               {console.log(item.isprivate)}
               <td>{item.isprivate ? "private" : "public"}</td>
               <td>{item.created_timestamp}</td>
            </tr>
          )
      });

      return (
        <table style={tableStyle}>
          <thead></thead>
            <tbody>
               <tr style={{fontWeight:700, borderBottom: "1px solid black"}}>
                 <td style={{padding: "0.5rem 3rem 0.5rem"}}>Id</td>
                 <td style={{padding: "0.5rem 3rem 0.5rem"}}>Name</td>
                 <td style={{padding: "0.5rem 3rem 0.5rem"}}>Location</td>
                 <td style={{padding: "0.5rem 3rem 0.5rem"}}>Capacity</td>
                 <td style={{padding: "0.5rem 3rem 0.5rem"}}>Private?</td>
                 <td style={{padding: "0.5rem 3rem 0.5rem"}}>Time created</td>
              </tr>
              {tablebody}
            </tbody>
          </table>
        );
  };


  render() {
    return (
    <div className="App">
      <h1>Existing cafes</h1>
        {
          !!this.state.cafes && this.state.cafes.length > 0 && 
          //console.log("render", this.state.cafes) &&
            this.getTableContent(this.state.cafes)
        }

      <Link to={'/'}>
        <h3>Return to login page <FaBeer/></h3>
      </Link>
    </div>
    );
  }
}
export default CafeList;