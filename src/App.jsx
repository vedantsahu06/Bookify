import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginDone from "./pages/LoginDone";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar.jsx";
import BookListing from "./pages/BookListing.jsx";
import BookView from "./pages/Bookview.jsx";
import ViewOrders from "./pages/ViewOrders.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/done" element={<LoginDone />} />
        <Route path="/book" element={<BookListing />}>
          <Route path="listing" element={<BookListing />} />
          
        </Route>
        <Route path="/view/:bookId" element={<BookView />} />
        <Route path="/orders" element={<ViewOrders />} />
      </Routes>
    </>
  );
}

export default App;