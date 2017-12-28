import React from 'react';
import { shallow } from 'enzyme';
import Filters from './Filters';
import ExpandableSection from '../ExpandableSection';

describe('Filters Component', () => {
	it('renders all necessary sections', () => {
		const rendered = shallow(<Filters />);

		expect(rendered.children()).toHaveLength(4);
		expect(rendered.childAt(0).type()).toBe('header');
		expect(rendered.childAt(1).type()).toBe('label');
		expect(rendered.childAt(2).type()).toBe(ExpandableSection);
		expect(rendered.childAt(3).type()).toBe(ExpandableSection);
	});

	it('correctly binds & propagates changes to symbol', () => {
		const
			searchFn = jest.fn(),
			rendered = shallow(<Filters symbol='AAPL' search={searchFn} />),
			input = rendered.find('input[name="symbol"]')
		;

		expect(input.exists());
		expect(input.props().value).toBe('AAPL');

		input.simulate('change', { target: { value: 'MSFT' } });
		expect(searchFn).toHaveBeenCalledTimes(1);
		expect(searchFn).toHaveBeenCalledWith('MSFT');
	});

	it('correctly binds & propagates changes to expirationDate', () => {
		const
			searchFn = jest.fn(),
			rendered = shallow(
				<Filters
					filters={{ expirationDate: 100 }}
					search={searchFn}
					symbol={'AAPL'}
				/>
			),
			input = rendered.find('select[name="expirationDate"]')
		;

		expect(input.exists());
		expect(input.props().value).toBe(100);

		input.simulate('change', { target: { value: 200 } });
		expect(searchFn).toHaveBeenCalledTimes(1);
		expect(searchFn).toHaveBeenCalledWith('AAPL', 200);
	});

	it('correctly binds & propagates changes to filters', () => {
		const filters = {
			chainType: { from: 'in', to: 'out' },
			strikeRange: { from: 25, to: 50 },
		};
		Object.keys(filters).forEach((filter) => {
			const
				filterFn = jest.fn(),
				from = filters[filter].from,
				to = filters[filter].to,
				filterProps = { filters: { [filter]: from } },
				rendered = shallow(<Filters {...filterProps} onFilterChange={filterFn} />),
				element = rendered.find(`[name="${filter}"]`)
			;

			expect(element.exists());
			console.log(filter)
			expect(element.props().value).toBe(from);

			element.simulate('change', { target: {
				name: filter, value: to }
			});
			expect(filterFn).toHaveBeenCalledTimes(1);
			expect(filterFn).toHaveBeenCalledWith({
				[filter]: to
			});
		});
	});
});
