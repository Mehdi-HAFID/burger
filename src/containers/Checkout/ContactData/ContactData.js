import React, {Component} from "react";

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		// alert('You continue');
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Imran Hafid',
				address: {
					street: 'Miami N 40',
					zipCode: 33137,
					country: 'USA'
				},
				email: 'mehdi@derbyware.com'
			},
			deliveryMethod: 'Fastest'
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

	render() {
		let form = <form>
			<input type = 'text' name = 'name' placeholder = 'Your Name' className = {classes.Input}/>
			<input type = 'text' name = 'email' placeholder = 'Your Email' className = {classes.Input}/>
			<input type = 'text' name = 'street' placeholder = 'Your Street' className = {classes.Input}/>
			<input type = 'text' name = 'postal' placeholder = 'Your Postal Code' className = {classes.Input}/>
			<Button btnType = 'Success' clicked = {this.orderHandler}>ORDER</Button>
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

export default ContactData;