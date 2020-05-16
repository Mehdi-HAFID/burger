import React from 'react';

import classes from './Order.module.css';

const order = (props) => {

	const ingredients = [];
	for (let key in props.ingredients) {
		ingredients.push({
			name: key,
			amount: props.ingredients[key]
		})
	}

	let outputIngredients = ingredients.map(ig => {
		return (<span key = {ig.name}
		              style = {{
			              textTransform: 'capitalize',
			              display: 'inline-block',
			              margin: '0 8px',
			              border: '1px solid #ccc',
			              padding: '5px'
		              }}
		> {ig.name} : ( {ig.amount} )</span>)
	});

	return (
		<div className = {classes.Order}>
			<p>Ingredients: {outputIngredients}</p>
			<p>Price: <strong>{props.price.toFixed(2)}</strong></p>
		</div>
	);
};

export default order;