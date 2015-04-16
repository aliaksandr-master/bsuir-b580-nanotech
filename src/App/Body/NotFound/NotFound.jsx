'use strict';

import React from 'react';
import 'css!./NotFound';

export default class NotFound extends React.Component {
	render () {
		return (
			<div className="b-layout__body-wr clearfix">
				<div className="container b-layout__body">
					<div className="row clearfix">
						<div className="col-sm-60 b-layout__main text-center">
							<br />
							<br />
							<br />
							<h1>Not Found</h1>
							<br />
							<br />
							<br />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
