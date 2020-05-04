import React, {Component} from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildConrols from '../../components/BuildControls/BuildControls';

class BurgerBuilder extends Component{
	state = {
		ingredients : {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		}
	};

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients}/>

				<BuildConrols />

			</Aux>
		);
	}
}

export default BurgerBuilder;