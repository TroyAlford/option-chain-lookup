import { action, extendObservable, observable } from 'mobx';
import QuoteModel from './QuoteModel';
import fetchOptionChain from '../utilities/fetchOptionChain';

export default class OptionChainStore {
	@observable calls = [];
	@observable expirationDate = '';
	@observable expirationDates = [];
	@observable puts = [];
	@observable quote = {};
	@observable strikes = [];
	@observable symbol = '';

	constructor() {
		this.reset();
	}

	@action fetch = (symbol, date) => {
		this.symbol = symbol;

		return fetchOptionChain(symbol, date)
			.then((chain) => {
				this.calls = chain.calls;
				this.expirationDate = chain.expirationDate;
				this.expirationDates = chain.expirationDates;
				this.puts = chain.puts;
				extendObservable(this.quote, chain.quote);
				this.strikes = chain.strikes;
				this.symbol = chain.symbol;
			})
			.catch(() => {
				this.calls = [];
				this.expirationDate = new Date();
				this.expirationDates = [];
				this.puts = [];
				this.quote = new QuoteModel();
				this.strikes = [];
			});
	};

	@action reset = () => {
		this.calls = [];
		this.expirationDates = [];
		this.puts = [];
		this.quote = {};
		this.strikes = [];
		this.symbol = '';
	}
}