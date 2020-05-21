import React, {Component} from "react";
import {connect} from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";


class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false
			},

			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
					isNumeric: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'chepeast', displayValue: 'Chepeast'}
					]
				},
				valid: true,
				validation: {},
				value: ''
			},
		},
		formIsValid: false,
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		// alert('You continue');

		let formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderDara: formData
		};
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({
					loading: false
				});
			});
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid
		}

		return isValid;
	};

	inputChangeHandler = (event, inputIdentifier) => {
		const updatedOrderFrom = {...this.state.orderForm};
		// name, email: are copied. their objects are shallow copy

		const updatedFormElement = {...updatedOrderFrom[inputIdentifier]};
		// copy the object value: elementType, value: copied. elementConfig is shallow copied

		updatedFormElement.value = event.target.value;
		// copy mutated.

		//Validity
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		// console.log(updatedFormElement);
		updatedFormElement.touched = true;

		updatedOrderFrom[inputIdentifier] = updatedFormElement;
		//set new changed element instead of the old one

		let formIsValid = true;
		for (let key in updatedOrderFrom) {
			formIsValid = updatedOrderFrom[key].valid && formIsValid;
		}

		this.setState({orderForm: updatedOrderFrom, formIsValid: formIsValid});
		//merge
	};

	render() {
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({id: key, config: this.state.orderForm[key]})
		}
		let form = <form onSubmit = {this.orderHandler}>
			{formElementArray.map(element => (
				<Input key = {element.id}
				       elementType = {element.config.elementType}
				       elementConfig = {element.config.elementConfig}
				       value = {element.config.value}
				       changed = {(event) => this.inputChangeHandler(event, element.id)}
				       invalid = {!element.config.valid}
				       shouldValidate = {element.config.validation}
				       touched = {element.config.touched}/>
			))}

			<Button btnType = 'Success' disabled = {!this.state.formIsValid}> ORDER </Button>
		</form>;
		if (this.state.loading) {
			form = <Spinner/>;
		}
		return (
			<div className = {classes.ContactData}>
				<h1>Enter Your Contact Data</h1>
				{form}
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

export default connect(mapStateToProps)(ContactData);