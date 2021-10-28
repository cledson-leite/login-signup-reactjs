import Login from '@pages/login/login'
import { RemoteAuthentication } from '@repositories/remoteAuthentication/RemoteAuthentication'
import { AxiosClient } from '@service/Axios/AxiosClient'
import { ValidationComposite } from
  '../../../../presentation/validators/validationComposite/Composite'
import React from 'react'
import { ValidationBuilder } from '../../../../presentation/builder/validation/ValidationBuilder'

export const makeLogin: React.FC = () => {
  const remoteAuthentication = new RemoteAuthentication(
    'http://fordevs.herokuapp.com/api/login',
    new AxiosClient()
  )
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ])
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
