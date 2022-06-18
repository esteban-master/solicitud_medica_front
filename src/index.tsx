import '@fontsource/jost/300.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/jost/700.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

const theme = createTheme({
  typography: {
    fontFamily: 'Jost',
    h1: {
      fontWeight: 'bold',
      fontSize: '2em'
    },
    h4: {
      fontWeight: 'bold',
      fontSize: '1em'
    },
    h2: {
      fontWeight: 'bold',
      fontSize: '1.5em',
      color: '#004E9C'
    },
  }
})


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
