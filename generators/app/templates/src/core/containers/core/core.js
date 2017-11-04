import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

class AppCore extends Component {
	routes = this.props.route.routes;

	render() {
		return (
			<div>
				<h1>App successfully started and created with Veams!</h1>
				<nav>
					<ul>
						<li>
							<Link to="/">Home Route</Link>
						</li>
						<li>
							<Link to="/test">Test Route</Link>
						</li>
					</ul>
				</nav>
				<div className="main">
					{renderRoutes(this.routes)}
				</div>
			</div>
		)
	}
}

export default AppCore;