import React, {Component} from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		axiosError: null
	};

	updatePurchasable(ingredients) {
		const sum = Object.keys(ingredients).map((igKey) => {
			return ingredients[igKey];
		})
			.reduce((sum, element) => {
				return sum + element;
			}, 0);
		this.setState({purchasable: sum > 0});
	}

	addIngredientHandler = (type) => {
		const updatedCount = this.state.ingredients[type] + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		this.setState({
			totalPrice: updatedTotalPrice, ingredients: updatedIngredients
		});
		this.updatePurchasable(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] > 0) {
			const updatedCount = this.state.ingredients[type] - 1;
			const updatedIngredients = {
				...this.state.ingredients
			};
			updatedIngredients[type] = updatedCount;
			const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
			this.setState({
				totalPrice: updatedTotalPrice, ingredients: updatedIngredients
			});
			this.updatePurchasable(updatedIngredients);
		}
	};

	purchaseHandler = () => {
		this.setState({purchasing: true});
	};

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	};

	purchaseContinueHandler = () => {
		this.setState({loading: true});
		// alert('You continue');
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
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
		axios.post('/orders.j', order)
			.then(response => this.setState({loading: false, purchasing: false}))
			.catch(error => {
				this.setState({loading: false, purchasing: false, axiosError: error});
			});

	};

	errorConfirmedHandler = () => {
		this.setState({axiosError: null})
	};


	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary;
		if (this.state.loading) {
			orderSummary = <Spinner/>
		} else {
			orderSummary =
				<OrderSummary ingredients = {this.state.ingredients}
				              purchasedCancelled = {this.purchaseCancelHandler}
				              purchasedContinued = {this.purchaseContinueHandler}
				              price = {this.state.totalPrice}/>
		}
		// let axiosErrorModal = null
		// if(this.state.axiosError){
		// 	axiosErrorModal =

		// }

		return (
			<Aux>
				<Modal show = {this.state.axiosError} modalClosed = {this.errorConfirmedHandler}>
					{this.state.axiosError ? this.state.axiosError.message : null}
				</Modal>
				<Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients = {this.state.ingredients}/>

				<BuildControls ingredientAdded = {this.addIngredientHandler}
				               ingredientRemoved = {this.removeIngredientHandler}
				               disabled = {disabledInfo}
				               price = {this.state.totalPrice}
				               purchasable = {this.state.purchasable}
				               ordered = {this.purchaseHandler}/>

			</Aux>
		);
	}
}

// export default withErrorHandler(BurgerBuilder, axios);
export default BurgerBuilder;