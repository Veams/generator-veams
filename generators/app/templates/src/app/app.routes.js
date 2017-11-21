import React from 'react';
import AppCore from './core';

const HomePage = [
	{
		component: () => <div>My Home Page!</div>,
		path: '/',
		exact: true
	}
];

const TestRoutes = [
	{
		component: () => <div>My Test Page!</div>,
		path: '/test'
	}
];

export default [
	{
		component: AppCore,
		routes: [].concat(
			HomePage,
			TestRoutes
		)
	}
];