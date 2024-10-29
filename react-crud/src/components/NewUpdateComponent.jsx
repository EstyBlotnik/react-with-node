import React from "react";

export const NewUpdateComponent = ({
  selectedBook,
  title,
  author,
  setBooks,
  setAuthor,
  setTitle,
  setSelectedBook,
}) => {
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
  return (
    <button onClick={selectedBook ? updateBook : addBook}>Add Book</button>
  );
};
