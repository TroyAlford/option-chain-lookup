import { action, observable } from 'mobx';

export default class OptionChainFiltersModel {
	@observable chainType = 'call';
	@observable expirationDate = '';
	@observable expirationType = '*';
	@observable includeAdjustedContracts = false;
	@observable moneyness = '*';
	@observable strikeRange = 25;

	@action setFilters = (filters = {}) => {
		Object.keys(filters).forEach((key) => {
			this[key] = filters[key];
		});
	}
}