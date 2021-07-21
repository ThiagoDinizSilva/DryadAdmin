import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './components/Navbar';
import Err404 from './components/Err404';
import Dashboard from './components/Dashboard';
import UserRegister from "./components/UserRegister";
import UserImport from "./components/UserImport";
import UserSearch from "./components/UserSearch";
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route>
                    <Navbar />
                </Route>
                <Switch>
                    <Route path='/home' component={Dashboard} />
                    <Route exact path="/user/register" component={UserRegister} />
                    <Route exact path="/user/import" component={UserImport} />
                    <Route exact path="/user/search" component={UserSearch} />
                    <Redirect exact from="/" to="home" />
                    <Route path='/404' component={Err404} />
                    <Redirect to="/404" />
                </Switch>
            </BrowserRouter>
        );
    };

}
export default App;
