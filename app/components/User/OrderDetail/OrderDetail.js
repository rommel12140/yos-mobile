import React, { Component } from 'react';
import { SafeAreaView, 
		AppRegistry, 
		View, 
		Text, 
		StyleSheet, 
		ListView, 
		ScrollView  
} from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import { headerOrderDetails } from '../../../Themes/HeaderStyles';
import { NavigationActions } from 'react-navigation';
import { CartCounter } from '../../../reducers/recipes';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import styles from '../../../Themes/Styles';

class OrderDetail extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			orderDetails: ds,
			totalAmount: 0,
		}
	}		

	static navigationOptions = headerOrderDetails

	componentDidMount() {
 		const {params} = this.props.navigation.state;
		const cartID = params ? params.cartID : null;
		this.props.screenProps.fetchCartDetails(this.props.screenProps.token,cartID)
		.then((response) => {
			this.setState({
				orderDetails: this.state.orderDetails.cloneWithRows(response)
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
	}
	
	render() {
		const {params} = this.props.navigation.state;
		const cartID = params ? params.cartID : null;
		return(
			<SafeAreaView style={styles.mainContainer}>
				<View style={{flex:1}}>
					<View style={{paddingTop: 10}}>
						<Text style={{fontSize : 22, fontWeight: 'bold'}}>Cart {cartID} </Text>
					</View>
					<ScrollView style={{paddingRight: 10}}>
						<List>
							<ListView dataSource={this.state.orderDetails} renderRow={this.renderRow.bind(this)}></ListView>
						</List>
					</ScrollView>
					<View style={{alignItems:'center', paddingTop: 10}}>
						<Text style={{fontSize : 24, marginLeft: 5, marginVertical: 10}}>Total: Php
							<Text style={{fontWeight : 'bold'}}> {Number(this.state.totalAmount).toFixed(2)}</Text>
						</Text>
					</View>
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

export default connect(mapStateToProps)(OrderDetail);

AppRegistry.registerComponent('OrderDetail', () => OrderDetail)