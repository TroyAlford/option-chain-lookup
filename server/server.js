import cors from 'cors';
import express from 'express'
import fs from 'fs-extra'
import path from 'path'

const searchAPI = express()
	.get('/:ticker', (request, response) => {
		const {ticker} = request.params,
			{ date } = request.query,
			fileName = date ? `${ticker}-${date}.json` : `${ticker}.json`,
			filePath = path.resolve(__dirname, 'data', fileName);

		response.setHeader('Content-Type', 'application/json');

		if (!fs.pathExistsSync(filePath))
			response.status(404).send(JSON.stringify({}));

		const jsonContents = fs.readJsonSync(filePath);
		response.status(200).send(JSON.stringify(jsonContents));
	})
;

const PORT = 8081;

express()
	.use(cors())
	.use('/api/search', searchAPI)
	.listen(8081, () => {
		console.log(`STARTUP: Express server running on port ${PORT}`)
	})
;