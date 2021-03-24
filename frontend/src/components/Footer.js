import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Col className='text-center py-3'/>
                Copyright &copy; Piotr Kocik
            </Container>
        </footer>
    )
}

export default Footer;
