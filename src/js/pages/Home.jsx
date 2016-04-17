import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'; // Use hash history and disable auto generated "?" url parameter
const History = createHashHistory({queryKey: false});

import Albums from './albums/Albums';
import { Navbar } from '../components';


/**
 * Homepage
 */
class Home extends React.Component {
    constructor() {
        super();
    }
    render = () => (
        <div id="page-wrapper">
            <Navbar/>
            {this.props.children}
        </div>
    );

};

/**
 * Routes with react-router
 */
class HomeRouter extends React.Component {
    render = () => (
        <Router history={History}>
            <Route path="/" component={Home}>
                <IndexRoute component={Albums}/>
            </Route>
        </Router>
    );
};

export { HomeRouter };
