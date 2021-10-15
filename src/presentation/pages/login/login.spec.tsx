import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login', () => {
  it('Should start with inicial state', () => {
    //produz os dados do teste
    const { getByTestId, queryByTestId } = render(<Login />)
    //operacionar esses dados
    const errorWrap = getByTestId('errorWrap')
    const submitButton = getByTestId('submit') as HTMLButtonElement
    const emailStatus = getByTestId('email-status')
    const iconEmail = emailStatus.firstElementChild?.getAttribute('data-icon')
    const passwordStatus = getByTestId('password-status')
    const iconPassword = passwordStatus.firstElementChild?.getAttribute('data-icon')
    
    //verificar resultado esperado
    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus?.title).toBe('Campo Obrigatório')
    expect(iconEmail).toBe('times')
    expect(passwordStatus?.title).toBe('Campo Obrigatório')
    expect(iconPassword).toBe('times')
  })
})