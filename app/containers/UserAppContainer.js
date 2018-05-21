import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { createStackNavigator, TabNavigator, TabBarBottom, addNavigationHelpers } from 'react-navigation';
import Dashboard from '../components/User/Dashboard/Dashboard';
import Cart  from '../components/User/Cart/Cart';
import OrderDetail from '../components/User/OrderDetail/OrderDetail';
import Checkout  from '../components/User/Checkout/Checkout';

const UserStack = createStackNavigator(
	{
		Dashboard: Dashboard,
		Cart: Cart,
		OrderDetail : OrderDetail,
		Checkout: Checkout,
	},{
		initialRouteName : 'Dashboard',
		headerMode : 'screen',
});

class AppContainer extends Component {
	static router = UserStack.router;

	constructor(props){
		super(props);
	}
	render() {
		const propsScreen = {...this.props}
		return (
			<UserStack screenProps={propsScreen} navigation={this.props.navigation}/>
		)
	}
}

function mapStateToProps(state) {
	return {
		token: state.Token,
		user : state.User,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
