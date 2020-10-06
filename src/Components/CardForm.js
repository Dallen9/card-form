import React, { Fragment,  useState } from 'react';
import { Card, Container, Col, Button, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FrontSide from './FrontSide';
import Backside from './BackSide';
import ReactCardFlip from 'react-card-flip';
import success from './Success';

function CardForm() {

	const [cardUser, setCardUser] = useState({
		cardNumber: '',
		name: '',
		year: '',
		month: '',
		cvv: ''
	});
	const [isFlipped, setIsFlipped] = useState(false);
	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(false);

	const {cardNumber, name, year, month, cvv} = cardUser;

	let checkType = cardNumber.substring(0, 2);
	
	let type = '';


	if (checkType.length === 2) {
		checkType = parseInt(checkType);
		if (checkType >= 40 && checkType <= 49) {
			type = 'Visa';
		} else if (checkType >= 51 && checkType <= 55) {
			type = 'Master Card';
		} else if ((checkType >= 60 && checkType <= 62) || checkType === 64) {
			type = 'Discover';
		} else if (checkType === 34 || checkType === 37) {
			type = 'American Express';
		} else {
			type = 'Invalid';
		}
	}

	
	const cc_format = (value) => {
		let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		let matches = v.match(/\d{4,16}/g);
		let match = matches && matches[0] || ''
		let parts = []
		for (let i=0; i < match.length; i+=4) {
		  parts.push(match.substring(i, i+4))
		}
		if (parts.length) {
		  return parts.join(' ')
		} else {
		  return value
		}
	  }
	
	let format = cc_format(cardNumber);

	const flip = () => {
		setIsFlipped({isFlipped: !isFlipped})
	}

	const onChange = (e) => {
		let value = e.target.value
	
		setCardUser({
			...cardUser,
			[e.target.name]: value
		});	
	};

	const cardStyle =  {
		zIndex: '2',
		color: 'white',
		margin: '0 !important',
		// borderRadius: '2% !important',
		height: 'auto !important',
		width: '35% ',
		position: 'relative',
		top: '100px',
	}
	

	const onSubmit = (e) => {
	e.preventDefault();
	// const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
	//   e.stopPropagation();
	// setValidated(false)
	// setError(false);
	// } else {
	// 	setValidated(true);

	// }

	if(cardNumber.length < 2 || cardNumber.length != 19 || type === 'Invalid') {
		setError(true);
		// return false;
	} else if (name.length < 2) {
		return false;
	} else if (month === '' || year === '') {
		return false;
	} else if (cvv.length < 3 || cvv.length === '') {
		return false;
	} else {
		setValidated(true);
	}

	// if(validated) {
	// 	<Link to ='/success'>

	// 	</Link>
	// }
	}

	return (
		<Fragment>
			<Container>
				<Container className='card-container'>
					
					<ReactCardFlip containerStyle={cardStyle} isFlipped={isFlipped} infinite flipDirection="horizontal">
					<FrontSide card={cardUser} type={type} format={format} />
					<Backside cvv={cvv} type={type}/>
     			 </ReactCardFlip>
					<Card className='form-input'>
						<Card.Body>							
							<Form noValidate validated={validated} onSubmit={onSubmit} className='card-input'>
								<Form.Group controlId='cardNumber'>
									<Form.Text>Card Number</Form.Text>

									<Form.Control
										type='text'
										name='cardNumber'
										onChange={onChange}
										value={format}
										isInvalid={type === 'Invalid' || error ? !validated : validated && !error}
										maxLength='19'
									/>
									<Form.Control.Feedback type='invalid' >
										Please input a valid credit card number
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
											onFocusCapture={flip}
											onBlurCapture={flip}
											maxLength='4'></Form.Control>
									</Form.Group>
								</Form.Row>
								{validated && !error? 
									<Link to='/success'>
								<Button
									variant='primary'
									type='submit'
									style={{ marginTop: '1rem' }}
									block>
									Submit
								</Button>
								</Link>
								 : <Button
								variant='primary'
								type='submit'
								style={{ marginTop: '1rem' }}
								block>
								Submit
							</Button>}
							</Form>
						</Card.Body>
					</Card>
					</Container>
				</Container>
		</Fragment>
	);
}

export default CardForm;
