// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener("DOMContentLoaded", () => {
  const numQuotes = 0;
  fetchAndRenderQuotes();

  let addQuoteForm = document.querySelector("#new-quote-form");

  addQuoteForm.addEventListener("submit", function(event) {
    addQuoteForm = document.querySelector("#new-quote-form");
    event.preventDefault();

    const data = {
      id: 100,
      quote: addQuoteForm.firstElementChild.lastElementChild.value,
      author: addQuoteForm.firstElementChild.lastElementChild.value,
      likes: 0
    };

    fetch("http://localhost:3000/quotes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(quote => {
      renderSingleQuote(quote);
    });
  });
});

function fetchAndRenderQuotes() {
  fetch("http://localhost:3000/quotes")
    .then(resp => resp.json())
    .then(quotes => renderQuotes(quotes));
}

function renderSingleQuote(quote) {
  let list = document.querySelector("#quote-list");
  list.innerHTML += `
          <li class='quote-card'>
          <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${
              quote.likes
            }</span></button>
            <button class='btn-danger'>Delete</button>
          </blockquote>
        </li>`;
}

function renderQuotes(quotes) {
  const list = document.querySelector("#quote-list");
  quotes.forEach(quote => {
    list.innerHTML += `
        <li class='quote-card'>
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span>${
            quote.likes
          }</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      </li>`;
  });
}
