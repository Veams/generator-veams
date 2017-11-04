import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

class AppCore extends Component {
	routes = this.props.route.routes;

	render() {
		return (
			<div>
				<h1>App successfully started and created with Veams!</h1>
				<div className="main">
					{renderRoutes(this.routes)}
				</div>
			</div>
		)
	}
}

export default AppCore;