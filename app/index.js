import React from 'react'
import {render} from 'react-dom'

import App from './components/app'

import mainCss from './css/main.css'


render(
  <App />,
  document.querySelector('#app')
)