'use strict';

import React from 'react';
import ReactRouter from 'react-router';
import Header from './regions/Header/Header';
import Footer from './regions/Footer/Footer';
import Content from './regions/Body/Body';
import 'css!./App';
import routes from '../routes';

var Link = ReactRouter.Link;
var RouteHandler = ReactRouter.RouteHandler;

let App = React.createClass({
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
});

export default App;

ReactRouter.run(routes(App), ReactRouter.HistoryLocation, (Handler) => {
	React.render(<Handler/>, window.document.body);
	console.log(window.location.href, 'rendered at', new Date());
});
