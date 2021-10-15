import { createContext } from 'react';

type Loading = {
  isLoading: boolean,
  errorMessage: string
}

type InputError = {
  email: string,
  password: string
}

type StateProps = {
  loading: Loading;
  inputError: InputError 
}

export default createContext<StateProps>({} as StateProps);
