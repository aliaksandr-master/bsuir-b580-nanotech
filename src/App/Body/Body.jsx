'use strict';

import React from 'react';
import 'css!./Body';

export default class Footer extends React.Component {
	render () {
		return (
			<div className="b-layout__body-wr clearfix">
				<div className="container b-layout__body">
					<div className="row clearfix">
						<div className="col-sm-60 b-layout__main text-center">
							<br />
							<br />
							<br />
							<a href="/experiment/new" className="btn btn-xl btn-rounded btn-success">
								<b>Create an experiment</b>
							</a>
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
