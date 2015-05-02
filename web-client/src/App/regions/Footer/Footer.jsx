'use strict';

import React from 'react';
import 'css!./Footer';

export default class Footer extends React.Component {
	render () {
		return (
			<div className="b-layout__footer">
				<nav className="b-footer__nav">
					<ul className="b-footer-nav nav nav-pills">
						<li className="b-footer-nav__li"><a href="/about-us" className="b-footer-nav__link">About</a></li>
						<li className="b-footer-nav__li"><a href="/help" className="b-footer-nav__link">Help?</a></li>
					</ul>
				</nav>
				<br />
				<p className="b-footer__copy">© 2015 BSUIR, experiment</p>
			</div>
		);
	}
}
