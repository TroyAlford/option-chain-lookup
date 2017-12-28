import React from 'react';
import { shallow } from 'enzyme';
import ResultsTable from './ResultsTable';

describe('ResultsTable Component', () => {
	function option(strike = 1.0, ask = 5.0, inTheMoney = true) {
		return {
			ask,
			inTheMoney,
			lastPrice: ask,
			openInterest: 1000,
			strike,
			volume: 200
		}
	}

	const props = {
		quote: {ask: 5},
		calls: [option(1, 5, false), option(2, 5, true)],
		puts: [option(2, 5, true), option(3, 5, false)],
		strikes: [1, 2, 3]
	};

	it('renders only headers with no results', () => {
		const
			wrapper = shallow(<ResultsTable />),
			table = wrapper.find('table'),
			thead = table.find('thead'),
			tbody = table.find('tbody')
		;

		expect(wrapper.children()).toHaveLength(2);
		expect(table.children()).toHaveLength(2);
		expect(thead.children()).toHaveLength(2);
		expect(tbody.children()).toHaveLength(0);
	});

	it('renders the correct number of rows, based on strikePrices', () => {
		const wrapper = shallow(<ResultsTable {...props} filters={{ chainType: '*' }} />);

		// No strike prices should render no rows
		wrapper.setProps({ ...props, strikes: [] });
		expect(wrapper.find('tbody').children()).toHaveLength(0);

		// All strikes exist, so we expect 3 rows
		wrapper.setProps({ ...props, strikes: [1, 2, 3] });
		expect(wrapper.find('tbody').children()).toHaveLength(3);

		// No strike prices have matching options, so expect 0 rows
		wrapper.setProps({ ...props, strikes: [4, 5, 6] });
		expect(wrapper.find('tbody').children()).toHaveLength(0);
	});

	it('filters rendering based on filters.chainType', () => {
		const wrapper = shallow(<ResultsTable {...props} />);

		// allow all chainTypes, and validate header / rows
		wrapper.setProps({ ...props, filters: { chainType: '*' } });
		let headerRow = wrapper.find('thead').find('tr').at(1);
		let rows = wrapper.find('tbody').find('tr');

		expect(headerRow.children()).toHaveLength(10);
		expect(rows).toHaveLength(3);
		expect(rows.at(0).children()).toHaveLength(7); // Strike = 1 - call only
		expect(rows.at(1).children()).toHaveLength(11); // Strike = 2 - put & call
		expect(rows.at(2).children()).toHaveLength(7); // Strike = 3 - put only

		// allow only puts, and validate header / rows
		wrapper.setProps({ ...props, filters: { chainType: 'put', strikeRange: 25 }});
		headerRow = wrapper.find('thead').find('tr').at(1);
		rows = wrapper.find('tbody').find('tr');

		expect(headerRow.children()).toHaveLength(5);
		expect(rows).toHaveLength(2);
		expect(rows.at(0).children()).toHaveLength(6); // Strike = 2
		expect(rows.at(1).children()).toHaveLength(6); // Strike = 3

		// allow only calls, and validate header / rows
		wrapper.setProps({ ...props, filters: { chainType: 'call', strikeRange: 25 }});
		headerRow = wrapper.find('thead').find('tr').at(1);
		rows = wrapper.find('tbody').find('tr');

		expect(headerRow.children()).toHaveLength(5);
		expect(rows).toHaveLength(2);
		expect(rows.at(0).children()).toHaveLength(6); // Strike = 1
		expect(rows.at(1).children()).toHaveLength(6); // Strike = 2
	});

	it('filters rendering based on filters.moneyness', () => {
		const wrapper = shallow(<ResultsTable {...props} />);
		let rows = wrapper.find('tbody').find('tr');

		// No moneyness filter is set - so all rows should appear
		expect(rows).toHaveLength(3);

		// Set filter to show only in the money options.
		wrapper.setProps({ ...props, filters: { moneyness: 'in' } });
		rows = wrapper.find('tbody').find('tr');

		expect(rows).toHaveLength(1);

		// Set filter to show only out of the money options.
		wrapper.setProps({ ...props, filters: { moneyness: 'out' } });
		rows = wrapper.find('tbody').find('tr');

		expect(rows).toHaveLength(2);
	});

	it('filters rendering based on filters.strikeRange', () => {
		const wrapper = shallow(<ResultsTable {...props} />);
		let rows = wrapper.find('tbody').find('tr');

		// No strikeRange filter is set - and all rows are within default range (25).
		expect(rows).toHaveLength(3);

		// Set quote and strikeRange to only show options in 0-2 range.
		wrapper.setProps({ ...props, quote: { ask: 1 }, filters: { strikeRange: 1 }});
		rows = wrapper.find('tbody').find('tr');

		expect(rows).toHaveLength(2);
	});
});
