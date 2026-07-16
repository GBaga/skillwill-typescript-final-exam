"use strict";
// ─── Book Class ───────────────────────────────────────────────────────────────
class Book {
    constructor(id, title, author, year, status) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
    }
}
// ─── Employee Class ───────────────────────────────────────────────────────────
class Employee {
    constructor(name) {
        this.name = name;
    }
    logName() {
        console.log(`Employee Name: ${this.name}`);
        const infoDiv = document.getElementById('systemInfo');
        if (infoDiv) {
            infoDiv.innerHTML += `<p class="border-l-2 border-red-500 pl-2 mt-1">Employee: <strong>${this.name}</strong></p>`;
        }
    }
}
// ─── Developer Class (extends Employee) ──────────────────────────────────────
class Developer extends Employee {
    constructor(name, programmingLanguage) {
        super(name);
        this.programmingLanguage = programmingLanguage;
    }
    describeAction() {
        console.log(`${this.name} is coding in ${this.programmingLanguage}.`);
        const infoDiv = document.getElementById('systemInfo');
        if (infoDiv) {
            infoDiv.innerHTML += `<p class="border-l-2 border-blue-900 pl-2 mt-1">${this.name} codes in <span class="font-bold text-red-600">${this.programmingLanguage}</span></p>`;
        }
    }
}
// ─── Initial Data (min. 5 books) ──────────────────────────────────────────────
const initialBooks = [
    new Book(1, "ვეფხისტყაოსანი", "შოთა რუსთაველი", 1200, "ხელმისაწვდომია"),
    new Book(2, "დათა თუთაშხია", "ჭაბუა ამირეჯიბი", 1975, "ხელმისაწვდომია"),
    new Book(3, "დიდოსტატის კონსტანტინეს მარჯვენა", "კონსტანტინე გამსახურდია", 1939, "არ არის ხელმისაწვდომი"),
    new Book(4, "კაცი, რომელსაც ლიტერატურა ძლიერ უყვარდა", "გურამ დოჩანაშვილი", 2001, "ხელმისაწვდომია"),
    new Book(5, "მე, ბებია, ილიკო და ილარიონი", "ნოდარ დუმბაძე", 1960, "არ არის ხელმისაწვდომი")
];
// ─── LocalStorage Helpers ─────────────────────────────────────────────────────
const STORAGE_KEY = 'library_books';
function saveToStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
        return [];
    try {
        const parsed = JSON.parse(raw);
        return parsed.map(b => new Book(b.id, b.title, b.author, b.year, b.status));
    }
    catch (_a) {
        return [];
    }
}
// ─── State ────────────────────────────────────────────────────────────────────
const stored = loadFromStorage();
let books = stored.length > 0 ? stored : [...initialBooks];
let searchQuery = '';
let editingId = null;
if (stored.length === 0)
    saveToStorage(books);
