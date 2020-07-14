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
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
	state = {
		purchasing: false,

	};

	componentDidMount() {
		this.props.onInitIngredients();
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
		if (this.props.isAuthenticated) {
			this.setState({purchasing: true});
		} else {
			this.props.onSetAuthRedirectPath("/checkout")
			this.props.history.push("/auth");
		}
	};

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
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
		let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

		if (this.props.ings) {

			burger = <Aux>
				<Burger ingredients = {this.props.ings}/>

				<BuildControls ingredientAdded = {this.props.onIngredientAdded}
				               ingredientRemoved = {this.props.onIngredientRemoved}
				               disabled = {disabledInfo}
				               price = {this.props.price}
				               purchasable = {this.updatePurchasable(this.props.ings)}
				               ordered = {this.purchaseHandler}
				               isAuth = {this.props.isAuthenticated}/>
			</Aux>;
			orderSummary =
				<OrderSummary ingredients = {this.props.ings}
				              purchasedCancelled = {this.purchaseCancelHandler}
				              purchasedContinued = {this.purchaseContinueHandler}
				              price = {this.props.price}/>
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
		onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
// export default BurgerBuilder;