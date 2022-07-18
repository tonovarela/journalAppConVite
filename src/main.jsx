import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { JournalApp } from './JournalApp'
import { store } from './store'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <JournalApp></JournalApp>        
    </Provider>    
  </React.StrictMode>
)
