/**
 * Represents the routes config object.
 * For demo purpose we have some routes pre-defined,
 * but you should keep them in its own file like in a feature/module.
 *
 * @module Routes
 */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import AppCore from './core';

/**
 * A simple home page route.
 */
const HomePage = [
	{
		component: () => <h3>My Home Page</h3>,
		path: '/',
		exact: true
	}
];

/**
 * Demo case to show nested routes.
 * Therefore we use react-router-config to render the routes which are provided in props.
 */
const TestRoutes = [
	{
		component: ({ route }) => {
			return (
				<div>
					<h3>My Test Page</h3>
					<ul>
						<li>
							<Link to="/test/subpage">Sub Page</Link>
						</li>
					</ul>
					<div className="sub-routes">{renderRoutes(route.routes)}</div>
				</div>
			);
		},
		path: '/test',
		routes: [
			{
				path: '/test/subpage',
				component: () => {
					return (
						<div className="sub-page">
							<h4>My Sub Page</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
						</div>
					);
				}
			}
		]
	}
];

/**
 * Bring all routes together
 */
export default [
	{
		component: AppCore,
		routes: [].concat(HomePage, TestRoutes)
	}
];
