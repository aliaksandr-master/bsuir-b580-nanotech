'use strict';

import React from 'react';
import ReactRouter from 'react-router';

import NotFound from './App/pages/NotFound/NotFound';
import Experiment from './App/pages/Experiment/Experiment';

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

export default (App) => {
	return (
		<Route name="app" handler={App} path="/">
			<Route name="experiment" path="/experiment" handler={Experiment}/>
			<Route name="create-experiment" path="/experiment/new" handler={Experiment} />
			<DefaultRoute handler={NotFound}/>
		</Route>
	);
};
