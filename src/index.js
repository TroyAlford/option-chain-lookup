import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(
	<div>
		{/*<DevTools />*/}
		<App />
	</div>
, document.getElementById('root'));

registerServiceWorker();
