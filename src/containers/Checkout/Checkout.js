import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 1,
			bacon: 1,
			cheese: 1,
			meat: 1
		}
	};

	componentDidMount() {
		// console.log('Checkout.componentDidMount()');
		// console.log(this.state.ingredients);
		const query = new URLSearchParams(this.props.location.search);
		// console.log('query');
		// console.log(query);

		const ingredients = {};
		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1];
			// console.log(param);
		}

		this.setState({ingredients: ingredients});
	}

	checkoutCanceledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		// console.log('Checkout.render()');
		// console.log(this.state.ingredients);
		return (
			<div>
				<CheckoutSummary ingredients = {this.state.ingredients}
				                 checkoutCanceled = {this.checkoutCanceledHandler}
				                 checkoutContinued = {this.checkoutContinuedHandler}/>
				<Route path = {this.props.match.path + '/contact-data'} component = {ContactData}/>
			</div>
		)
	}
}

export default Checkout;