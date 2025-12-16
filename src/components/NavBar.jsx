import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-md mb-0" style={{backgroundColor: '#1e293b'}}>
        <Container>
          <Navbar.Brand href="/" className="font-bold text-xl flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Bookify</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="text-slate-200 hover:text-white px-3 py-2 rounded transition-colors">
                Home
              </Nav.Link>
              <Nav.Link href="/book/listing" className="text-slate-200 hover:text-white px-3 py-2 rounded transition-colors">
                Add Listing
              </Nav.Link>
              <Nav.Link href="/login" className="text-slate-200 hover:text-white px-3 py-2 rounded transition-colors">
                Login
              </Nav.Link>
              <Nav.Link href="/orders" className="text-slate-200 hover:text-white px-3 py-2 rounded transition-colors">
                Orders
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;