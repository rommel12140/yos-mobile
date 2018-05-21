import React, { Component } from 'react';
import { SafeAreaView, AppRegistry, View, Text, StyleSheet, ListView, ScrollView  } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { NavigationActions } from 'react-navigation';
import styles from '../../../Themes/LoginStyles';

class CartDetail extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			cartDetails: ds,
			totalAmount: 0,
		}
	}		

	static navigationOptions = {
		title: 'Checkout',
		headerStyle: {
			backgroundColor: '#8eb3fb'
		  },
		tabBarVisible : false,
	}

	componentDidMount() {
 		const {params} = this.props.navigation.state;
		const cartDetail = params ? params.cartDetail : null;
		console.log(cartDetail)
		this.props.screenProps.fetchCartDetails(this.props.screenProps.token,cartDetail[0])
		.then((response) => {
			this.setState({
				cartDetails: this.state.cartDetails.cloneWithRows(response)
			})
 			for(item in response){
				menuItem = response[item];
				this.setState({ totalAmount : this.state.totalAmount + (menuItem.quantity * menuItem.menu.credit_cost)}) 
			}
		})
	}

	deletThis(id){
		alert("delete item id: " + id);
	}

	renderRow(menu, sectionId, rowId, hightlightRow) {
		const swipeoutBtns = [
			{ text: 'Remove', backgroundColor: 'red', onPress : this.deletThis.bind(this,menu.id) },
		]
		return (
			<Swipeout right={swipeoutBtns}>
				<ListItem 
					hideChevron={true}
					key={menu.id}
					title={
						<Text>
							<Text style={{ padding: 5, fontSize : 18 , fontWeight : 'bold'}}>
								{menu.menu.name}
							</Text>
							{" x " + menu.quantity}
						</Text>
					}
					subtitle={
						<View style={{ paddingLeft : 5 }}>
							<Text>Php <Text style={{ fontWeight: 'bold' }}>{Number(menu.menu.credit_cost).toFixed(2)}</Text></Text>
						</View>
					}/>
			</Swipeout>
		)
	}

	onPress(){
		const {params} = this.props.navigation.state;
		const cartDetail = params ? params.cartDetail : null;
		var cart = {
			cart: this.props.cartID,
			payment_method: "Salary Deduction",
			total_cost: this.state.totalAmount,
			user: this.props.user.id,
		};
		this.props.screenProps.makeOrder(this.props.token,cart);
		this.props.navigation.navigate('Dashboard')
	}
	
	render() {
		return(
			<SafeAreaView style={styles.mainContainer}>
				<View style={{flex:1}}>
					<View style={{alignItems:'center', paddingTop: 10}}>
						<Text style={{fontSize : 32}}>Purchase</Text>
					</View>
					<ScrollView style={{paddingRight: 10}}>
						<List>
							<ListView dataSource={this.state.cartDetails} renderRow={this.renderRow.bind(this)}></ListView>
						</List>
					</ScrollView>
					<View style={{alignItems:'center', paddingTop: 10}}>
						<Text style={{fontSize : 24, marginLeft: 5, marginVertical: 10}}>Total: Php
							<Text style={{fontWeight : 'bold'}}> {Number(this.state.totalAmount).toFixed(2)}</Text>
						</Text>
					</View>
					<Button
						raised
						title="Confirm"
						onPress={this.onPress.bind(this)}
						backgroundColor='#236EFF'
					/>
				</View>
			</SafeAreaView>
		)
	}
}


function mapStateToProps(state) {
	return { 
		token : state.Token,
		cartID : state.CartID,
		user: state.User
	}
}

export default connect(mapStateToProps)(CartDetail);

AppRegistry.registerComponent('CartDetail', () => CartDetail)