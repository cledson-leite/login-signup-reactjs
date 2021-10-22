import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { ValidationSpy } from '../../validation/mockValidation'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult,
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }

}

describe('Login', () => {
  afterEach(cleanup)
  it('Should start with inicial state', () => {
    //produz os dados do teste
    const { sut, validationSpy } = makeSut()
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
    expect(emailStatus?.title).toBe(validationSpy.errorMessage)
    expect(iconEmail).toBe('times')
    expect(passwordStatus?.title).toBe('Campo Obrigatório')
    expect(iconPassword).toBe('times')
  })
  
  it('Should call Validation with correct email', () => {
    //produz os dados do teste
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')

    //operacionar esses dados
    fireEvent.input(emailInput, { target: { value: email}})
    
    //verificar resultado esperado
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })
  
  it('Should call Validation with correct password', () => {
    //produz os dados do teste
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')

    //operacionar esses dados
    fireEvent.input(passwordInput, { target: { value: password}})
    
    //verificar resultado esperado
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })
  
  it('Should show email error if validation fails', () => {
    //produz os dados do teste
    const { sut, validationSpy } = makeSut()   
    const emailInput = sut.getByTestId('email')

    //operacionar esses dados
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    const iconEmail = emailStatus.firstElementChild?.getAttribute('data-icon')

    //verificar resultado esperado
    expect(emailStatus?.title).toBe(validationSpy.errorMessage)
    expect(iconEmail).toBe('times')
  })
})