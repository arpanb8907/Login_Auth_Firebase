// Navbar.jsx
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { auth } from './firebase';
import { toast } from 'react-toastify';

const Navbar1 = () => {
    async function handleSignout() {
        try {
          await auth.signOut();
          window.location.href = "/login";
          console.log("user logged out succesfully");
          toast.success("User logged out successfully", {
            position: "top-center",
          });
        } catch (error) {
          toast.error(
            `Error: ${
              error.response ? error.response.data.message : error.message
            }`,
            {
              position: "bottom-center",
            }
          );
        }
      }
    //console.log(auth.currentUser)
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '60px', padding: '20px' }}>
      <Navbar.Brand href="#home">TodoApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="d-flex ms-auto me-3">
          <FormControl
            type="search"
            placeholder="Search"
            className="search-bar"
            aria-label="Search"
          />
        </Form>
        <Nav className="ms-auto">
          
          {auth.currentUser && <NavDropdown title="Profile" id="basic-nav-dropdown"style={{ marginLeft: '-40px' }}>
            <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login" onClick={handleSignout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar1;
