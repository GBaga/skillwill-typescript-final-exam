import { BookStatus } from './BookStatus';

export interface IBook {
    id: number;
    title: string;
    author: string;
    year: number;
    status: BookStatus;
}
