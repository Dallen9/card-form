import React, {useEffect} from 'react'
import { Card, Form, Container, Col, Row} from 'react-bootstrap';
import visa from '../assets/visa.svg';
import MasterCard from '../assets/mastercard1.png';
import chip from '../assets/card-chip.png';

function DebitCard({card, type, format, onChange}) {
    const {defaultNum, cardNumber, name, year, month, cvv} = card;

    return (
        <Card className='debit'>
            <Card.Body style={{ paddingTop: '0' }}>
                {type === 'Master Card' ? (
                    <img
                        src={MasterCard}
                        alt='Master card'
                        className='logo'
                        style={{ marginTop: '1.8rem' }}
                    />
                ) : (
                    <img src={visa} alt='visa' className='logo' />
                )}

                <Container className='chip'>
                    <Row>
                        <Col>
                            <img src={chip} alt='chip' style={{ height: '50px' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>
                                <Form.Control
                                defaultValue={defaultNum}
                                onChange={onChange}
                                value={defaultNum}
                                disabled
                                />

                                
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8}>
                            <Form.Text style={{ color: 'white' }}>
                                Card Holder
                            </Form.Text>
                            <h5>{name}</h5>
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

export default DebitCard
