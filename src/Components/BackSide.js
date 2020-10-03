import React from 'react'
import { Card, Form, Container} from 'react-bootstrap';
import visa from '../assets/visa.svg';
import MasterCard from '../assets/mastercard1.png';

const BackSide = ({cvv, type}) => {
    return (
        <Card className='backImage'>
            <Card.Body style={{ padding: 0}}>
                <Container fluid className='back-container'>
                    <hr className='strip'/>
                </Container>
                <Container fluid>
                <Form.Group controlId='cvv' >
                    <Form.Text className='cvv'>CVV</Form.Text>
                    <Form.Control
                        className='cvv-input'
                        value={cvv}
                        disabled
                    />
                    </Form.Group>
                </Container>
                
                {type === 'Master Card' ? (
                    <img
                        src={MasterCard}
                        alt='Master card'
                        className='logo'
                        style={{ marginTop: '1rem' }}
                    />
                ) : (
                    <img src={visa} alt='visa' className='logo' />
                )}
                
            </Card.Body>
        </Card>
    )
}

export default BackSide
