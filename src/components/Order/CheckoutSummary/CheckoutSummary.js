import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
	// console.log(props.ingredients);
	// console.log('***checkoutSummary');
	return (
		<div className = {classes.CheckoutSummary}>
			<h1>We hope it taste well!</h1>
			<div style = {{width: '100%', margin: 'auto'}}>
				<Burger ingredients = {props.ingredients}/>
			</div>
			<Button btnType = 'Danger' clicked = {props.checkoutCanceled}>Cancel</Button>
			<Button btnType = 'Success' clicked = {props.checkoutContinued}>Continue</Button>
		</div>
	)
};

export default checkoutSummary;