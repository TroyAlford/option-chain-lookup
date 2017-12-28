import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header Component', () => {
	const todayAt5pm = new Date();
	todayAt5pm.setHours(5, 0, 0, 0);

	const
		time = (todayAt5pm).getTime() / 1000,
		quote = {
			symbol: 'AAPL',
			shortName: 'Apple, Inc.',
			ask: 12345,
			regularMarketTime: time
		}
	;

	it('renders internals only with a valid quote', () => {
		const
			noQuote = shallow(<Header />),
			badQuote = shallow(<Header quote={{}} />),
			goodQuote = shallow(<Header quote={quote} />)
		;

		expect(noQuote.children()).toHaveLength(0);
		expect(badQuote.children()).toHaveLength(0);
		expect(goodQuote.children()).toHaveLength(2);
	});

	it('renders quote properties', () => {
		const
			rendered = shallow(<Header quote={quote} />),
			text = rendered.text()
		;

		expect(text).toBe(
			'Apple, Inc. (AAPL)' +
			'Last Price: $12,345.00' +
			'Updated: 05:00:00'
		);
	});
});
