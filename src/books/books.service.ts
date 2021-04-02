import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';



@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>
  ) {}

  getBooks(): Promise<Book[]> {
    return this.booksRepository.find()
  }

  getBook(id): Promise<Book> {
    const bookId = Number(id);
    return new Promise(resolve => {
      const book = this.booksRepository.findOne(bookId)
      if (!book) {
        throw new HttpException('Book does not exist', 404);
      }
      resolve(book);
    })
  }

  async addBooks(book): Promise<object> {
    try {
      const newBook = await this.booksRepository.insert(book);
      return { message: 'Books added successfully', id: newBook.identifiers[0].id };
    } catch (err) {
      if (err.code === '23505') {
        return { error: 'Book already exist', message: err.message }
      }
      return { error: err }
    }
  }

  deleteBooks(id): Promise<string> {
    const deleteId = id;
    return new Promise(resolve => {
      this.booksRepository.delete(deleteId);
      resolve('Book deleted successfully');
    })
  }
}

