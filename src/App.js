import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner'

const asyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));

const asyncOrders = React.lazy(() => import('./containers/Orders/Orders'));

const asyncAuth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {

	componentDidMount() {
		this.props.onTryAutoSignUp();
	}

	render() {
		let routes = (
			<Suspense fallback = {Spinner}>
				<Switch>
					<Route path = "/auth" component = {asyncAuth}/>
					<Route path = '/' exact component = {BurgerBuilder}/>
					<Redirect to = "/"/>
				</Switch>
			</Suspense>
		);
		if (this.props.isAuthenticated) {
			routes = (
				<Suspense fallback = {Spinner}>
					<Switch>
						<Route path = '/checkout' component = {asyncCheckout}/>
						<Route path = '/orders' component = {asyncOrders}/>
						<Route path = "/logout" component = {Logout}/>
						<Route path = "/auth" component = {asyncAuth}/>
						<Route path = '/' exact component = {BurgerBuilder}/>
						<Redirect to = "/"/>
					</Switch>
				</Suspense>
			);
		}


		return (
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckState())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default withRouter(connect(null, mapDispatchToProps)(App));