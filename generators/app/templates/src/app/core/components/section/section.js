import React from 'react';

export default function Section({ headline, children }) {
	return (
		<section className="c-section">
			<div className="section__container is-container">
				<header className="section__header">
					<h2 className="section__headline">
						{headline}
					</h2>
				</header>

				<div className="section__content">
					{children}
				</div>
			</div>
		</section>
	)
}