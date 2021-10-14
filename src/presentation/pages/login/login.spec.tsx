import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login', () => {
  it('Should not render spinner and error on start', () => {
    //produz os dados do teste
    const { getByTestId } = render(<Login />)
    //operacionar esses dados
    const errorWrap = getByTestId('errorWrap')
    
    //verificar resultado esperado
    expect(errorWrap.childElementCount).toBe(0)
  })
})