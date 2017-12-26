import { observable } from 'mobx';

export default class QuoteModel {
	@observable ask = 0;
	@observable askSize = 0;
	@observable averageDailyVolume10Day = 0;
	@observable averageDailyVolume3Month = 0;
	@observable bid = 0;
	@observable bidSize = 0;
	@observable bookValue = 0;
	@observable currency = '';
	@observable dividendDate = 0;
	@observable earningsTimestamp = 0;
	@observable earningsTimestampEnd = 0;
	@observable earningsTimestampStart = 0;
	@observable epsForward = 0;
	@observable epsTrailingTwelveMonths = 0;
	@observable exchange = '';
	@observable exchangeDataDelayedBy = 0;
	@observable exchangeTimezoneName = '';
	@observable exchangeTimezoneShortName = '';
	@observable fiftyDayAverage = 0;
	@observable fiftyDayAverageChange = 0;
	@observable fiftyDayAverageChangePercent = 0;
	@observable fiftyTwoWeekHigh = 0;
	@observable fiftyTwoWeekHighChange = -0;
	@observable fiftyTwoWeekHighChangePercent = -0;
	@observable fiftyTwoWeekLow = 0;
	@observable fiftyTwoWeekLowChange = 0;
	@observable fiftyTwoWeekLowChangePercent = 0;
	@observable financialCurrency = '';
	@observable forwardPE = 0;
	@observable fullExchangeName = '';
	@observable gmtOffSetMilliseconds = 0;
	@observable language = "en-US"
	@observable longName = '';
	@observable market = '';
	@observable marketCap = 0;
	@observable marketState = '';
	@observable messageBoardId = '';
	@observable priceHint = 0;
	@observable priceToBook = 0;
	@observable quoteSourceName = '';
	@observable quoteType = '';
	@observable regularMarketChange = 0;
	@observable regularMarketChangePercent = 0;
	@observable regularMarketDayHigh = 0;
	@observable regularMarketDayLow = 0;
	@observable regularMarketOpen = 0;
	@observable regularMarketPreviousClose = 0;
	@observable regularMarketPrice = 0;
	@observable regularMarketTime = 0;
	@observable regularMarketVolume = 0;
	@observable sharesOutstanding = 0;
	@observable shortName = '';
	@observable sourceInterval = 0;
	@observable symbol = '';
	@observable tradeable = true;
	@observable trailingAnnualDividendRate = 0;
	@observable trailingAnnualDividendYield = 0;
	@observable trailingPE = 0;
	@observable twoHundredDayAverage = 0;
	@observable twoHundredDayAverageChange = 0;
	@observable twoHundredDayAverageChangePercent = 0;
}