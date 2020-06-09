const showDiv = document.getElementById("show-panel");
const list = document.getElementById("list");
const BOOKS = "http://localhost:3000/books";
document.addEventListener("DOMContentLoaded", function () {
  //
  //Building DOM

  function buildBookCard(bookData) {
    let title = document.createElement("h2");
    let img = document.createElement("img");
    let desc = document.createElement("p");
    let likeBtn = document.createElement("button");
    let ulUser = document.createElement("ul");
    ulUser.id = "userList";
    title.innerText = bookData.title;
    likeBtn.innerText = "Like";
    img.src = bookData.img_url;
    desc.innerText = bookData.description;
    let bookUsers = bookData.users;
    elements = [title, img, desc, likeBtn, ulUser];
    likeBtn.addEventListener("click", handleRead);

    renderBook(elements, bookData, bookUsers);
  }

  function renderBook(bookElements, bookData, users) {
    let bookCard = document.createElement("div");
    let u;
    bookCard.id = bookData.id;
    bookCard.className = "book";
    bookCard.style.display = "none";
    for (const element of bookElements) {
      bookCard.appendChild(element);
    }
    showDiv.appendChild(bookCard);

    for (const user of users) {
      let li = document.createElement("li");
      li.innerText = user.username;
      bookCard.children[4].appendChild(li);
    }
  }

  function handleBookClick(event) {
    let bookId = `${event.target.id}`;
    console.log(bookId, "bookId");
    let clickedBook = document.getElementById(bookId);
    console.log(clickedBook, "clickedBook");
    let bookDivs = document.querySelectorAll(".book");
    bookDivs.forEach((book) => {
      if (parseInt(clickedBook.id) == book.id) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  }
  
  
  function handleRead(event) {
    let book = event.target.parentElement.id;
    const username = "Sam";
    event.preventDefault();

    let result = fetch(`${BOOKS}/${book}`)
      .then((res) => res.json())
      .then((object) => {
        let currentUsers = object["users"];
        currentUsers.push({ id: 11, username: username });
        return fetch(`${BOOKS}/${book}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            users: currentUsers,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      });
    addToDOMList(book, username);
    console.log(result);
  }




  function addToDOMList(bookId, username) {
    let div = document.getElementById(bookId);
    let bookUserList = div.children[4];
    let nameLi = document.createElement("li");
    nameLi.innerText = username;
    bookUserList.appendChild(nameLi);
  }

  function buildBookList(book) {
    let listItem = document.createElement("li");
    listItem.id = `${book.id}_list`;
    listItem.innerText = book.title;
    renderBookList(listItem)
  }
  function renderBookList(listEle){
    list.appendChild(listEle);
    listEle.addEventListener("click", handleBookClick);
    listEle.addEventListener("mouseenter", () => {
      listEle.style.color = "red";
    });
  }
  //fetches

  function fetchBooks() {
    return fetch(BOOKS)
      .then((res) => res.json())
      .then((object) => {
        object.forEach((book) => {
          buildBookList(book), buildBookCard(book);
        });
      });
  }
  //Event listeners
  //Event Handlers
  //Function calls
  fetchBooks();
});
