import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { AddAccount } from '../../domain/usecases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  // create a request validator Class
  // validor.create()
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      // TODO: create validation class
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return badRequest(new InvalidParamError('email'))

      this.addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
      })
      return {
        statusCode: 200,
        body: { message: 'Account created successfully' }
      }
    } catch (error) {
      return serverError()
    }
  }
}
