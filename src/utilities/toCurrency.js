import formatNumber from './formatNumber';

export default (number, decimals = 2, symbol = '$') => {
	if (isNaN(number)) return '';
	return `${symbol}${formatNumber(number, decimals)}`
}
