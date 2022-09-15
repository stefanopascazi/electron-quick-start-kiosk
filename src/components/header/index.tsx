import React from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

const Header: React.FC = () => {

    const [show, setShow] = React.useState<boolean>(false);

    return <Navbar bg="light" variant="light" sticky='top'>
        <Container fluid>
            <Nav className="me-auto">
                <Button type='button' variant='primary' size='sm' className='mx-1 px-3' onClick={() => setShow(true)}>Menu</Button>
                <Button type='button' variant='success' size='sm' className='mx-1 px-3'>Salva</Button>
                <Button type='button' variant='danger' size='sm' className='mx-1 px-3'>Cancella</Button>
            </Nav>
        </Container>
        <Offcanvas show={show} onHide={() => setShow(false)} scroll={true} backdrop={true} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
}

export default Header