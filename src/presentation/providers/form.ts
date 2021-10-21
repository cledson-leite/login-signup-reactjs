import { createContext } from 'react';

type Loading = {
  isLoading: boolean,
  errorMessage: string
}

type InputError = {
  email: string,
  password: string
}

type State = {
  email: string,
}

type StateProps = {
  loading: Loading;
  inputError: InputError;
  state: State,
  setState: React.Dispatch<React.SetStateAction<State>>
}

export default createContext<StateProps>({} as StateProps);
