import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, IndexRoute, Switch } from 'react-router';
import App from './App';
import List from './List';
import Details from './Details';
import NotFound from './NotFound';


const history = new createHistory();
ReactDOM.render(
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={List} />
                <Route path="/Details/:id" component={Details} />
                <Route component={NotFound} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('app')
);
