import React, { Fragment, useState } from "react";
import "../../assets/scss/userRegister.scss";

export default function UserRegister(props) {
  const [state, setState] = useState({
    givenName: "",
    surName: "",
    id: "",
    displayName: "",
    email: "",
    permissions: "",

  })

  function handleChange(e) {
    const value = e.target.value;
    this.setState({ [`${e.target.name}`]: value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/api/user/register', {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        console.log('Somtehing went wrong!');
      }
    }).catch(err => err);
  }

  return (
    <Fragment>
      <form className="register-form" autoComplete="off" onSubmit={handleSubmit.bind(this)}>
        <input type="text" required
          name="givenName"
          value={state.givenName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input type="text" required
          name="surName"
          value={state.surName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input type="text" required
          name="displayName"
          value={state.displayName}
          onChange={handleChange}
          placeholder="Display Name"
        />
        <input type="text" required
          name="id"
          value={state.id}
          onChange={handleChange}
          placeholder="ID"
        />
        <input type="text"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <select name="baseDN" required
          value={state.baseDN}
          onChange={handleChange}>
          <option value=" ">permissions</option>
          <option value="IT">IT</option>
          <option value="manager">manager</option>
          <option value="user">user</option>
          <option value="operator">operator</option>
        </select>
        <input type="submit" className="btn-submit-form" value="Cadastrar"></input>
      </form>
    </Fragment>
  );
}