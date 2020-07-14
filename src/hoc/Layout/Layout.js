import React, {Component} from "react";
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: prevState.showSideDrawer ? false : true};
		})
	};

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}
				         isAuth = {this.props.isAuthenticated}/>
				<SideDrawer closed = {this.sideDrawerClosedHandler} open = {this.state.showSideDrawer}
				            isAuth = {this.props.isAuthenticated}/>
				<main className = {classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	};
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps)(Layout);