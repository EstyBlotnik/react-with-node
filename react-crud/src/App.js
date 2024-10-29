import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

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

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const addBook = (event) => {
    event.preventDefault(); // מניעת רענון הדף כאשר הטופס נשלח

    // שליחת הבקשה לשרת
    fetch("http://localhost:5000/addBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }), // המרת האובייקט ל-JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // הוספת הספר החדש למערך הספרים, אם זה רלוונטי
        setBooks((prevBooks) => [...prevBooks, data.book]); // הוספת הספר החדש לרשימה
        setTitle(""); // ניקוי שדה הכותרת
        setAuthor(""); // ניקוי שדה המחבר
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateBook = () => {
    fetch(`http://localhost:5000/books/${selectedBook}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        // עדכון הספר במערך על ידי setBooks
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === selectedBook ? { ...book, title, author } : book
          )
        );
        setAuthor("");
        setTitle("");
        setSelectedBook(null);
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  const deleteBook = (bookId) => {
    fetch(`http://localhost:5000/books/${bookId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete book");
        }
        // עדכון ה-state לאחר המחיקה
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  const definingSelectedBook = (book) => {
    setSelectedBook(book.id);
    setAuthor(book.author);
    setTitle(book.title);
  };

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
              <button onClick={() => definingSelectedBook(book)}>Edit</button>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
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
            onChange={changeTitle}
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
            onChange={changeAuthor}
            placeholder="Enter book author"
            value={author}
            required
          ></input>
        </label>
        <br />
        <br />
        <button onClick={selectedBook? updateBook:addBook}>Add Book</button>
      </div>
    </div>
  );
}

export default App;