// ─── DOM Elements ─────────────────────────────────────────────────────────────
const booksContainer = document.getElementById('booksContainer');
const bookCount = document.getElementById('bookCount');
const addBookForm = document.getElementById('addBookForm');
const searchInput = document.getElementById('searchInput');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
// ─── Render ───────────────────────────────────────────────────────────────────
function renderBooks() {
    booksContainer.innerHTML = '';
    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
    bookCount.textContent = `Total: ${filteredBooks.length}`;
    filteredBooks.forEach((book) => {
        const isEditing = editingId === book.id;
        const card = document.createElement('div');
        card.className = `book-card bg-white p-6 flex flex-col justify-between${isEditing ? ' ring-4 ring-red-500' : ''}`;
        const statusColor = book.status === 'ხელმისაწვდომია' ? 'text-green-600' : 'text-red-600';
        const statusBadge = book.status === 'ხელმისაწვდომია' ? 'bg-green-100' : 'bg-red-100';
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-navy leading-tight">${book.title}</h3>
                    <span class="text-xs font-bold px-2 py-1 uppercase tracking-wide ${statusColor} ${statusBadge}">${book.status}</span>
                </div>
                <p class="text-gray-600 mb-1"><span class="font-semibold text-navy">Author:</span> ${book.author}</p>
                <p class="text-gray-600 mb-4"><span class="font-semibold text-navy">Year:</span> ${book.year}</p>
            </div>
            <div class="flex gap-2 mt-4 pt-4 border-t-2 border-gray-100 flex-wrap">
                <button onclick="startEdit(${book.id})"
                        class="flex-1 bg-navy text-white text-sm font-bold py-2 hover:bg-navy-light transition-colors uppercase tracking-wider">
                    Edit
                </button>
                <button onclick="toggleStatus(${book.id})"
                        class="flex-1 bg-white border-2 border-navy text-navy text-sm font-bold py-2 hover:bg-navy hover:text-white transition-colors uppercase tracking-wider">
                    Toggle
                </button>
                <button onclick="deleteBook(${book.id})"
                        class="flex-1 border-2 border-red-600 text-red-600 text-sm font-bold py-2 hover:bg-red-600 hover:text-white transition-colors uppercase tracking-wider">
                    Delete
                </button>
            </div>
        `;
        booksContainer.appendChild(card);
    });
}
// ─── Form Mode Helpers ────────────────────────────────────────────────────────
function setAddMode() {
    editingId = null;
    formTitle.textContent = 'Add New Book';
    submitBtn.textContent = 'Add Book';
    submitBtn.className = 'bg-crimson text-white font-bold py-3 mt-2 hover:bg-crimson-hover transition-colors uppercase tracking-wide';
    cancelEditBtn.classList.add('hidden');
    addBookForm.reset();
}
function setEditMode(book) {
    editingId = book.id;
    formTitle.textContent = 'Edit Book';
    submitBtn.textContent = 'Update Book';
    submitBtn.className = 'bg-navy text-white font-bold py-3 mt-2 hover:bg-navy-light transition-colors uppercase tracking-wide';
    cancelEditBtn.classList.remove('hidden');
    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = String(book.year);
    addBookForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// ─── Form Submit (Add & Edit) ─────────────────────────────────────────────────
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (editingId !== null) {
        // EDIT MODE
        const idx = books.findIndex((b) => b.id === editingId);
        if (idx !== -1) {
            books[idx].title = titleInput.value;
            books[idx].author = authorInput.value;
            books[idx].year = parseInt(yearInput.value);
        }
        saveToStorage(books);
        setAddMode();
        renderBooks();
    }
    else {
        // ADD MODE
        const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
        const newBook = new Book(newId, titleInput.value, authorInput.value, parseInt(yearInput.value), 'ხელმისაწვდომია');
        books.push(newBook);
        saveToStorage(books);
        setAddMode();
        renderBooks();
    }
});
// Cancel edit
cancelEditBtn.addEventListener('click', () => {
    setAddMode();
    renderBooks();
});
// ─── Search ───────────────────────────────────────────────────────────────────
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderBooks();
});
// ─── Global Functions (called from inline onclick) ────────────────────────────
function startEdit(id) {
    const book = books.find((b) => b.id === id);
    if (book)
        setEditMode(book);
    renderBooks();
}
function deleteBook(id) {
    books = books.filter((book) => book.id !== id);
    if (editingId === id)
        setAddMode();
    saveToStorage(books);
    renderBooks();
}
function toggleStatus(id) {
    const idx = books.findIndex((book) => book.id === id);
    if (idx !== -1) {
        if (books[idx].status === 'ხელმისაწვდომია') {
            books[idx].status = 'არ არის ხელმისაწვდომი';
        }
        else {
            books[idx].status = 'ხელმისაწვდომია';
        }
        saveToStorage(books);
        renderBooks();
    }
}
// ─── Bootstrap ────────────────────────────────────────────────────────────────
renderBooks();
// OOP Demonstration
const emp1 = new Employee('Giorgi');
emp1.logName();
const dev1 = new Developer('Nika', 'TypeScript');
dev1.describeAction();
