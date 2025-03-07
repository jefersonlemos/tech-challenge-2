// import { CreateAuthorUseCase } from '@/use-cases/create-author'
import { IAuthor } from './models/author.interface'

export class Author implements IAuthor {
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