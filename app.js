const selectQuantity = document.getElementById('quantity-books');
const selectLetter = document.getElementById('alphabet');
const btnBooks = document.getElementById('btn-books');
const renderBook = document.getElementById('render-book');
const URL = "https://fakerapi.it/api/v1/books?";

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const quantities = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

//esta linea es para cuando cargue la ventana  a su vez cargue la funcion (loadSelects) en este caso
window.addEventListener('load', loadSelects);

btnBooks.addEventListener('click', renderBooks);

const fetchBooks = async (URL, quantity) => {
  const response = await fetch(`${URL}_quantity=${quantity}`);
  const data = await response.json();  
  return data;
}

async function renderBooks() {
  const quantity = parseInt(selectQuantity.value);
  const letter = selectLetter.value.toUpperCase();
  const books = await fetchBooks(URL, quantity);
  console.log(letter);   
  renderBook.innerHTML = '';
  books.data.map( book => {
    letter !== 'ANY LETTER' ?  book.title.charAt(0) === letter ? createBook(book) : null : createBook(book);
  });
}

function loadSelects() {
  quantities.map( quantity =>{
    const option = document.createElement('option');
    option.value = quantity;
    option.textContent = quantity;
    selectQuantity.appendChild(option);
  });
  letters.map( letter =>{
    const option = document.createElement('option');
    option.value = letter;
    option.textContent = letter;
    selectLetter.appendChild(option);
  })
}

function createBook(book) {
  renderBook.innerHTML = renderBook.innerHTML + `
  <div class="book">        
    <div class="img-book">
      <img src=${book.image} alt=${book.title}>
    </div>
    <div class="description-book">
      <h2>Title: ${book.title}</h2>
      <p>Author: ${book.author}</p>
      <span>
        ${book.description}
      </span>
    </div>
  </div>`;
}