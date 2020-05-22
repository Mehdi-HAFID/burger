import React, {Component} from "react";
import {connect} from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		// axiosError: null
		error: false
	};

	componentDidMount() {
		// axios.get('https://burger-m.firebaseio.com/ingredients.json').then(response => {
		// 	this.setState({ingredients: response.data});
		// }).catch(error => {
		// 	this.setState({error: true});
		// });
	}

	updatePurchasable(ingredients) {
		const sum = Object.keys(ingredients).map((igKey) => {
			return ingredients[igKey];
		})
			.reduce((sum, element) => {
				return sum + element;
			}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	};

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	};

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	};

	// errorConfirmedHandler = () => {
	// 	this.setState({axiosError: null})
	// };


	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary;
		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
		console.log(this.props.ings);
		if (this.props.ings) {

			burger = <Aux>
				<Burger ingredients = {this.props.ings}/>

				<BuildControls ingredientAdded = {this.props.onIngredientAdded}
				               ingredientRemoved = {this.props.onIngredientRemoved}
				               disabled = {disabledInfo}
				               price = {this.props.price}
				               purchasable = {this.updatePurchasable(this.props.ings)}
				               ordered = {this.purchaseHandler}/>
			</Aux>;
			orderSummary =
				<OrderSummary ingredients = {this.props.ings}
				              purchasedCancelled = {this.purchaseCancelHandler}
				              purchasedContinued = {this.purchaseContinueHandler}
				              price = {this.props.price}/>
		}
		if (this.state.loading) {
			orderSummary = <Spinner/>
		}

		return (
			<Aux>
				{/*<Modal show = {this.state.axiosError} modalClosed = {this.errorConfirmedHandler}>*/}
				{/*	{this.state.axiosError ? this.state.axiosError.message : null}*/}
				{/*</Modal>*/}
				<Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}

			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (igName) => dispatch(burgerBuilderActions.addIngredient(igName)),
		onIngredientRemoved: (igName) => dispatch(burgerBuilderActions.removeIngredient(igName))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
// export default BurgerBuilder;