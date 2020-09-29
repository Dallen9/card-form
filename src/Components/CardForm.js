import React, { Fragment, useState, useEffect } from 'react';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import visa from '../assets/visa.svg';
import MasterCard from '../assets/mastercard1.png';
import chip from '../assets/card-chip.png';
import Form from 'react-bootstrap/Form';

function CardForm() {
	let part1 = '';
	let part2 = '';
	let part3 = '';
	let part4 = '';
	let format = '';


	const [cardUser, setCardUser] = useState({
		cardNumber: '',
		name: '',
		year: '',
		month: '',
		cvv: '',
	});



	const { cardNumber, name, year, month, cvv } = cardUser;

	// cardNumber.replace(/[^0-9]/g, '');

	let checkType = cardNumber.substring(0, 2);
	
	let type = '';



	if (checkType.length == 2) {
		checkType = parseInt(checkType);
		if (checkType >= 40 && checkType <= 49) {
			type = 'Visa';
		} else if (checkType >= 51 && checkType <= 55) {
			type = 'Master Card';
		} else if ((checkType >= 60 && checkType <= 62) || checkType == 64) {
			type = 'Discover';
		} else if (checkType == 34 || checkType == 37) {
			type = 'American Express';
		} 
	}

	part1 = cardNumber.substring(0, 4);
	if (part1.length === 4) {
		part1 = part1 + ' ';
	}

	if (type == 'Visa' || type == 'Master Card' || type == 'Discover') {
		part2 = cardNumber.substring(5, 9);
		if (part2.length === 4) {
			part2 = part2 + ' ';
		}

		part3 = cardNumber.substring(10, 14);
		if (part3.length === 4) {
			part3 = part3 + ' ';
		}

		part4 = cardNumber.substring(15, 19);
	} else if (type == 'American Express') {
		// for Amex cards
		part2 = cardNumber.substring(5, 10);
		if (part2.length === 6) {
			part2 = part2 + ' ';
		}
		part3 = cardNumber.substring(11, 15);
		part4 = '';
	} else if (type == 'Invalid') {
		// for Amex cards
		part1 = type;
		part2 = '';
		part3 = '';
		part4 = '';
		// alert('Invalid Card Number');
	}
	
	format = part1 + part2 + part3 + part4;

	
	const process = (character) => {
		part1= '####';
		part2= '####';
		part3= '####';
		part4= '####';
		format = part1 + part2 + part3 + part4;
		console.log(format)
		for(let i = 0; i < format.length; i++) {
			 format.charAt(i);
		}
	
	  };
	
	  useEffect(() => {
		  
	
	  }, [cardNumber])
	


	const onChange = (e) => {
		setCardUser({
			...cardUser,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Fragment>
			<Container>
				<Container className='card-container'>
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
											{format}
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
										{/* </Container> */}
									</Col>
								</Row>
							</Container>
						</Card.Body>
					</Card>
					<Card className='form-input'>
						<Card.Body>
							<Form className='card-input'>
								<Form.Group controlId='cardNumber'>
									<Form.Text>Card Number</Form.Text>

									<Form.Control
										type='text'
										name='cardNumber'
										onChange={onChange}
										value={format}
										maxLength='19'
										required
									/>
									<Form.Control.Feedback>
										{type == 'Invalid' ? <h2>Invalid</h2> : null}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId='name'>
									<Form.Text>Card Name</Form.Text>
									<Form.Control
										type='text'
										name='name'
										onChange={onChange}
										value={name}
									/>
								</Form.Group>
								<Form.Row>
									<Form.Group as={Col} controlId='month'>
										<Form.Text>Expiration Date</Form.Text>
										<Form.Control
											as='select'
											defaultValue='Month'
											name='month'
											onChange={onChange}
											value={month}>
											<option>Month</option>
											<option>01</option>
											<option>02</option>
											<option>03</option>
											<option>04</option>
											<option>05</option>
											<option>06</option>
											<option>07</option>
											<option>08</option>
											<option>09</option>
											<option>10</option>
											<option>11</option>
											<option>12</option>
										</Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId='year'>
										<Form.Text style={{ color: 'white' }}>year</Form.Text>
										<Form.Control
											as='select'
											defaultValue='Year'
											name='year'
											onChange={onChange}
											value={year}>
											<option>Year</option>
											<option>2021</option>
											<option>2022</option>
											<option>2023</option>
											<option>2024</option>
											<option>2025</option>
											<option>2026</option>
											<option>2027</option>
										</Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId='cvv'>
										<Form.Text>CVV</Form.Text>
										<Form.Control
											type='text'
											name='cvv'
											onChange={onChange}
											value={cvv}
											maxLength='4'></Form.Control>
									</Form.Group>
								</Form.Row>
								<Button
									variant='primary'
									type='submit'
									style={{ marginTop: '1rem' }}
									block>
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Container>
			</Container>
		</Fragment>
	);
}

export default CardForm;
