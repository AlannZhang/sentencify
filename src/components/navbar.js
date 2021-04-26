import { Nav, Navbar } from 'react-bootstrap';
import { React } from 'react';

const NavBar = (() => (
  <Navbar>
    <Navbar.Collapse>
      <Nav
        className='navbar-expand-md'
        as='ul'
      >
        <Nav.Link href='/logout'> Logout </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
));

export default NavBar;
