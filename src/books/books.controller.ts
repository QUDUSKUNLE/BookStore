import { Controller, Get, Post, Delete, Param, Query, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/createbook.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService){}

  @Get()
  async getBooks(): Promise<any> {
    return await this.booksService.getBooks();
  }

  @Get(':id')
  async getBook(@Param('id') id): Promise<any> {
    return await this.booksService.getBook(id) 
  }

  @Post()
  async addBooks(@Body() createBookDto: CreateBookDTO): Promise<any> {
    return await  this.booksService.addBooks(createBookDto);
  }

  @Delete()
  async deleteBook(@Query() query): Promise<any> {
    return await this.booksService.deleteBooks(query.id);
  }
}
