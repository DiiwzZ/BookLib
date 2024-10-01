import * as fs from 'fs';

// กำหนด Enum สำหรับประเภทของหนังสือ
enum Genre {
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Science = "Science",
    History = "History",
}

// อินเทอร์เฟสสำหรับข้อมูลหนังสือ
interface Book {
    id: number;
    title: string;
    author: string;
    genre: Genre;
    publishedYear: number;
    isAvailable: boolean;
}

// คลาส Library สำหรับจัดการหนังสือ
class Library {
    private books: Book[] = [];

    // ฟังก์ชันเพิ่มหนังสือ
    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Added: ${book.title}`);
    }

    // ฟังก์ชันแสดงรายการหนังสือทั้งหมด
    listBooks(): void {
        this.books.forEach(book => {
            console.log(`${book.id}: ${book.title} by ${book.author} (${book.genre}, ${book.publishedYear}) - Available: ${book.isAvailable}`);
        });
    }

    // ฟังก์ชันค้นหาหนังสือตามคุณสมบัติต่างๆ (เวอร์ชันปรับปรุง)
    searchBooks<T extends keyof Book>(property: T, value: Book[T]): Book[] {
        return this.books.filter(book => book[property] === value);
    }

    // ฟังก์ชันอัปเดตข้อมูลหนังสือ
    updateBook(id: number, updatedFields: Partial<Book>): void {
        const book = this.books.find(book => book.id === id);
        if (book) {
            Object.assign(book, updatedFields);
            console.log(`Updated: ${book.title}`);
        } else {
            console.log(`Book with ID ${id} not found`);
        }
    }

    // ฟังก์ชันลบหนังสือจากคลัง
    deleteBook(id: number): void {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            console.log(`Deleted: ${this.books[index].title}`);
            this.books.splice(index, 1);
        } else {
            console.log(`Book with ID ${id} not found`);
        }
    }

    // ฟังก์ชันค้นหาหนังสือที่พร้อมใช้งาน
    findAvailableBooks(): Book[] {
        return this.books.filter(book => book.isAvailable === true);
    }

    // ฟังก์ชันค้นหาหนังสือที่ไม่พร้อมใช้งาน
    findUnavailableBooks(): Book[] {
        return this.books.filter(book => book.isAvailable === false);
    }

    // ฟังก์ชันบันทึกข้อมูลหนังสือลงในไฟล์ JSON
    saveToFile(fileName: string): void {
        const data = JSON.stringify(this.books, null, 2);
        fs.writeFileSync(fileName, data);
        console.log(`Saved to ${fileName}`);
    }

    // ฟังก์ชันโหลดข้อมูลจากไฟล์ JSON
    loadFromFile(fileName: string): void {
        const data = fs.readFileSync(fileName, 'utf-8');
        this.books = JSON.parse(data);
        console.log(`Loaded from ${fileName}`);
    }
}

// เริ่มการทำงานของโปรแกรม
const library = new Library();

// สร้างหนังสือตัวอย่าง
const book1: Book = {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: Genre.Fiction,
    publishedYear: 1960,
    isAvailable: true,
};

const book2: Book = {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: Genre.NonFiction,
    publishedYear: 2011,
    isAvailable: false,
};

// เพิ่มหนังสือลงในคลัง
library.addBook(book1);
library.addBook(book2);

// แสดงหนังสือทั้งหมด
console.log("All Books:");
library.listBooks();

// ค้นหาหนังสือโดยผู้เขียน
console.log("\nSearch by Author (Harper Lee):");
const foundBooks = library.searchBooks('author', 'Harper Lee');
foundBooks.forEach(book => console.log(book.title));

// อัปเดตสถานะความพร้อมของหนังสือ
library.updateBook(1, { isAvailable: false });

// ลบหนังสือจากคลัง
library.deleteBook(2);

// แสดงหนังสือหลังการอัปเดตและลบ
console.log("\nAfter Updates:");
library.listBooks();

// แสดงหนังสือที่พร้อมใช้งาน
console.log("\nAvailable Books:");
library.findAvailableBooks().forEach(book => console.log(book.title));

// บันทึกข้อมูลหนังสือลงไฟล์
library.saveToFile('books.json');

// โหลดข้อมูลจากไฟล์
library.loadFromFile('books.json');
console.log("\nBooks after loading from file:");
library.listBooks();
