import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import "../../assets/scss/card.scss";

class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    handleclick(e) {
        e.preventDefault()
    }
    render() {
        return (
            <NavLink to={this.props.value} className="container-card">
                <button className="card" value={this.props.value}
                    onClick={this.handleclick.bind(this)}>
                    {this.props.children}
                </button>
            </NavLink>
        );
    };

}
export default Card;


