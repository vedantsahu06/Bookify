import React from "react";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = async () => {
    await firebase.signOutFunc();
    // navigate('/login');
  };
  const [booksList, setBooksList] = useState([]);
  useEffect(() => {
    firebase.listAllBooks().then((books) => {
      console.log(books.docs[0]._document.data.value.mapValue.fields);
      setBooksList(books.docs);
    });
  }, []);
  console.log("list", booksList);
  //   console.log("list2",booksList.author);

  const handleViewBook = (book) => {
    console.log("handle",book);
    
    navigate(`/book/view/${book._document.data.value.mapValue.fields.name.stringValue}`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-center">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome to Bookify</h1>
              <p className="text-lg text-slate-600">Your one-stop solution for all your book needs.</p>
            </div>
            <div>
              {firebase.isLoggedIn ? (
                <button onClick={handleLogout} className="btn btn-danger">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </span>
                </button>
              ) : (
                <button onClick={handleLogin} className="btn btn-primary">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Books Grid Section */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Available Books
          </h2>
          
          {booksList.length === 0 ? (
            <div className="card text-center py-12">
              <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-slate-500 text-lg">No books available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {booksList.map((book, idx) => (
                <div key={idx} className="book-card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 flex-1">
                      {book._document.data.value.mapValue.fields.name.stringValue}
                    </h3>
                    <span className="badge badge-info ml-2">
                      ${book._document.data.value.mapValue.fields.price.stringValue}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">Author:</span>
                      <span className="ml-1">{book._document.data.value.mapValue.fields.author.stringValue}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-600">
                      <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <span className="font-medium">ISBN:</span>
                      <span className="ml-1 font-mono text-xs">{book._document.data.value.mapValue.fields.isbn.stringValue}</span>
                    </div>
                    <button onClick={()=>(navigate(`view/${book._document.data.value.mapValue.fields.name.stringValue}`))} className="btn btn-primary">View</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
