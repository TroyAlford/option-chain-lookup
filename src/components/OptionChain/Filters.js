import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ExpandableSection from '../ExpandableSection';

import './Filters.scss';

@observer
export default class SearchBar extends Component {
	static defaultProps = {
		expirationDates: [],
		filters: {},
		onFilterChange: () => {}
	};

  handleChange = (event) => {
    let { checked, name, type, value } = event.target,
	    filterValue = type === 'checkbox' ? checked : value;

    this.props.onFilterChange({ [name]: filterValue });
  };

	handleTickerChange = (event) => {
		const ticker = event.target.value;
		this.props.search(ticker);
	};

	handleExpirationChange = (event) => {
		const ticker = this.props.symbol,
			expirationDate = event.target.value;
		this.props.onFilterChange({ expirationDate })
		this.props.search(ticker, expirationDate);
	};

	render() {
		const { filters } = this.props;

		return (
			<div className="search-bar">
				<header>Search</header>
				<label>
					Underlying Symbol
					<input
						type="text" name="symbol"
						value={this.props.symbol}
						onChange={this.handleTickerChange}
					/>
				</label>

				<ExpandableSection title="Search Filters">
					<label>
						Chain Type
						<select name="chainType" onChange={this.handleChange} value={filters.chainType}>
							<option value="*">All</option>
							<option value="call">Call</option>
							<option value="put">Put</option>
						</select>
					</label>
					<label>
						Strike Range
						<input
							type="number" name="strikeRange"
							onChange={this.handleChange}
							min={0}
							value={filters.strikeRange}
						/>
					</label>
					<label>
						Moneyness
						<select name="moneyness" onChange={this.handleChange} value={filters.moneyness}>
							<option value="*">All</option>
							<option value="in">In the Money</option>
							<option value="out">Out of the Money</option>
						</select>
					</label>
					<label>
						Expiration
						<select name="expirationDate" onChange={this.handleExpirationChange} value={filters.expirationDate}>
							{this.props.expirationDates.map((secondsSinceEpoch) => {
								const date = new Date(secondsSinceEpoch * 1000),
									rendered = date.toLocaleDateString();

								return <option key={secondsSinceEpoch} value={secondsSinceEpoch}>{rendered}</option>
							})}
						</select>
					</label>
				</ExpandableSection>

				<ExpandableSection title="Advanced Filters">
					<label>
						Expiration Type
						<select name="expirationType" onChange={this.handleChange} value={filters.expirationType}>
							<option value="*">All</option>
							<option value="monthly">Monthly</option>
							<option value="weekly">Weekly</option>
							<option value="daily">Daily</option>
						</select>
					</label>
					<label>
						Adjusted Contracts<br/>
						<input
							type="checkbox"
						  name="includeAdjustedContracts"
							onChange={this.handleChange}
							checked={filters.includeAdjustedContracts}
						/> <span>Include</span>
					</label>
				</ExpandableSection>
			</div>
		)
	}
}
