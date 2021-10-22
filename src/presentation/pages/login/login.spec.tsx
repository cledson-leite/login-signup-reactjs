import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '../../validation/mockValidation'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError ? params?.validationError : ''
  const sut = render(<Login validation={validationStub} />)
  return {
    sut
  }

}

describe('Login', () => {
  afterEach(cleanup)
  it('Should start with inicial state', () => {
    //produz os dados do teste
    const validationError = faker.random.words()
    const { sut } = makeSut({validationError})
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
    expect(emailStatus?.title).toBe(validationError)
    expect(iconEmail).toBe('times')
    expect(passwordStatus?.title).toBe(validationError)
    expect(iconPassword).toBe('times')
  })

  it('Should show email error if validation fails', () => {
    //produz os dados do teste
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')

    //operacionar esses dados
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    const iconEmail = emailStatus.firstElementChild?.getAttribute('data-icon')

    //verificar resultado esperado
    expect(emailStatus?.title).toBe(validationError)
    expect(iconEmail).toBe('times')
  })
  
  it('Should show password error if validation fails', () => {
    //produz os dados do teste
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')

    //operacionar esses dados
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    const iconPassword = passwordStatus.firstElementChild?.getAttribute('data-icon')

    //verificar resultado esperado
    expect(passwordStatus?.title).toBe(validationError)
    expect(iconPassword).toBe('times')
  })

  it('Should show valid email state if Validation succeeds', () => {
    //produz os dados do teste
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')

    //operacionar esses dados
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    const iconEmail = emailStatus.firstElementChild?.getAttribute('data-icon')

    //verificar resultado esperado
    expect(emailStatus?.title).toBe('OK!')
    expect(iconEmail).toBe('check')
  })

  it('Should show valid password state if Validation succeeds', () => {
    //produz os dados do teste
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')

    //operacionar esses dados
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    const iconPassword = passwordStatus.firstElementChild?.getAttribute('data-icon')

    //verificar resultado esperado
    expect(passwordStatus?.title).toBe('OK!')
    expect(iconPassword).toBe('check')
  })

  it('Should enable submit button if form is valid', () => {
    //produz os dados do teste
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')

    //operacionar esses dados
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    //verificar resultado esperado
    expect(submitButton.disabled).toBe(false)
  })
})