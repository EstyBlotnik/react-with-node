import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { DeleteComponent } from "./components/DeleteComponent";
import { EditComponent } from "./components/EditComponent";
import { NewUpdateComponent } from "./components/NewUpdateComponent";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/allBooks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data); // עדכון ה-state עם הנתונים שהתקבלו
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>Data from Express</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> by{" "}
              <strong>
                <em>{book.author}</em>
              </strong>
              <EditComponent book={book} setSelectedBook={setSelectedBook} setAuthor={setAuthor} setTitle={setTitle}/>
              <DeleteComponent deletedBook={book} setBooks={setBooks} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
      <div className="formDiv">
        <label>
          Title:
          <input
            type="text"
            name="Title"
            onChange={(event) => {setTitle(event.target.value);}}
            placeholder="Enter book title"
            required
            value={title}
          ></input>
        </label>
        <br />
        <br />
        <label>
          Author:
          <input
            type="text"
            name="Author"
            onChange={(event) => {setAuthor(event.target.value);}}
            placeholder="Enter book author"
            value={author}
            required
          ></input>
        </label>
        <br />
        <br />
        <NewUpdateComponent selectedBook={selectedBook} title={title} author={author} setBooks={setBooks} setAuthor={setAuthor} setTitle={setTitle} setSelectedBook={setSelectedBook}/>
      </div>
    </div>
  );
}

export default App;
