import React, { Fragment } from "react";
import { AiOutlineUnlock, AiOutlineUser, AiOutlineTeam, AiOutlineTag } from "react-icons/ai"
import "../../assets/scss/modifyUser.scss";
import CheckboxMultiSelect from "../CheckboxMultiSelect";

class modifyUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUid: null,
            currentUid: null,
            givenName: null,
            sn: null,
            displayName: null,


        }
        this.removeFromGroups = []
        this.addGroups = []
        this.delGroups = []
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitRequest = this.submitRequest.bind(this);

    }
    componentDidMount() {
        this.setState({
            newUid: this.props.user.uid,
            currentUid: this.props.user.uid,
            givenName: this.props.user.givenName,
            sn: this.props.user.sn,
            displayName: this.props.user.displayName,
        })
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    async submitRequest(e) {
        e.preventDefault()
        if (this.addGroups) {
            await this.setState({ addGroups: this.addGroups })
        }
        if (this.delGroups) {
            await this.setState({ delGroups: this.delGroups })
        }
        fetch('http://localhost:3001/api/user/modify', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
            })
            .catch((err) => console.log(err))
    }

    groupsToAdd = (selectedGroups) => {
        if(!this.addGroups.includes(selectedGroups)){
            this.addGroups.push(selectedGroups);
        }
    }
    groupsToDel = (selectedGroups) => {
        if(!this.delGroups.includes(selectedGroups)){
            this.delGroups.push(selectedGroups);
        }
    }
    render() {
        const user = this.props.user
        return (
            <Fragment>
                <form className="user-info" onSubmit={this.submitRequest}>
                    <h1>{user.displayName}</h1>
                    <div className="input-container">
                        <AiOutlineUser />
                        <label>ID</label>
                        <span />
                        <input type="text"
                            value={this.state.newUid}
                            name="newUid"
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="input-container">
                        <AiOutlineTag />
                        <label>NAME</label>
                        <span />
                        <input type="text"
                            value={this.state.givenName}
                            name="givenName"
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="input-container">
                        <AiOutlineTag />
                        <label>LAST NAME</label>
                        <span />
                        <input type="text"
                            value={this.state.sn}
                            name="sn"
                            onChange={this.handleInputChange} />
                    </div>

                    <div className="input-container">
                        <AiOutlineTag />
                        <label>DISPLAY NAME</label>
                        <span />
                        <input type="text"
                            value={this.state.displayName}
                            name="displayName"
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="input-container">
                        <AiOutlineTeam />
                        <label>Permissões</label>
                        <span />
                        <CheckboxMultiSelect
                            currentUser={user.uid}
                            groupsToDel={this.groupsToDel.bind(this)}
                            groupsToAdd={this.groupsToAdd.bind(this)} />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" >CHANGE</button>
                        <button>CANCEL</button>
                    </div>

                </form>
                <div className="backgroundOverlay" onClick={this.props.action} />
            </Fragment >
        );
    }

}
export default modifyUser;
