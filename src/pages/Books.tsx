import React from "react";

const books = [
  { title: "Book One", description: "First book description." },
  { title: "Book Two", description: "Second book description." }
];

const Books = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Books</h1>
    <ul>
      {books.map((book, idx) => (
        <li key={idx} className="mb-4">
          <h2 className="text-xl">{book.title}</h2>
          <p>{book.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default Books;