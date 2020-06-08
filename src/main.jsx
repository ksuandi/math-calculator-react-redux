import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as mathjs from "mathjs";




import store from './store'
import './styles/index.css'
import App from './App'

globalThis.compile = mathjs.compile

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
