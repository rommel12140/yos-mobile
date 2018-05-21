import React, { Component } from 'react';
import { ActivityIndicator, 
		SafeAreaView, 
		Alert, 
		StyleSheet, 
		View, 
		Text, 
		AppRegistry, 
		ListView, 
		TouchableHighlight, 
		SectionList, 
		ScrollView, 
		Picker, 
		TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, Button, Card, Header, Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import api from '../../../../utilities/api';
import { Dropdown } from 'react-native-material-dropdown';
import { fetchMenuDetails } from '../../../actions/recipes';
import ActionButton from 'react-native-action-button';
import styles from '../../../Themes/LoginStyles';

class Cart extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			menuDates: [],
			selectedDate: 'date',
			data: [],
			cartInput: ds ,
			dateID : 'ID',
			okToCheckout : false,
			visible: true,
		}
	}

	static navigationOptions = {
		title: 'Order',
		headerStyle: {
			backgroundColor: '#8eb3fb'
		  },
		tabBarVisible : false,
	}

	componentDidMount() {
		this.props.screenProps.fetchMenuSchedules(this.props.screenProps.token)
		.then((response) => {
			var newDates = [];
			newDates = Object.keys(response).map((key) =>{
				return { 
					value : response[key].date,
					id : response[key].id,
				}
			})
			this.setState({menuDates : newDates});
		}).then(() => {
			this.setState({visible: false});
		  });
	}

	renderRow(cart, sectionId, rowId, hightlightRow) {
		return (
			<View>
				<ListItem
						key={cart.id} 
						title={<Text style={styles.titleCart}>{cart.menu.description}</Text>}
						hideChevron={true}
						subtitle={
							<View style={{
								paddingLeft : 5, 
								flexDirection : 'row', 
								alignItems: 'center', 
								justifyContent: 'space-between',
							}}>
								<View style={{flex: .75}}>
									<Text style={styles.info}>
										Cost: Php <Text style={{fontWeight : 'bold'}}>{cart.menu.credit_cost}</Text> each
									</Text>
									<Text style={styles.info}>
										Serving Schedule: <Text style={{fontWeight : 'bold'}}>{cart.menu.serving_schedule_name}</Text>
									</Text>
								</View>
								<View style={{flex : .25}}>
									<Icon
										raised
										onPress={()=> {
											if(cart.quantity > 0){
												Alert.alert(
													'Are you sure?',
													'',
													[
														{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
														{text: 'OK', onPress: () => {
														this.props.screenProps.addMenuItem(this.props.screenProps.token,cart)
														this.setState({ okToCheckout : true });
														}},
													],
													{ cancelable: false }
													)
											}else{
												Alert.alert('',"You can't add none");
											}
										}}
										name='add-shopping-cart'
										type='MaterialCommunityIcons'
										color='#236EFF'
									/>
									<Dropdown
										label="Quantity"
										data={
											[{value : 0},{value : 1},{value : 2},{value : 3},{value : 4},{value : 5},
												{value : 6},{value : 7},{value : 8},{value : 9},{value : 10}]
										}
										value = {cart.quantity}
										onChangeText={(value) => {
											this.quantityChanger(cart.id,value)
										}}
									/>
								</View>
							</View>
						}
				/>
			</View>
		)
	}

	quantityChanger(itemID,value){
		//this.setState({ cartInput : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) })
		newData = this.state.data.slice();
		for(data in newData){
			if(newData[data].id === itemID){
				newData[data].quantity = value;
				break;
			}
		}
		this.setState({
			cartInput : this.state.cartInput.cloneWithRows(newData),
			data : newData,
		});
	}

	renderHeader(headerItem) {
		return <Header placement='left' centerComponent={{text: headerItem.section.title, style: { color: '#fff' } }}
					   outerContainerStyles={{ backgroundColor: '#3D6DCC' }}/>
	}

	initiailiseDropdown(ordersv, index) {
		this.props.screenProps.fetchMenuScheduleDetails(this.props.screenProps.token,this.state.menuDates[index].id)
		.then((response) => {
			var cart_id = this.props.cartID;
			Object.keys(response).map(function(key){
				ordersv[key] = {
					cart: JSON.stringify(cart_id),
					cut_off_time: response[key].cut_off_time,
					id: response[key].id,
					is_active: response[key].is_active,
					is_deleted: response[key].is_deleted,
					menu: response[key].menu,
					menu_set_schedule_id: response[key].menu_set_schedule_id,
					serving_schedule_id: response[key].serving_schedule_id,
					quantity: 0,
				}
			})	
			ordersv.sort((a,b) => a.serving_schedule_id - b.serving_schedule_id)
			this.setState({
				cartInput : this.state.cartInput.cloneWithRows(ordersv),
				data : ordersv,
			});
		})
	}

	render() {
		var storeOrder = [];
		return(
			<SafeAreaView style={styles.mainContainer}>
					<View style={{flex:1}}>
						<View style={{flexDirection: 'row', flex: .20}}>
							<View style={{flex : .60, paddingLeft: 10}}>
								<Dropdown
									label="Menu Set Schedule"
									data={this.state.menuDates}
									onChangeText={(value,index) => {
										this.initiailiseDropdown(storeOrder, index);
										this.setState({
											selectedDate : value,
											dateID : this.state.menuDates[index].id,
											cartInput : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
										})}
									}
								/>
							</View>
							<View style={{flex: .40}}>
								<Button
									raised
									icon={{name: 'shopping-cart'}}
									title='CHECKOUT'
									backgroundColor='#236EFF'
									disabled = {!this.state.okToCheckout}
									style = {{ paddingVertical : 20}}
									onPress={() => this.props.navigation.navigate('Checkout', {cartDetail:this.state.data})} />
							</View>
						</View>
						<ActivityIndicator style={{height:'1%'}} animating={this.state.visible} size='large' />
						<ScrollView style={{
									flex : .80,
									paddingRight: 10,
									}}>
						<List containerStyle={{marginBottom: 20}}>
							<ListView 
								dataSource={this.state.cartInput} 
								renderRow={this.renderRow.bind(this)}
							/>
						</List>
						</ScrollView>
					</View>
			</SafeAreaView>
		)
	}
}

function mapStateToProps(state) {
	return {
		setEmployeeCarts: state.setEmployeeCarts,
		token : state.Token,
		cartID : state.CartID,
	}
}

export default connect(mapStateToProps)(Cart);

AppRegistry.registerComponent('Cart', () => Cart)