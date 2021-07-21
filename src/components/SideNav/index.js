import { HiMenu } from 'react-icons/hi';
import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/scss/sidenav.scss";

class Sidenav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false };
    this.className = this.props.className

  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.setState({ open: false });
  }
  handleDrawer() {
    let currentState = this.state.open
    this.setState({ open: !currentState })

  }

  render() {
    return (
      <div className="Sidebar" ref={node => this.node = node}>
        <HiMenu
          onClick={this.handleDrawer.bind(this)}
          className="button-menu"> 
        </HiMenu>
        <ul className={`drawer ${this.state.open ? "show" : "hide"}`}>
          <ul className="dropdown">
            <NavLink to='/home'
              className="dropdown__item"
              activeClassName="selected"
            >HOME</NavLink>
            <li className="dropdown__item">
              <span className="dropdown__item-title">USERS</span>
              <ul className="dropdown__submenu">
                <NavLink to='/user/register'
                  className="dropdown__submenu-item"
                  activeClassName="selected"
                >REGISTER</NavLink>
                <NavLink to='/user/import'
                  className="dropdown__submenu-item"
                  activeClassName="selected"
                >IMPORT</NavLink>
                <NavLink to='/user/search'
                  className="dropdown__submenu-item"
                  activeClassName="selected"
                >SEARCH</NavLink>
              </ul>
            </li>
            <NavLink className="dropdown__item" to='/groups' activeClassName="selected">
              GROUPS</NavLink>
          </ul>
        </ul>

      </div>
    )
  }
}

export default Sidenav;