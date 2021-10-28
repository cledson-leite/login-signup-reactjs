import React from 'react'

import Login from '@pages/login/login'
import { RemoteAuthentication } from '@repositories/remoteAuthentication/RemoteAuthentication'
import { AxiosClient } from '@service/Axios/AxiosClient'
import { makeLoginValidation } from './loginValidationFactory'

export const makeLogin: React.FC = () => {
  const remoteAuthentication = new RemoteAuthentication(
    'http://fordevs.herokuapp.com/api/login',
    new AxiosClient()
  )
  return (
    <Login
      authentication={remoteAuthentication}
      validation={makeLoginValidation()}
    />
  )
}
