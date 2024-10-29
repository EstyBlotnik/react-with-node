import React from "react";

export const EditComponent = ({book,setSelectedBook,setAuthor,setTitle}) => {
  const definingSelectedBook = (book) => {
    setSelectedBook(book.id);
    setAuthor(book.author);
    setTitle(book.title);
  };
  return <button onClick={() => definingSelectedBook(book)}>Edit</button>;
};
