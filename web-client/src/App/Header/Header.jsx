'use strict';

import React from 'react';
import 'css!./Header';

export default class Header extends React.Component {
	render () {
		return (
			<nav className="navbar navbar-default navbar-fixed-top b-layout__header">
				<div className="container">
					<div className="navbar-header">
						<button type="button" data-toggle="collapse" data-target="#b-header-nav__menu" className="navbar-toggle collapsed">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a href="/" className="navbar-brand">
							<img src="/images/logo.png" alt=""/>
						</a>
					</div>
					<div id="b-header-nav__menu" className="collapse b-header-nav__menu navbar-collapse">
						<ul className="nav navbar-nav navbar-left">
							<li><a href="/experiment">Archive</a></li>
							<li><a href="/experiment/new">New</a></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li><a href="/user/auth/login">Login</a></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
