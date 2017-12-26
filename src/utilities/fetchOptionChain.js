const dateToEpochTime = (date) => Math.round(date).getTime() / 1000;

export default function(ticker, date) {
	let url = `http://localhost:8081/api/search/${ticker}`;
	if (date instanceof Date) {
		url = `${url}?date=${dateToEpochTime(date)}`;
	} else if (date) {
		url = `${url}?date=${date}`;
	}

	return fetch(url)
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((json) => {
			const { optionChain: { error, result } } = json;
			if (error) return { error };
			if (result.length === 0) return { error: 'No results found.' };

			const { expirationDates, options, quote, strikes } = result[0];
			return {
				calls: options[0].calls,
				expirationDate: options[0].expirationDate,
				expirationDates: expirationDates,
				puts: options[0].puts,
				quote,
				strikes,
				symbol: quote.symbol,
			}
		})
}
