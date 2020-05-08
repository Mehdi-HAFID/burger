import React, {} from "react";

import classes from './Burger.module.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
	const keysArray = Object.keys(props.ingredients);        //[salad, meat, ..]
	// My Solution
	/*
	const sizesArray = keysArray.map((igKey) =>{
		return props.ingredients[igKey];
	});
	const finalIngredients = [];
	sizesArray.forEach((value, index) => {
		for(let i = 0; i < parseInt(value); i++){
			// finalIngredients[finalIngredients.length] =
			finalIngredients.push((<BurgerIngredient type={keysArray[index]}
			                                        key={keysArray[index] + i} />));
		}
	});
	*/

	let transformedIngredient = keysArray.map((igKey) => {
		return [...Array(props.ingredients[igKey])]
			// meat => [meat, meat] , Array(size of empty array of meat). Array contains array
			//[[], [], [, ], [, ]] // 1: salad, 2:bacon, 3: cheese*2, 4: meat*2
			.map(((value, index) => {
				return <BurgerIngredient type={igKey} key={igKey + index}/>
			}));
	})
		.reduce((arr, el) => {
			// console.log(el);
			return arr.concat(el);
		}, []);
	// console.log(transformedIngredient);
	if (transformedIngredient.length === 0){
		transformedIngredient = <p>Please start adding ingredients</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top'/>
			{transformedIngredient}
			<BurgerIngredient type='bread-bottom'/>
		</div>
	);
};

export default burger;