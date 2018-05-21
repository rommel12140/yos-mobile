import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, ListView, TouchableHighlight, RefreshControl, ScrollView } from 'react-native';
import { List, ListItem, Button, Card, ButtonGroup, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import ActionButton from 'react-native-action-button';
import Logout from '../../Logout/Logout';
import styles from '../../../Themes/LoginStyles';

class Dashboard extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			orders: ds,
			selectedIndex : 0,
			data: [],
			refreshing: false,
		}
	}


	static navigationOptions = {
		title: 'Dashboard',
		headerStyle: {
			backgroundColor: '#8eb3fb'
		  },
		headerRight: (
			<Logout />
		),
	};

	componentDidMount() {
		this.loadOrders();
	}

	loadOrders(){
		this.props.screenProps.fetchOrders(this.props.screenProps.token, this.props.screenProps.user).then(() => {
			return this.orders()
		}).then((orders) => {
			console.log(orders);
			this.__serializeResponse(orders);
		}).then(() => {
			this.setState({refreshing: false});
		  });
	}

	_onRefresh() {
		this.setState({refreshing: true});
		this.loadOrders()
	}
	
	__serializeResponse(response){
		//this.$.progress.disabled = true;
		let result = Object.keys(response).map(function(key){
			return {
				value : response[key]["value"]
			}
		})
		this.setState({
			orders : this.state.orders.cloneWithRows(result[0].value.data),
			data : result[0].value.data
		});
	}

	orders() {
		return Object.keys(this.props.setOrders).map((key) => {
				return this.props.setOrders[key]
			}
		);
	}
	
	renderRow(order, sectionId, rowId, hightlightRow) {
		const { navigate } = this.props.navigation;		
		return (
			<TouchableHighlight 
				underlayColor='blue'
				//onPress = { () => this.props.navigation.navigate('OrderDetail', {orderDetail: order})}
				>
				<ListItem roundAvatar 
						hideChevron
						key={order.transaction_id} 
						title={<Text style={{ padding: 5, fontSize : 17 , fontWeight : 'bold'}}>{order.created_on}</Text>}
						avatar='https://www.designboom.com/wp-content/uploads/2016/07/patricia-piccinini-graham-transport-accident-commission-designboom-1800.jpg'
						subtitle={
							<View style={{paddingLeft : 5}}>
								<Text>Payment Method: {order.payment_method}</Text>
								<Text>Total: Php <Text style={{fontWeight : 'bold'}}> {order.total_cost}</Text></Text>
								<Text style={{fontWeight : 'bold', color : order.paid ? "green" : "red"}}>{ order.paid ? "Paid" : "Not Paid"}</Text>
							</View>
						}
				/>
			</TouchableHighlight>
		)
	}

	updateIndex (selectedIndex) {
		this.setState({selectedIndex});
		switch(selectedIndex){
			case 0:	this.filterData("all");
					break;
			case 1: this.filterData("notPaid");
					break;
			case 2:	this.filterData("paid");
					break;
		}
	}

	filterData(filterBy){
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.setState({
			orders: ds,
		})
		switch(filterBy){
			case "all"		: this.setState({
								orders : this.state.orders.cloneWithRows(this.state.data),
							});
							break;
			case "notPaid" 	: this.setState({
								orders : this.state.orders.cloneWithRows(this.state.data.filter(item => item.paid === false)),
							});
							break;
			case "paid"		: this.setState({
								orders : this.state.orders.cloneWithRows(this.state.data.filter(item => item.paid === true)),
							});
							break;
		}
	}
	render() {
  		const { selectedIndex } = this.state.selectedIndex
		return (
			<View style={[styles.mainContainer]}>
				<ScrollView style={{flex:1}}
					refreshControl={
						<RefreshControl
						  refreshing={this.state.refreshing}
						  onRefresh={this._onRefresh.bind(this)}
						/>
						}
					>
					<Dropdown
						label="Filter"
						containerStyle={{width: '40%', height: '3%'}}
						data={
							[{label: "All", value : 0},{label: "Not Paid", value : 1},{label: "Paid", value : 2}]
							}
						onChangeText={(value) => {
							this.updateIndex(value)
						}}/>
					<List containerStyle={{marginBottom: 20}}>
						<ListView dataSource={this.state.orders} renderRow={this.renderRow.bind(this)}/>
					</List>
				</ScrollView>
				<ActionButton
					buttonColor="#236EFF"
					onPress={() => { 
						console.log(this.props.screenProps.token);
						console.log(this.props.screenProps.user);
						this.props.screenProps.getCartID(this.props.screenProps.token,this.props.screenProps.user);
						this.props.navigation.navigate('Cart'); 
					}}
				/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		setOrders: state.setOrders,
	}
}
export default connect(mapStateToProps)(Dashboard);

AppRegistry.registerComponent('Dashboard', () => Dashboard);