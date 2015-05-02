'use strict';

import React from 'react';
import ReactRouter from 'react-router';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Content from './Body/Body';
import NotFound from './Body/NotFound/NotFound';
import Experiment from './Body/Experiment/Experiment';
import 'css!./App';

var Link = ReactRouter.Link;
var RouteHandler = ReactRouter.RouteHandler;

export default class App extends React.Component {
	render () {
		return (
			<div className="wrapper">
				<Header/>
				{}
				<RouteHandler/>
				<Footer/>
			</div>
		);
	}
}

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var routes = (
	<Route name="app" handler={App} path="/">
		<Route name="experiment" path="/experiment" handler={Experiment}/>
		<Route name="create-experiment" path="/experiment/new" handler={Experiment} />
		<DefaultRoute handler={NotFound}/>
	</Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, (Handler) => {
	React.render(<Handler/>, window.document.body);
	console.log(window.location.href, 'rendered at', new Date());
});
