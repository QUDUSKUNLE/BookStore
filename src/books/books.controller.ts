import { Controller, Get, Post, Delete, Param, Query, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/createbook.dto';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService){}

  @Get()
  async getBooks(): Promise<Book[]> {
    return await this.booksService.getBooks();
  }

  @Get(':id')
  async getBook(@Param('id') id): Promise<Book> {
    return await this.booksService.getBook(id) 
  }

  @Post()
  async addBooks(@Body() createBookDto: CreateBookDTO): Promise<string> {
    return await  this.booksService.addBooks(createBookDto);
  }

  @Delete()
  async deleteBook(@Query() query): Promise<string> {
    return await this.booksService.deleteBooks(query.id);
  }
}
