import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import {store} from './store';
import {Provider} from 'react-redux';
import {QueryClientProvider, QueryClient} from 'react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <Root />
     </React.StrictMode>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
