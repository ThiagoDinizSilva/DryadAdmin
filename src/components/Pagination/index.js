import React, { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineForm, AiOutlineLeft, AiOutlineRight, AiOutlineUnlock } from "react-icons/ai"
import ModifyUser from "../ModifyUser";
import "../../assets/scss/pagination.scss";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: null,
            currentPage: 1,
            todosPerPage: 20,
            toggle: false,
            currentUser: null
        }
        this.indexOfLastTodo = null
        this.indexOfFirstTodo = null
        this.currentTodos = null
        this.arrowClick = this.arrowClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUser = this.handleUser.bind(this);

    }


    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    arrowClick(event) {
        let integerCurrentPage = parseInt(this.state.currentPage)
        let clickedArrow = parseInt(event.target.id)
        let newCurrentPage = clickedArrow + integerCurrentPage
        if (newCurrentPage > (Math.ceil(this.state.todos.length / this.state.todosPerPage))) {
            newCurrentPage = parseInt(newCurrentPage - 1)
        } if (newCurrentPage < 1) {
            newCurrentPage = parseInt(newCurrentPage + 1)
        }
        this.setState({
            currentPage: newCurrentPage
        });
    }

    setData(e) {
        this.setState({
            todos: e,
            currentPage: 1
        })
    }

    handleUser(e) {
        let currentUser
        try {
            currentUser = JSON.parse(e.target.value)
        }
        catch {
            currentUser = null
        }

        this.setState(prevState => ({
            toggle: !prevState.toggle,
            currentUser: currentUser
        }));
    }

    render() {

        if (!this.state.todos) {
            return <Fragment></Fragment>
        } else {
            const { todos, currentPage, todosPerPage } = this.state;

            // Logic for displaying users
            this.indexOfLastTodo = currentPage * todosPerPage;
            this.indexOfFirstTodo = this.indexOfLastTodo - todosPerPage;
            this.currentTodos = todos.slice(this.indexOfFirstTodo, this.indexOfLastTodo);
            const renderTodos = this.currentTodos.map((todo, index) => {
                return (
                    <li key={index} className="index-item">
                        <p className="index-item-text">{todo.displayName}</p>
                        <p>{todo.uid}</p>
                        <div className="index-icon-div">
                            <button value={todo} name="changePassword"  >
                                <AiOutlineUnlock />
                            </button>
                            <button value={JSON.stringify(todo)} name="changeUser" onClick={this.handleUser} >
                                <AiOutlineForm />
                            </button>
                            <button value={todo} name="deleteUser" >
                                <AiOutlineClose />
                            </button>
                        </div>
                    </li>
                );
            });
            // Logic for displaying page numbers
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                return (
                    <button
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                        className={`index-btn ${(this.state.currentPage === number) ? "active" : "deactive"}`}
                    >
                        {number}
                    </button>
                );
            });

            if (renderTodos.length == 0) {
                return (
                    <Fragment>
                        <div className="page-index">
                                <li className="index-label">
                                    <p>NAME</p>
                                    <p>ID</p>
                                </li>
                                <li className="index-item">
                                    <p>NOTHING WAS FOUND</p>
                                </li>
                        </div>

                    </Fragment>
                );
            }
            return (
                <Fragment>
                    {this.state.toggle ? <ModifyUser action={this.handleUser} user={this.state.currentUser} /> : null}
                    <ul className="page-index">
                        <li className="index-label">
                            <p>NAME</p>
                            <p>ID</p>
                        </li>
                        {renderTodos}
                    </ul>
                    <div className="index-btn-area">
                        <button className="index-btn"
                            id="-1"
                            onClick={this.arrowClick}><AiOutlineLeft id="-1" />
                        </button>
                        {renderPageNumbers}
                        <button className="index-btn"
                            id="1"
                            onClick={this.arrowClick} ><AiOutlineRight id="1" />
                        </button>
                    </div>
                </Fragment>
            );
        }
    }
}
export default Pagination;
