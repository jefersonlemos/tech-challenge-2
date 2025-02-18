import { CreateAuthorUseCase } from '@/use-cases/create-author'

// TODO - Tem algo de errado que nao tá certo aqui.
export class IAuthor implements CreateAuthorUseCase {
  id?: number
  cpf: string
  name: string
  birth: Date
  email: string
  user_id?: number

  constructor(cpf: string, name: string, birth: Date, email: string) {
    this.cpf = cpf
    this.name = name
    this.birth = birth
    this.email = email
  }
}