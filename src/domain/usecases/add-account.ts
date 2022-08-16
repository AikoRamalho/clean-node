import { AccountModel } from '../models/account'

// since addAccountModel is specific to this usecase, we can declare it here
// on the other hand, AccountModel is a model that comes from a entity in the database, for instance
// so it can be used in a generic way, we can use it as a model for the entity
export interface AddAccountModel {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
