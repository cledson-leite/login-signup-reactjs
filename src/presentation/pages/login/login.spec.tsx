import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import {createMemoryHistory} from 'history'
import 'jest-localstorage-mock'
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react'

import Login from './login'
import { ValidationStub } from '../../repositories/validation/mockValidation'
import { AuthenticationSpy } from './mocks/AuthenticationSpy'
import { InvalidCredentialsError } from '@repositories/errors/InvalidCredentialsError'


type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const populateEmail = (sut: RenderResult, email = faker.internet.email() ): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })

}

const populatePassword = (sut: RenderResult, password = faker.internet.password() ): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })

}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmail(sut, email)
  populatePassword(sut, password)
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)

}

const simulateStatus = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  const iconEmail = emailStatus.firstElementChild?.getAttribute('data-icon')
  expect(emailStatus?.title).toBe(validationError || 'OK!')
  expect(iconEmail).toBe(validationError ? 'times' : 'check')
}
const history = createMemoryHistory({initialEntries: ['/login']})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError ? params?.validationError : ''
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
      />
    </Router>
  )
  return {
    sut,
    authenticationSpy
  }

}

describe('Login', () => {
  beforeEach(() => localStorage.clear())
  afterEach(cleanup)
  it('Should start with inicial state', () => {
    //produz os dados do teste
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    //operacionar esses dados
    const errorWrap = sut.getByTestId('errorWrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    simulateStatus(sut, 'email', validationError)
    simulateStatus(sut, 'password', validationError)

    //verificar resultado esperado
    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
  })

  it('Should show email error if validation fails', () => {
    //produz os dados do teste
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmail(sut)

    //operacionar esses dados
    simulateStatus(sut, 'email', validationError)
  })
  
  it('Should show password error if validation fails', () => {
    //produz os dados do teste
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePassword(sut)

    //operacionar esses dados
    simulateStatus(sut, 'password', validationError)
  })

  it('Should show valid email state if Validation succeeds', () => {
    //produz os dados do teste
    const { sut } = makeSut()
    populateEmail(sut)

    //operacionar esses dados
    simulateStatus(sut, 'email')
  })

  it('Should show valid password state if Validation succeeds', () => {
    //produz os dados do teste
    const { sut } = makeSut()
    populatePassword(sut)

    //operacionar esses dados
    simulateStatus(sut, 'password')
  })

  it('Should enable submit button if form is valid', () => {
    //produz os dados do teste
    const { sut } = makeSut()
    populateEmail(sut)
    populatePassword(sut)

    //operacionar esses dados
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    //verificar resultado esperado
    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    //produz os dados do teste
    const { sut } = makeSut()

    //operacionar esses dados
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')

    //verificar resultado esperado
    expect(spinner).toBeTruthy()
  })

  it('Should call Authentication with correct values', () => {
    //produz os dados do teste
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    //operacionar esses dados
    simulateValidSubmit(sut, email, password)

    //verificar resultado esperado
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('Should call Authentication only once', () => {
    //produz os dados do teste
    const { sut, authenticationSpy } = makeSut()

    //operacionar esses dados
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    //verificar resultado esperado
    expect(authenticationSpy.callCount).toBe(1)
  })

  it('Should not call Authentication if form is invalid', () => {
    //produz os dados do teste
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    //operacionar esses dados
    populateEmail(sut)
    fireEvent.submit(sut.getByTestId("form"))

    //verificar resultado esperado
    expect(authenticationSpy.callCount).toBe(0)
  })

  it('Should present error if Authentication fails', async () => {

    //produz os dados do teste
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    //operacionar esses dados
    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('errorWrap')
    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('error')
    const spinner = sut.queryByTestId('spinner')

    //verificar resultado esperado
    expect(mainError.textContent).toBe(error.message)
    expect(spinner).toBeNull()
  })

  it('Should add accessToken to localstorage on success', async () => {

    //produz os dados do teste
    const { sut, authenticationSpy } = makeSut()

    //operacionar esses dados
    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))

    //verificar resultado esperado
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('Should go to signUp page', () => {

    //produz os dados do teste
    const { sut } = makeSut()

    //operacionar esses dados
    fireEvent.click(sut.getByTestId('signUp'))

    //verificar resultado esperado
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signUp')
  })
})