export class UnexpectedError extends Error {
  constructor() {
    super('Erro Inesperado. Tente novamente mais tarde.')
    this.name = 'UnexpectedError'
  };
}