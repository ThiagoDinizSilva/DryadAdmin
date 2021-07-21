import React, { Component, Fragment } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import "../../assets/scss/checkboxMultiSelect.scss";
export default class CheckboxMultiSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: [{}],
            currentGroups: [],
        }
        this.show = true
        this.addGroups = this.addGroups.bind(this)
        this.delGroups = this.delGroups.bind(this)

        this.listGroupsUser = this.listGroupsUser.bind(this)

    }
    componentDidMount() {
        this.listGroupsUser()

    }
    addGroups(e) {
        e.preventDefault();
        let groups = this.state.currentGroups
        let newGroup = e.target.name
        if (groups.includes(newGroup)) {
            alert('User already has this permission!')
        } else {
            groups.push(newGroup)
            this.setState({ currentGroups: groups })
            this.props.groupsToAdd(e.target.name)
        }
    }
    delGroups(e) {
        let groups = this.state.currentGroups
        groups = groups.filter((element) => element !== e.target.name);
        this.setState({ currentGroups: groups })
        this.props.groupsToDel(e.target.name)
    }

    showCheckboxes() {
        var checkboxes = document.getElementById("checkBoxes");
        if (this.show) {
            checkboxes.style.display = "block";
            this.getAllGroups();

            this.show = false;
        } else {
            checkboxes.style.display = "none";
            this.show = true;
        }
    }
    listGroupsUser() {
        fetch('http://localhost:3001/api/group/searchMyGroups', {
            method: 'POST',
            body: JSON.stringify({ uid: this.props.currentUser }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({ currentGroups: response })
            })
            .catch((err) => console.log(err))
    }
    getAllGroups() {
        fetch('http://localhost:3001/api/group/search', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({ groups: response })

            })
            .catch((err) => console.log(err))
    }
    render() {
        let renderGroups = this.state.groups.map((item, index) => {
            return (
                <Fragment>
                    <button name={item.cn}
                        key={index}
                        onClick={this.addGroups}
                    >
                        {item.cn}
                    </button >
                </Fragment>
            );
        });
        let renderlistGroupsUser = this.state.currentGroups.map((item, index) => {
            return (
                <div className="selectedGroup" key={index} >
                    <button type="button"
                        name={item}
                        onClick={this.delGroups}>
                        <p>{item}</p>
                        <AiOutlineClose />
                    </button>
                </div>
            );
        })
        return (
            <Fragment>
                <div className="hidden-select"
                    onClick={() => this.showCheckboxes()}>
                    {renderlistGroupsUser}
                </div>
                <div id="checkBoxes">
                    {renderGroups}
                </div>
            </Fragment>
        )
    }
}