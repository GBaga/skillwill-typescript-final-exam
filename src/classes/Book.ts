import { IBook } from '../models/IBook';
import { BookStatus } from '../models/BookStatus';

export class Book implements IBook {
    id: number;
    title: string;
    author: string;
    year: number;
    status: BookStatus;

    constructor(id: number, title: string, author: string, year: number, status: BookStatus) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
    }
}
