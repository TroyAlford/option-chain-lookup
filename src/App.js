import React, { Component } from 'react';
import OptionChainModel from './models/OptionChainModel';
import OptionChainFiltersModel from './models/OptionChainFiltersModel';
import OptionChain from './components/OptionChain';

import './App.scss';

const optionChain = new OptionChainModel();
const filters = new OptionChainFiltersModel();

export default class App extends Component {
  render = () => (
    <div className="App">
      <OptionChain optionChain={optionChain} filters={filters} />
    </div>
  )
}
