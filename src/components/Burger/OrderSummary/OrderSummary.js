import React from "react";

import Aux from "../../../hoc/Auxiliary";

const orderSummary = (props) => {
	const ingredients = Object.keys(props.ingredients).map(igKey => {
		return (
			<li key={igKey}>
				<span style = {{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
			</li>
		);
	})
	// <li>Meat : 2</li>
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredients}
			</ul>
			<p>Continue to Checkout?</p>
		</Aux>
	);
};

export default orderSummary;