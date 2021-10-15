import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login', () => {
  it('Should start with inicial state', () => {
    //produz os dados do teste
    const { getByTestId } = render(<Login />)
    //operacionar esses dados
    const errorWrap = getByTestId('errorWrap')
    const submitButton = getByTestId('submit') as HTMLButtonElement
    
    //verificar resultado esperado
    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
  })
})