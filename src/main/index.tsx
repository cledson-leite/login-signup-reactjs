import React from 'react'
import ReactDom from 'react-dom'

import Router from '@components/router/router'
import { makeLogin } from '@factories/pages/login/loginFactory'

ReactDom.render(
  <Router
    makeLogin={makeLogin}
  />,
  document.querySelector('#main')
)
