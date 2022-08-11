// recebe um nome email e senha
// retorna um usuario
import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  it('Should return 400 if name is not provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
