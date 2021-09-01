import { Account } from '@entities/Account';

export interface Authentication {
  auth ():Promise<Account>
}