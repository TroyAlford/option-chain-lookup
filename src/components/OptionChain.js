import React from 'react';
import { observer } from 'mobx-react';
import Header from './Header';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

import './OptionChain.scss';

export default observer(({ optionChain, filters }) => (
	<div className="option-chain">
		<Header quote={optionChain.quote} />
		<div className="panel-container">
			<div className="left-panel">
				<SearchBar
					symbol={optionChain.symbol}
					filters={filters}
					expirationDates={optionChain.expirationDates}
					search={optionChain.fetch}
					onFilterChange={filters.setFilters}
				/>
			</div>
			<div className="right-panel">
				<SearchResults
					calls={optionChain.calls}
					expirationDate={optionChain.expirationDate}
					filters={filters}
					puts={optionChain.puts}
					quote={optionChain.quote}
					strikes={optionChain.strikes}
				/>
			</div>
		</div>
	</div>
));
