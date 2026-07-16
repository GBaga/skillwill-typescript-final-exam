# 📚 Library Management System

A dynamic, fully-featured Library Management System built with **TypeScript**, **HTML**, and **Tailwind CSS** as a final exam project for the SkillWill TypeScript course.

---

## ✨ Features

- **Add Books** — Fill in the form with Title, Author, and Year to add new books to the library
- **Edit Books** — Click "Edit" on any card to pre-fill the form and update the book's data
- **Delete Books** — Remove a book permanently from the library by ID
- **Toggle Status** — Switch a book between *Available* (`ხელმისაწვდომია`) and *Unavailable* (`არ არის ხელმისაწვდომი`)
- **Search** — Filter books in real-time by title using the header search bar
- **LocalStorage Persistence** — All changes are saved to the browser's localStorage and survive page refreshes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **TypeScript** | Strongly-typed application logic, OOP classes, interfaces |
| **HTML5** | Semantic page structure |
| **Tailwind CSS** | Utility-first styling via CDN |
| **Vanilla CSS** | Custom micro-animations and hover effects |
| **LocalStorage API** | Client-side data persistence |
| **lite-server** | Local development server with auto-reload |

---

## 🗂️ Project Structure

```
skillwill-typescript-final-exam/
│
├── index.html          # Main HTML page (Tailwind CDN, form, book grid)
├── style.css           # Custom CSS (hover effects, scrollbar, card animations)
├── favicon.png         # Book-themed favicon
├── tsconfig.json       # TypeScript compiler configuration
├── package.json        # NPM scripts (build, watch, dev)
│
├── src/
│   └── app.ts          # All TypeScript source code (compiled → dist/app.js)
│       ├── BookStatus  (type)
│       ├── IBook       (interface)
│       ├── Book        (class)
│       ├── Employee    (class)
│       ├── Developer   (class, extends Employee)
│       ├── initialBooks (data array — 5 Georgian books)
│       └── app logic  (render, add, edit, delete, search, localStorage)
│
└── dist/
    └── app.js          # Compiled JavaScript output (do not edit manually)
```

---

## 🏗️ TypeScript Concepts Demonstrated

### Phase I — Foundation

| Concept | Implementation |
|---|---|
| `type` | `BookStatus = 'ხელმისაწვდომია' \| 'არ არის ხელმისაწვდომი'` |
| `interface` | `IBook` with `id`, `title`, `author`, `year`, `status` |
| `class` + `constructor` + `this` | `Book` class implementing `IBook` |
| `extends` + `super()` | `Developer extends Employee` |
| DOM Manipulation | `document.createElement`, `appendChild`, `innerHTML`, `textContent` |

### Phase II — Features

| Concept | Implementation |
|---|---|
| Functions | `renderBooks()`, `setAddMode()`, `setEditMode()`, `saveToStorage()` |
| `if / else` | Status toggle logic in `toggleStatus()` |
| Array methods | `.filter()`, `.find()`, `.findIndex()`, `.map()`, `.push()` |
| Event listeners | `submit`, `input`, `click` |
| Type casting | `e.target as HTMLInputElement`, `as HTMLDivElement` |
| Typed variables | `let books: Book[]`, `let editingId: number \| null` |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/GBaga/skillwill-typescript-final-exam.git
cd skillwill-typescript-final-exam

# Install dependencies
npm install
```

### Running the Project

```bash
# Start development server (auto-compiles TS + opens browser with live reload)
npm run dev
```

The app will open at **http://localhost:3000** (or the next available port).

### Build Only

```bash
# Compile TypeScript to JavaScript once
npm run build

# Watch for changes and auto-compile
npm run watch
```

---

## 📖 Initial Book Data

The system is pre-loaded with 5 classic Georgian literary works:

| # | Title | Author | Year | Status |
|---|---|---|---|---|
| 1 | ვეფხისტყაოსანი | შოთა რუსთაველი | 1200 | ✅ Available |
| 2 | დათა თუთაშხია | ჭაბუა ამირეჯიბი | 1975 | ✅ Available |
| 3 | დიდოსტატის მარჯვენა | კონსტანტინე გამსახურდია | 1939 | ❌ Unavailable |
| 4 | კაცი, რომელსაც ლიტერატურა ძლიერ უყვარდა | გურამ დოჩანაშვილი | 2001 | ✅ Available |
| 5 | მე, ბებია, ილიკო და ილარიონი | ნოდარ დუმბაძე | 1960 | ❌ Unavailable |

---

## 🎨 Design

- **Color Palette**: Navy Blue (`#0a192f`) · Crimson Red (`#e63946`) · White / Off-white (`#f1faee`)
- **Geometry**: Sharp edges throughout — no rounded corners
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Interactions**: Card hover with sharp box-shadow lift, smooth button color transitions

---

## 📝 License

This project was created for educational purposes as part of the **SkillWill TypeScript Final Exam**.
