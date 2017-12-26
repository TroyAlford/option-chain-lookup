import toCurrency from './toCurrency';

describe('toCurrency', () => {
	it('adds the specified symbol, with $ as default', () => {
		expect(toCurrency(12345)).toEqual('$12,345.00');
		expect(toCurrency(12345, 2, '€')).toEqual('€12,345.00');
	});
	it('returns empty string when given non-number inputs', () => {
		expect(toCurrency()).toEqual('');
	});
});
