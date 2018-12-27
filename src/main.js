import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './index';

// Import Store
import store from './store/store';

// Global Style CSS
import './styles/styles.scss';

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
document.getElementById('root'));