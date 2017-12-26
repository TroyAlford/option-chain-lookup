import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import './ExpandableSection.scss';

@observer export default class ExpandableSection extends Component {
	@observable expanded = false;
	@action toggle = () => {
		this.expanded = !this.expanded;
	};

	render = () => (
		<section className="expandable-section">
			<header>
				{this.props.title}
				<button type="button" className="toggle" onClick={this.toggle}>
					{this.expanded ? '▼' : '▶' }

				</button>
			</header>
			{this.expanded && this.props.children}
		</section>
	);
}