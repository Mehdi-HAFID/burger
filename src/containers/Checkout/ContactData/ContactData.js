import React, {Component} from "react";
import {connect} from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from '../../../store/actions/index';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {updateObject, checkValidity} from "../../../shared/utility";

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
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				valid: true,
				validation: {},
				value: 'fastest'
			},
		},
		formIsValid: false
	};

	orderHandler = (event) => {
		event.preventDefault();

		// alert('You continue');

		let formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderDara: formData,
			userId: this.props.userId
		};
		this.props.onOrderBurger(order, this.props.token);
	};

	inputChangeHandler = (event, inputIdentifier) => {

		// name, email: are copied. their objects are shallow copy

		const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
			value : event.target.value,
			// Validity
			valid : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
			touched : true
		});

		const updatedOrderFrom = updateObject(this.state.orderForm, {
			[inputIdentifier]: updatedFormElement
		});
		// copy the object value: elementType, value: copied. elementConfig is shallow copied

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
		if (this.props.loading) {
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (oderData, token) => dispatch(actions.purchaseBurger(oderData, token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));