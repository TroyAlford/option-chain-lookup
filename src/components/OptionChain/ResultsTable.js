import React, { Component } from 'react';
import { observer } from 'mobx-react';
import 'core-js/fn/array/find';
import formatNumber from '../../utilities/formatNumber';
import toCurrency from '../../utilities/toCurrency';

import './ResultsTable.scss';

@observer export default class ResultsTable extends Component {
	static defaultProps = {
		calls: [],
		puts: [],
		strikes: [],
		filters: {}
	};

	optionFilter = (strike, option) => {
		const { filters, quote } = this.props,
			strikeRange = Number.parseFloat(filters.strikeRange || 25);

		if (
			strike !== option.strike ||
			(filters.moneyness === 'in' && !option.inTheMoney) ||
			(filters.moneyness === 'out' && option.inTheMoney) ||
			(option.strike < (quote.ask - strikeRange)) ||
			(option.strike > (quote.ask + strikeRange))
		) {
			return undefined;
		}

		return option;
	};

	calculateRows = () => {
		const { calls, puts, strikes } = this.props;

		return strikes.map((strike) => {
			const filter = this.optionFilter.bind(null, strike),
				put = this.showPut ? puts.find(filter) : undefined,
				call = this.showCall ? calls.find(filter) : undefined;

			if (!put && !call) return undefined;
			return { call, put, strike };
		}).filter(Boolean)
	};

	renderOptionCells = (option, className) => {
		if (option) {
			return [
				<td key={1} className={className}>{toCurrency(option.bid)}</td>,
				<td key={2} className={className}>{toCurrency(option.ask)}</td>,
				<td key={3} className={className}>{toCurrency(option.lastPrice)}</td>,
				<td key={4} className={className}>{formatNumber(option.volume, 0)}</td>,
				<td key={5} className={className}>{formatNumber(option.openInterest, 0)}</td>
			];
		}
		return <td key={1} className="unavailable" colSpan={5}>&nbsp;</td>;
	};

	get showCall() {
		return ['*', 'call'].includes(this.props.filters.chainType || '*');
	}
	get showPut() {
		return ['*', 'put'].includes(this.props.filters.chainType || '*');
	}

	renderHeader = () => {
		const chainType = this.props.filters.chainType,
			showCall = ['*', 'call'].includes(chainType),
			showPut = ['*', 'put'].includes(chainType);

		return (
			<thead>
				<tr className="category-header">
					{showCall && <th colSpan={5}>Call</th>}
					<th rowSpan={2}>Strike Price/Date</th>
					{showPut && <th colSpan={5}>Put</th>}
				</tr>
				<tr>
					{showCall && [
						<th key={1}>Bid</th>,
						<th key={2}>Ask</th>,
						<th key={3}>Last</th>,
						<th key={4}>Trade Vol.</th>,
						<th key={5}>Open Int.</th>
					]}
					{showPut && [
						<th key={1}>Bid</th>,
						<th key={2}>Ask</th>,
						<th key={3}>Last</th>,
						<th key={4}>Trade Vol.</th>,
						<th key={5}>Open Int.</th>
					]}
				</tr>
			</thead>
		);
	};

	renderRow = (row) => {
		const cells = [],
			classNames = [],
			expirationDate = (new Date(this.props.expirationDate * 1000)).toLocaleDateString();

		if (this.showCall) cells.push(this.renderOptionCells(row.call, 'call'));
		cells.push(
			<td className="strike" key="strike">{toCurrency(row.strike, 0)} / {expirationDate}</td>
		);
		if (this.showPut) cells.push(this.renderOptionCells(row.put, 'put'));

		classNames.push(row.call && row.call.inTheMoney ? 'highlight-call' : '');
		classNames.push(row.put && row.put.inTheMoney ? 'highlight-put' : '');

		return (
			<tr key={row.strike} className={classNames.join(' ')}>
				{cells}
			</tr>
		)
	};

	render = () => (
		<div className="results-table">
			<header>Search Results</header>
			<table cellSpacing={0}>
				{this.renderHeader()}
				<tbody>
					{this.calculateRows().map(this.renderRow)}
				</tbody>
			</table>
		</div>
	)
}