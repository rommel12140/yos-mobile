import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ListView  } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import api from '../../../../utilities/api';
import styles from '../../../Themes/ApplicationStyles';

class OrderDetail extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			orderDetails: ds,
		}
	}		

	static navigationOptions = {
		title: 'Order Detail',
		headerStyle: {
			backgroundColor: '#8eb3fb'
		  },
	}

	componentDidMount() {
		const {params} = this.props.navigation.state;
		const order = params ? params.orderDetail : null;
		console.log(order)
		this.setState({
			orderDetails: order
		})

	}

	render() {
		return(
			<View>
				<Text>{this.state.orderDetails.cart_id}</Text>
				<Text>{this.state.orderDetails.created_on}</Text>
				<Text>{this.state.orderDetails.id}</Text>
				<Text>{this.state.orderDetails.is_active}</Text>
				<Text>{this.state.orderDetails.is_deleted}</Text>
				<Text>{this.state.orderDetails.name}</Text>
				<Text>{this.state.orderDetails.paid}</Text>
				<Text>{this.state.orderDetails.payment_method}</Text>
				<Text>{this.state.orderDetails.total_cost}</Text>
				<Text>{this.state.orderDetails.transaction_id}</Text>
				<Text>{this.state.orderDetails.user_id}</Text>
			</View>
		)
	}
}


function mapStateToProps(state) {
	return { token : state.Token }
}

export default connect(mapStateToProps)(OrderDetail);

AppRegistry.registerComponent('OrderDetail', () => OrderDetail)