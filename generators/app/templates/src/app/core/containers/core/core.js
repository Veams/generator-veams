import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Layout from '../../layouts/layout';

class AppCore extends Component {
	routes = this.props.route.routes;

	render() {
		return (
			<div className="page-wrapper">
				<Layout>{renderRoutes(this.routes)}</Layout>
			</div>
		);
	}
}

export default AppCore;
