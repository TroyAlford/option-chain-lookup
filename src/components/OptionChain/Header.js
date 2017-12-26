import React from 'react'
import toCurrency from '../../utilities/toCurrency';

import './Header.scss';

export default ({ quote }) => {
  if (quote.symbol) {
    return (
		  <header className="option-chain">
			  <div className="security">{quote.shortName} ({quote.symbol})</div>
			  <div className="last-update">
				  <strong>Last Price:</strong> {toCurrency(quote.ask)}
				  <strong>Updated:</strong> {new Date(quote.regularMarketTime * 1000).toLocaleTimeString()}
			  </div>
		  </header>
	  )
  }
  return <header className="option-chain" />
}
