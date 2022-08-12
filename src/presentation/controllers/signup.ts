import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  // criar um validador atributo/metodo da classe
  // faz um validor.create()
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      // TODO: create validation class
      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) return badRequest(new InvalidParamError('email'))
      throw new Error('Method not implemented.')
    } catch (error) {
      // Todo: create internalServerError helper
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
