import React, { Fragment } from 'react';
import { AiOutlineIdcard, AiOutlineMonitor, AiOutlineUserAdd, AiOutlineTags } from 'react-icons/ai';
import Card from '../Card';
import "../../assets/scss/dashboard.scss";

class Dashboard extends React.Component {

  render() {

    return (
      <Fragment>
        <div className="main-content">
          <Card value="/user/register">
            <AiOutlineUserAdd className="card-icon" />
            <p className="card-text">REGISTER USER</p>
          </Card>
          <Card value="/user/import">
            <AiOutlineIdcard className="card-icon" />
            <p className="card-text">IMPORT USERS</p>
          </Card>
          <Card value="/user/search">
            <AiOutlineMonitor className="card-icon" />
            <p className="card-text">SEARCH USERS</p>
          </Card>
          <Card value="/groups">
            <AiOutlineTags className="card-icon" />
            <p className="card-text">MANAGE PERMISSIONS</p>
          </Card>
        </div>
      </Fragment>
    );
  };

}
export default Dashboard;
