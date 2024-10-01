"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// กำหนด Enum สำหรับประเภทของหนังสือ
var Genre;
(function (Genre) {
    Genre["Fiction"] = "Fiction";
    Genre["NonFiction"] = "Non-Fiction";
    Genre["Science"] = "Science";
    Genre["History"] = "History";
})(Genre || (Genre = {}));
// คลาส Library สำหรับจัดการหนังสือ
class Library {
    constructor() {
        this.books = [];
    }
    // ฟังก์ชันเพิ่มหนังสือ
    addBook(book) {
        this.books.push(book);
        console.log(`Added: ${book.title}`);
    }
    // ฟังก์ชันแสดงรายการหนังสือทั้งหมด
    listBooks() {
        this.books.forEach(book => {
            console.log(`${book.id}: ${book.title} by ${book.author} (${book.genre}, ${book.publishedYear}) - Available: ${book.isAvailable}`);
        });
    }
    // ฟังก์ชันค้นหาหนังสือตามคุณสมบัติต่างๆ (เวอร์ชันปรับปรุง)
    searchBooks(property, value) {
        return this.books.filter(book => book[property] === value);
    }
    // ฟังก์ชันอัปเดตข้อมูลหนังสือ
    updateBook(id, updatedFields) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            Object.assign(book, updatedFields);
            console.log(`Updated: ${book.title}`);
        }
        else {
            console.log(`Book with ID ${id} not found`);
        }
    }
    // ฟังก์ชันลบหนังสือจากคลัง
    deleteBook(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            console.log(`Deleted: ${this.books[index].title}`);
            this.books.splice(index, 1);
        }
        else {
            console.log(`Book with ID ${id} not found`);
        }
    }
    // ฟังก์ชันค้นหาหนังสือที่พร้อมใช้งาน
    findAvailableBooks() {
        return this.books.filter(book => book.isAvailable === true);
    }
    // ฟังก์ชันค้นหาหนังสือที่ไม่พร้อมใช้งาน
    findUnavailableBooks() {
        return this.books.filter(book => book.isAvailable === false);
    }
    // ฟังก์ชันบันทึกข้อมูลหนังสือลงในไฟล์ JSON
    saveToFile(fileName) {
        const data = JSON.stringify(this.books, null, 2);
        fs.writeFileSync(fileName, data);
        console.log(`Saved to ${fileName}`);
    }
    // ฟังก์ชันโหลดข้อมูลจากไฟล์ JSON
    loadFromFile(fileName) {
        const data = fs.readFileSync(fileName, 'utf-8');
        this.books = JSON.parse(data);
        console.log(`Loaded from ${fileName}`);
    }
}
// เริ่มการทำงานของโปรแกรม
const library = new Library();
// สร้างหนังสือตัวอย่าง
const book1 = {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: Genre.Fiction,
    publishedYear: 1960,
    isAvailable: true,
};
const book2 = {
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
