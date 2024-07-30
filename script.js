let myLibrary = [];

// Book constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Function to add a book to the library and update local storage
function addBookToLibrary(book) {
    myLibrary.push(book);
    saveLibrary();
    displayBooks();
}

// Function to save the library array to local storage
function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Function to load the library array from local storage
function loadLibrary() {
    const storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (storedLibrary) {
        myLibrary = storedLibrary;
    }
    displayBooks();
}

// Function to display the books in the library on the webpage
function displayBooks() {
    const library = document.getElementById('library');
    library.innerHTML = ''; // Clear previous content
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.read ? 'Read' : 'Not read yet'}</p>
            <button onclick="removeBook(${index})">Remove</button>
        `;
        library.appendChild(bookDiv);
    });
}

// Function to remove a book from the library and update local storage
function removeBook(index) {
    myLibrary.splice(index, 1);
    saveLibrary();
    displayBooks();
}

// Event listener for the form submission
document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    this.reset();
});

// Load the library from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadLibrary);

