import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Custom Components
 */
import Section from '../components/section/section';

/**
 * General Layout
 */
export default class Layout extends Component {
	render() {
		return (
			<Fragment>
				<header className='r-header'>
					<div className='header__container is-container'>
						<h2 className='header__headline'>
							HEADER
						</h2>
					</div>
				</header>
				<main className='r-main'>
					<div className='main__container'>
						<Section headline='App successfully started and created with Veams!'>
							{this.props.children}
						</Section>

						<nav>
							<ul>
								<li>
									<Link to='/'>Home Route</Link>
								</li>
								<li>
									<Link to='/test'>Test Route</Link>
								</li>
							</ul>
						</nav>
					</div>
				</main>
				<footer className='r-footer'>
					<div className='footer__container is-container'>
						<h2 className='footer__headline'>
							FOOTER
						</h2>
					</div>
				</footer>
			</Fragment>
		)
	}
}