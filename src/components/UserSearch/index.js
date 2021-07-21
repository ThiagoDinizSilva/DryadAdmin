import React, { Component, Fragment } from "react";
import Pagination from "../Pagination";
import "../../assets/scss/userSearch.scss";

export default class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      name: '',
      id: '',
      initials: '',
      users: '',
      searchBase: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ [`${e.target.name}`]: value })


  }

  handleSubmit(e) {
    e.preventDefault();
    let fullName = this.state.initials + ' ' + this.state.name
    fullName = fullName.trim()

    fetch('http://localhost:3001/api/user/search', {
      method: 'POST',
      body: JSON.stringify({
        name: fullName,
        id: this.state.id,
        searchBase: this.state.searchBase
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errorCode) {
          console.log(response.errorCode)
          alert("Something went wrong!\n  " + response.errorCode)
          return
        }
        this.setState({ users: response })
        this.child.current.setData(response)
      })
      .catch((err) => console.log(err))
  }
  render() {
    return (
      <div className="search-div">
        <form className="search-form" autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Name" />
          <input type="text"
            name="id"
            value={this.state.id}
            onChange={this.handleChange}
            placeholder="ID" />
          <select name="initials"
            value={this.state.initials}
            onChange={this.handleChange}>
            <option value=" ">permissions</option>
            <option value="IT">IT</option>
            <option value="manager">manager</option>
            <option value="user">user</option>
            <option value="operator">operator</option>
            
          </select>
          <select name="searchBase"
            value={this.state.curso}
            onChange={this.handleChange}>
            <option value=''>Filter </option>
            <option value="ou=Active">Active</option>
            <option value="ou=Inactive">Inactive</option>
            </select>
          <input type="submit" className="btn-submit-form" value="Search"></input>
        </form>
        <Pagination data={this.state.users} ref={this.child} />
      </div>
    );
  }
}