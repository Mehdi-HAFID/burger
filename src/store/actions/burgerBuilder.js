import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	}
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	}
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
};

export const fetchingIngredientsFailed = () => {
	return {
		type: actionTypes.SET_INGREDIENTS,
	}
};

export const initIngredients = () => {
	return dispatch => {
		axios.get('https://burger-m.firebaseio.com/ingredients.json').then(response => {
			// this.setState({ingredients: response.data});
			dispatch(setIngredients(response.data));
		}).catch(error => {
			dispatch(fetchingIngredientsFailed())
			// this.setState({error: true});
		});
	}
}