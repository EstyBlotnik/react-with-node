const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const PORT = 5000;
let books = [
  { id: 1, title: "book 1", author: "first" },
  { id: 2, title: "book 2", author: "second" },
];
// מסלול ברירת מחדל
app.get("/", (req, res) => {
  res.send("ברוכים הבאים לשרת ה-Express שלי!");
});

app.get("/allBooks", (req, res) => {
  res.json(books);
});

app.post("/addBook", (req, res) => {
  const bookId = books.length + 1;
  book = { id: bookId, title: req.body.title, author: req.body.author };
  books.push(book);
  console.log(books);
  res.status(200).json({ message: "Book uddad successfully", book });
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id); // קבלת ה-id מהפרמטרים והמרה למספר
  const { title, author } = req.body; // הנתונים החדשים שנשלחו בבקשה
  console.log(bookId);
  console.log(title, author);

  // מציאת הספר עם ה-id המבוקש
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    // עדכון הספר עם הנתונים החדשים
    books[bookIndex] = { ...books[bookIndex], title, author };
    res
      .status(200)
      .json({ message: "Book updated successfully", book: books[bookIndex] });
  } else {
    // אם הספר לא נמצא
    res.status(404).json({ message: "Book not found" });
  }

  console.log(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "ספר לא נמצא" });
  }
  console.log(books);
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id); // המרת ה-ID ל-מספר שלם
  const bookIndex = books.findIndex((book) => book.id === bookId);
  console.log(bookIndex);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  books = books.filter((book) => book.id !== bookId);
  console.log(books);
  res.status(200).json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`השרת פועל בכתובת http://localhost:${PORT}`);
});
