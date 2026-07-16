import { Book } from './classes/Book';
import { initialBooks } from './data';
import { Employee } from './classes/Employee';
import { Developer } from './classes/Developer';

// State
let books: Book[] = [...initialBooks];
let searchQuery: string = "";

// DOM Elements
const booksContainer = document.getElementById('booksContainer') as HTMLDivElement;
const bookCount = document.getElementById('bookCount') as HTMLSpanElement;
const addBookForm = document.getElementById('addBookForm') as HTMLFormElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;

// Render function
function renderBooks(): void {
    // Clear container
    booksContainer.innerHTML = '';
    
    // Filter books based on search query
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update Count
    bookCount.textContent = `Total: ${filteredBooks.length}`;

    // Generate DOM
    filteredBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = "book-card bg-white p-6 flex flex-col justify-between";
        
        const statusColor = book.status === 'ხელმისაწვდომია' ? 'text-green-600' : 'text-crimson';
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
            <div class="flex gap-2 mt-4 pt-4 border-t-2 border-gray-100">
                <button onclick="window.toggleStatus(${book.id})" class="flex-1 bg-navy text-white text-sm font-bold py-2 hover:bg-navy-light transition-colors uppercase tracking-wider">
                    Toggle Status
                </button>
                <button onclick="window.deleteBook(${book.id})" class="flex-1 bg-transparent border-2 border-crimson text-crimson text-sm font-bold py-2 hover:bg-crimson hover:text-white transition-colors uppercase tracking-wider">
                    Delete
                </button>
            </div>
        `;
        booksContainer.appendChild(card);
    });
}

// Add Book Logic
addBookForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const authorInput = document.getElementById('author') as HTMLInputElement;
    const yearInput = document.getElementById('year') as HTMLInputElement;

    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    
    const newBook = new Book(
        newId,
        titleInput.value,
        authorInput.value,
        parseInt(yearInput.value),
        "ხელმისაწვდომია"
    );

    books.push(newBook);
    
    // Reset form
    addBookForm.reset();
    
    // Re-render
    renderBooks();
});

// Search Logic
searchInput.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    searchQuery = target.value;
    renderBooks();
});

// Delete Logic (exposed to window for onclick handler)
(window as any).deleteBook = function(id: number): void {
    books = books.filter(book => book.id !== id);
    renderBooks();
};

// Toggle Status Logic (exposed to window for onclick handler)
(window as any).toggleStatus = function(id: number): void {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        const currentStatus = books[bookIndex].status;
        // Using if/else as requested in instructions
        if (currentStatus === 'ხელმისაწვდომია') {
            books[bookIndex].status = 'არ არის ხელმისაწვდომი';
        } else {
            books[bookIndex].status = 'ხელმისაწვდომია';
        }
        renderBooks();
    }
};

// Initial Render
renderBooks();

// OOP Demonstration
const emp1 = new Employee("Giorgi");
emp1.logName();

const dev1 = new Developer("Nika", "TypeScript");
dev1.describeAction();

