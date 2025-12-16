import React from 'react'
import {useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {useFirebase} from '../context/Firebase.jsx';

function BookListing() {
    const firebase = useFirebase();
    const [name,setName] = useState('');
    const[isbn,setIsbn] = useState('');
    const [price, setPrice] = useState('');
    const [coverpic, setCoverpic] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await firebase.addDocs(name,isbn,price);
    }
  return (
      <div className="min-h-screen py-8">
        <div className="container-center">
          <div className="form-card">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Add New Book</h2>
              <p className="text-slate-600">Fill in the details below to list your book</p>
            </div>
            
            <Form className="space-y-4">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="text-slate-700 font-medium mb-2">Book Name</Form.Label>
                <Form.Control 
                  onChange={e=> setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  placeholder="Enter book name" 
                  className="border-2 ml-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </Form.Group>

              <Form.Group controlId="formBasicISBN">
                <Form.Label className="text-slate-700 font-medium mb-2">ISBN</Form.Label>
                <Form.Control 
                  onChange={e=> setIsbn(e.target.value)} 
                  value={isbn} 
                  type="text" 
                  placeholder="Enter ISBN" 
                  className="border-2 ml-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPrice">
                <Form.Label className="text-slate-700 font-medium mb-2">Price</Form.Label>
                <Form.Control 
                  onChange={e=> setPrice(e.target.value)} 
                  value={price} 
                  type="text" 
                  placeholder="Enter price" 
                  className="border-2 ml-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </Form.Group>

              <div className="pt-4">
                <button onClick={handleSubmit} type="submit" className="btn btn-primary w-full">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Book
                  </span>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
}

export default BookListing
