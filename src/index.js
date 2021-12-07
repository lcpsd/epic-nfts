import React from 'react';
import ReactDOM from 'react-dom';
import {toast} from 'react-toastify'
import App from './App';

toast.configure();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

