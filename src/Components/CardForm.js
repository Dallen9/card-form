import React, { Fragment,  useState, useEffect } from 'react';
import { Card, Container, Col, Row, Button, Form} from 'react-bootstrap';
import FrontSide from './FrontSide';
import Backside from './BackSide';
import ReactCardFlip from 'react-card-flip';
import Success from './Success';

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
		// eslint-disable-next-line
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


	const onSubmit = (e) => {
	e.preventDefault();

	if(cardNumber.length < 2 || cardNumber.length !== 19 || type === 'Invalid') {
		setError(true);
	} else if (name.length < 2) {
		setError(true);
	} else if (month === '' || year === '') {
		setError(true);
	} else if (cvv.length < 3 || cvv.length === '') {
		setError(true)
	} else {
		setError(false);
		setValidated(true);
	}
	}
	
	useEffect(() => {
		if(type !== 'Invalid') {
			setError(false);
		}

	}, [type])

	return (
		<Fragment>
			<Container fluid>
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
										isInvalid={type === 'Invalid' || error ? !validated : validated && error}
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
										minLength='2'
										isInvalid={error}
									/>
									<Form.Control.Feedback type='invalid' >
										Your name must be 2 characters or more
									</Form.Control.Feedback>
								</Form.Group>
								<Row >
									<Col xs='6' md>
										<Form.Text>Expiration Date</Form.Text>
										<Form.Control
											as='select'
											defaultValue='Month'
											name='month'
											onChange={onChange}
											value={month}
											isInvalid={error}
											>
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
										<Form.Control.Feedback type='invalid' >
										Please enter a month
									</Form.Control.Feedback>
									</Col>
									<Col xs>
										<Form.Text style={{ color: 'white' }}>year</Form.Text>
										<Form.Control
											as='select'
											defaultValue='Year'
											name='year'
											onChange={onChange}
											value={year}
											isInvalid={error}
											>
											<option>Year</option>
											<option>2021</option>
											<option>2022</option>
											<option>2023</option>
											<option>2024</option>
											<option>2025</option>
											<option>2026</option>
											<option>2027</option>
										</Form.Control>
										<Form.Control.Feedback type='invalid' >
										Please enter a year
									</Form.Control.Feedback>
									</Col>
									<Col xs='6' md>
										<Form.Text>CVV</Form.Text>
										<Form.Control
											type='text'
											name='cvv'
											onChange={onChange}
											value={cvv}
											onFocusCapture={flip}
											onBlurCapture={flip}
											maxLength='4'
											isInvalid={error}
											>
											</Form.Control>
											<Form.Control.Feedback type='invalid' >
										Cvv must be 3 or 4 numbers
									</Form.Control.Feedback>
									</Col>
								</Row>
								{validated && !error? 
									<>
									<Success  onSubmit={validated} name={name} notValid={!validated} />
									</>
									: 
									<Button
									variant='primary'
									type='submit'
									style={{ marginTop: '1rem' }}
									block>
									Submit
									</Button>
								}
							</Form>
						</Card.Body>
					</Card>
					</Container>
				</Container>
		</Fragment>
	);
}
const cardStyle =  {
	zIndex: '2',
	color: 'white',
	width: '35%',
	position: 'relative',
	top: '100px ',
	height: '100% !important'
}

export default CardForm;
