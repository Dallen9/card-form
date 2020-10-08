import React from 'react'
import { Card, Form, Container, Col, Row} from 'react-bootstrap';
import visa from '../assets/visa.svg';
import MasterCard from '../assets/mastercard1.png';
import chip from '../assets/card-chip.png';

function FrontSide({card, type, format}) {
    const {cardNumber, name, year, month} = card;

    return (
        <Card className='backImage' id='FrontSide'>
            <Card.Body className='card-front'>
                {type === 'Master Card' ? (
                    <img
                        src={MasterCard}
                        alt='Master card'
                        className='master'
                    />
                ) : (
                    <img src={visa} alt='visa' className='logo' />
                )}

                <Container className='display-input' fluid>
                    <Row>
                        <Col>
                            <img src={chip} alt='chip' className='chip' />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>
                            {cardNumber ? format : '#### #### #### ####'}
                            </h3>
                        </Col>
                    </Row>
                    <Row className='front-row'>
                        <Col >
                            <Form.Text style={{ color: 'white' }}>
                                Card Holder
                            </Form.Text>
                            <h6>{name}</h6>
                        </Col>
                        <Col>
                            <Form.Text style={{ color: 'white' }}>Expires</Form.Text>
                            {month || year ? (
                                <h6>
                                    {month}/{year}{' '}
                                </h6>
                            ) : null}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default FrontSide
