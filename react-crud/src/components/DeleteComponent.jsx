import React from 'react'

export const DeleteComponent = ({deletedBook,setBooks}) => {
    const deleteBook = () => {
        fetch(`http://localhost:5000/books/${deletedBook.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete book");
            }
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== deletedBook.id));
          })
          .catch((error) => console.error("Error deleting book:", error));
      };
  return (
    <button onClick={() => deleteBook()}>Delete</button>
  )
}
