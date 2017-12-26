import formatNumber from './formatNumber';

describe('formatNumber', () => {
	it('correctly formats numbers with defaults', () => {
		expect(formatNumber(12345.12345)).toEqual('12,345.12');
		expect(formatNumber(12345.)).toEqual('12,345.00');
		expect(formatNumber(123456789)).toEqual('123,456,789.00');
		expect(formatNumber(-1)).toEqual('-1.00');
	});
	it('correctly formats numbers with 0 decimal length', () => {
		expect(formatNumber(12345.12345, 0)).toEqual('12,345');
	});
	it('rounds up correctly when appropriate', () => {
		expect(formatNumber(12345.6789)).toEqual('12,345.68');
		expect(formatNumber(12345.6789, 0)).toEqual('12,346');
	});
	it('returns empty string when given an invalid number', () => {
		expect(formatNumber()).toEqual('');
		expect(formatNumber({})).toEqual('');
		expect(formatNumber(null)).toEqual('');
	});
});
