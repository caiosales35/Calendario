import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Event from './pages/Event';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? 
            <Component {...props} /> 
            : 
            <Redirect to={{pathname: "/", state: { from: props.location } }} />
    )} />
);

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/event/new" component={Event} />
                <PrivateRoute path="/event/edit/:id" component={Event} />
            </Switch>
        </BrowserRouter>
    )
}