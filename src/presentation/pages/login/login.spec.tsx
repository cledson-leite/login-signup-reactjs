import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '../../validation/mockValidation'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult,
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }

}

describe('Login', () => {
  afterEach(cleanup)
  it('Should start with inicial state', () => {
    //produz os dados do teste
    const { sut, validationStub } = makeSut()
    //operacionar esses dados
    const errorWrap = sut.getByTestId('errorWrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const iconEmail = emailStatus.firstElementChild?.getAttribute('data-icon')
    const passwordStatus = sut.getByTestId('password-status')
    const iconPassword = passwordStatus.firstElementChild?.getAttribute('data-icon')
    
    //verificar resultado esperado
    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus?.title).toBe(validationStub.errorMessage)
    expect(iconEmail).toBe('times')
    expect(passwordStatus?.title).toBe(validationStub.errorMessage)
    expect(iconPassword).toBe('times')
  })

  it('Should show email error if validation fails', () => {
    //produz os dados do teste
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')

    //operacionar esses dados
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    const iconEmail = emailStatus.firstElementChild?.getAttribute('data-icon')

    //verificar resultado esperado
    expect(emailStatus?.title).toBe(validationStub.errorMessage)
    expect(iconEmail).toBe('times')
  })
  
  it('Should show password error if validation fails', () => {
    //produz os dados do teste
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')

    //operacionar esses dados
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    const iconPassword = passwordStatus.firstElementChild?.getAttribute('data-icon')

    //verificar resultado esperado
    expect(passwordStatus?.title).toBe(validationStub.errorMessage)
    expect(iconPassword).toBe('times')
  })

  it('Should show valid email state if Validation succeeds', () => {
    //produz os dados do teste
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = ''
    const emailInput = sut.getByTestId('email')

    //operacionar esses dados
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    const iconEmail = emailStatus.firstElementChild?.getAttribute('data-icon')

    //verificar resultado esperado
    expect(emailStatus?.title).toBe('OK!')
    expect(iconEmail).toBe('check')
  })
})