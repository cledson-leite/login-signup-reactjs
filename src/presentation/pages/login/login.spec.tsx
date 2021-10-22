import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import Login from './login'
import { Validation } from 'presentation/validation/IValidation'

type SutTypes = {
  sut: RenderResult,
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage!: string
  fieldName!: string
  fieldValue!: string
  
  validate(name: string, value:string): string {
    this.fieldName = name
    this.fieldValue = value
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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
    const { sut } = makeSut()
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
    expect(emailStatus?.title).toBe('Campo Obrigatório')
    expect(iconEmail).toBe('times')
    expect(passwordStatus?.title).toBe('Campo Obrigatório')
    expect(iconPassword).toBe('times')
  })
  
  it('Should call Validation with correct email', () => {
    //produz os dados do teste
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')

    //operacionar esses dados
    fireEvent.input(emailInput, {target: { value: 'any@email.com'}})
    
    //verificar resultado esperado
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any@email.com')
  })
  
  it('Should call Validation with correct password', () => {
    //produz os dados do teste
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')

    //operacionar esses dados
    fireEvent.input(passwordInput, {target: { value: 'any_password'}})
    
    //verificar resultado esperado
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})