import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase.jsx";

function Bookview() {
  const params = useParams();
  const bookId = params.bookId;
  const firebase = useFirebase();
  const [book, setBook] = useState();

  useEffect(() => {
    firebase.fetchBookById(bookId).then((data) => setBook(data));
  }, [firebase, bookId]);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    
    const qty = e.target.quantity.value;

    

    console.log("Quantity selected:", qty);
    const result = firebase.addOrder(String(bookId), qty);
    console.log("result",result);
    
  };

  return (
    <div className="m-10 border-2 border-black rounded-lg p-4  w-1/4">
      <h1>Book ID: {bookId}</h1>

      {book ? (
        <div>
          <h2>
            Book Name: {book._document.data.value.mapValue.fields.name.stringValue}
          </h2>
          <h2>
            Author: {book._document.data.value.mapValue.fields.author.stringValue}
          </h2>
          <h2>
            ISBN: {book._document.data.value.mapValue.fields.isbn.stringValue}
          </h2>
          <h2>
            Price: {book._document.data.value.mapValue.fields.price.stringValue}
          </h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      
      <form onSubmit={handleSubmit}>
        <label>Quantity</label>
        <input type="number" name="quantity" min="1" max="100" required className="m-1 p-1 border-2 border-gray-500 rounded-lg" />
        <button type="submit" className="btn btn-primary m-2 ">
          Buy Now
        </button>
      </form>
    </div>
  );
}

export default Bookview;
