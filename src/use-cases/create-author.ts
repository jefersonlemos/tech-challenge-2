import { IAuthor } from '@/entities/models/author.interface'
import { IAuthorRepository } from '@/repositories/author.repository.interface'


export class CreateAuthorUseCase {
  constructor(private authorRepository: IAuthorRepository) {}

  handler(author: IAuthor) {
    return this.authorRepository.create(author)
  }
}