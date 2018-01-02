import cors from 'cors';
import express from 'express'
import fs from 'fs-extra'
import path from 'path'

const AllowAllOrigins = (request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
};

const searchAPI = express()
	.get('/:ticker', (request, response) => {
		const {ticker} = request.params,
			{ date } = request.query,
			fileName = date ? `${ticker}-${date}.json` : `${ticker}.json`,
			filePath = path.resolve(__dirname, 'data', fileName);

		response.setHeader('Content-Type', 'application/json');

		if (!fs.pathExistsSync(filePath))
			return response.status(404).send(JSON.stringify({}));

		const jsonContents = fs.readJsonSync(filePath);
		response.status(200).send(JSON.stringify(jsonContents));
	})
;

const PORT = 8081;

express()
	.use(cors())
	.use(AllowAllOrigins)
	.use('/api/search', searchAPI)
	.listen(8081, () => {
		console.log(`STARTUP: Express server running on port ${PORT}`)
	})
;