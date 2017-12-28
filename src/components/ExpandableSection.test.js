import React from 'react';
import { shallow } from 'enzyme';
import ExpandableSection from './ExpandableSection';

describe('ExpandableSection Component', () => {
	const children = [
		<div key={1}>First</div>,
		<div key={2}>Second</div>
	];

	it('renders collapsed, by default (header only)', () => {
		const rendered = shallow(<ExpandableSection>{children}</ExpandableSection>);
		expect(rendered.children()).toHaveLength(1);

		const header = rendered.childAt(0);
		expect(header.type()).toBe('header');
		expect(header.children()).toHaveLength(1);

		const button = header.childAt(0);
		expect(button.text()).toBe('▶');
	});

	it('expands and collapses on button-click', () => {
		const rendered = shallow(<ExpandableSection>{children}</ExpandableSection>);
		let button = rendered.find('button');

		// Starting collapsed, we should only have a header...
		expect(rendered.children()).toHaveLength(1);
		expect(rendered.find('div')).toHaveLength(0);
		// ...and the button text should be the collapsed arrow
		button = rendered.find('button');
		expect(button.text()).toBe('▶');

		// Simulate a button-click, to expand the section
		button.simulate('click');

		// Section should be expanded now, with a header and all children...
		expect(rendered.children()).toHaveLength(3);
		expect(rendered.find('div')).toHaveLength(2);
		// ...and the button text should be the expanded arrow
		button = rendered.find('button');
		expect(rendered.find('button').text()).toBe('▼');

		// Simulate a button-click, to collapse the section
		button.simulate('click');

		// Section should be back to it's collapsed state...
		expect(rendered.children()).toHaveLength(1);
		expect(rendered.find('div')).toHaveLength(0);
		// ...and the button text should be the collapsed arrow
		button = rendered.find('button');
		expect(button.text()).toBe('▶');
	});
});
