import React, { Component } from 'react';
import { SafeAreaView, AppRegistry, View, Text, StyleSheet, ListView, ScrollView, SectionList } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { NavigationActions } from 'react-navigation';
import styles from '../../../Themes/LoginStyles';
import { CartCounter } from '../../../reducers/recipes';
import _ from 'lodash';

class CartDetail extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			cartDetails: [],
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
		const cartID = params ? params.cartID : null;
		this.props.screenProps.fetchCartDetails(this.props.screenProps.token,cartID)
		.then((response) => {
			this.setState({
				cartDetails: response
			})
 			for(item in response){
				menuItem = response[item];
				this.setState({ totalAmount : this.state.totalAmount + (menuItem.quantity * menuItem.menu.credit_cost)}) 
			}
		})
	}

	onPress(){
		const {params} = this.props.navigation.state;
		const cartID = params ? params.cartID : null;
		var cart = {
			cart: this.props.cartID,
			payment_method: "Salary Deduction",
			total_cost: this.state.totalAmount,
			user: this.props.user.id,
		};
		this.props.screenProps.makeOrder(this.props.token,cart);
		this.props.navigation.navigate('Dashboard')
	}

	deletThis(id){
		alert("delete item id: " + id);
	}

	/* renderRow(menu, sectionId, rowId, hightlightRow) {
		const swipeoutBtns = [
			{ text: 'Remove', backgroundColor: 'red', onPress : this.deletThis.bind(this,menu.id) },
		]
		console.log(menu);
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
							<Text>Menu Schedule: {menu.menu_set_schedule.date} </Text>
						</View>
					}/>
			</Swipeout>
		)
	} */

	renderItem = (item) => {
		const swipeoutBtns = [
			{ text: 'Remove', backgroundColor: 'red', onPress : () =>  {this.deletThis(this.item.item.id)} }
		]
		return (
			<Swipeout right={swipeoutBtns}>
				<ListItem 
					hideChevron={true}
					key={item.item.id}
					title={
						<Text>
							<Text style={{ padding: 5, fontSize : 18 , fontWeight : 'bold'}}>
								{item.item.menu.name}
							</Text>
							{" x " + item.item.quantity}
						</Text>
					}
					subtitle={
						<View style={{ paddingLeft : 5 }}>
							<Text>Php <Text style={{ fontWeight: 'bold' }}>{Number(item.item.menu.credit_cost).toFixed(2)}</Text></Text>
						</View>
					}/>
			</Swipeout>
		)
	}

	renderSectionHeader = (headerItem) => {
		return(
			<Text style={{ padding: 5, fontSize : 22  , fontWeight : 'bold'}}> {headerItem.section.key} </Text>
		)
	}
	
	render() {
		var dataSource = this.state.cartDetails
		dataSource = _.groupBy(dataSource, d => d.menu_set_schedule.date)
		dataSource = _.reduce(dataSource, (acc, next, index) => {
			acc.push({
				key: index,
				data: next,
			})
			return acc
		}, [])
		return(
			<SafeAreaView style={styles.mainContainer}>
				<View style={{flex:1}}>
					<View style={{alignItems:'center', paddingTop: 10}}>
						<Text style={{fontSize : 32, fontWeight: 'bold'}}>Purchase</Text>
						<Text style={{ fontWeight: 'bold' }}> Total of {this.props.cartCounter} item(s)</Text>
					</View>
					<ScrollView style={{paddingRight: 10}}>
						<List>
							<SectionList renderItem={this.renderItem}
									renderSectionHeader={this.renderSectionHeader}
									sections={dataSource}
									keyExtractor={(item)=> item.name}
									/>
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
		user: state.User,
		cartCounter: state.CartCounter,
	}
}

export default connect(mapStateToProps)(CartDetail);

AppRegistry.registerComponent('CartDetail', () => CartDetail)