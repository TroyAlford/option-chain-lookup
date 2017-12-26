export default (number, decimals = 2) => {
	if (typeof number !== 'number') return '';
	let [before, after] = number.toFixed(decimals).split('.');

	before = before.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	return decimals >= 1 ? `${before}.${after}` : before;
}
