import { IAuthor } from '@/entities/models/author.interface'

export interface IAuthorRepository {
  create(author: IAuthor): Promise<IAuthor | undefined>
}