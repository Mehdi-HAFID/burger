import React from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingredients = Object.keys(props.ingredients).map(igKey => {
		return (
			<li key={igKey}>
				<span style = {{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
			</li>
		);
	});
	// <li>Meat : 2</li>
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredients}
			</ul>
			<p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
			<p>Continue to Checkout?</p>
			<Button btnType = 'Danger' clicked={props.purchasedCancelled}>Cancel</Button>
			<Button btnType = 'Success' clicked={props.purchasedContinued}>Continue</Button>
		</Aux>
	);
};

export default orderSummary;