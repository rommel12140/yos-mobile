// const baseUrl = 'http://192.168.1.8:8000/'; //Home WIFI
// const baseUrl = 'http://192.168.1.9:8000/'; //Home WIFI
// const baseUrl = 'http://192.168.2.122:8000/';
// const baseUrl = 'http://192.168.2.121:8000/'; //YAHSHUA-2G
const baseUrl = 'https://www.yahshua-ordering.com/api/v1/';

import Api from '../app/lib/api';

const api = {
	/**  fetch Orders API
	*
	*/
	fetchOrders() {
		return fetch(baseUrl+'order-api')
		.then((response) => response.json())
		.catch((error) => {
			console.log(error)
		})
	},
	/** fetch Cart Details API
	* Requires order object
	*/
	fetchCartDetails(order) {
		return fetch(baseUrl+'cart-detail-api/'+order.cart+'/')
		.then((response) => response.json())
		.catch((error) => {
			console.log(error)
		})
	},
	/** fetch Menu API
	 * 
	 */
	fetchMenus(token) {
		console.log(token);
		return Api.post('menu-api', token)
		.then((response) => response.json())
		.catch((error) => console.log(error));


	/* 
		return fetch(baseUrl+'menu-api')
		.then((response) => response.json())
		.catch((error) => {
			console.log(error)
		}) */
	},
	/** fetch Carts of the Associated Order
	 *  
	 */
	fetchOrderCarts(token,carts) {
		alert(carts)
		return Api.post('order-carts-api/', {
			token:token,
			body: JSON.stringify({id: carts})
		})
		.then((response) => {
			var results = Object.keys(response).map(function(key){
				return {
					title: key,
					value: response[key]
				}
			})
			return results
		})
		.catch((error) => {
			console.log(error);
		})
	},
	/** fetch Order Summary for Today API
	 * Fetches the orders for the current date
	 */
	fetchTodayOrderSummary() {
		return fetch(baseUrl+'order-summary-report-api')
		.then((response) => response.json())
		.then((response) => {
			const result = Object.keys(response).map(function(key) {
				return {
					key: response[key]["name"],
					value: response[key]
				}
			})
			return result;
		})
		.catch((error) => {
			console.log(error)
		})
	},
	/** fetch Cart Detail associated to the ids
	 *  Requires an array of ids
	 */
	fetchCartDetailWithIds(cart_detail_ids) {
		return fetch(baseUrl+'cart-details-api/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cartDetailIds: cart_detail_ids
			})
		})
		.then((response) => response.json())
		.then((response) => {
			var result = Object.keys(response).map(function(key) {
				return {
					key: response[key][0]["username"],
					values: response[key]
				}
			});
			return result;
		})
		.catch((error) => {
			console.log(error)
		})
	},
	/** post Complete Detail api
	 *  Requires a cart_detail id
	 */
	completeDetail(detail) {
		return fetch(baseUrl+'complete-cart-detail-api/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cart_detail_id: detail
			})
		})
		.then((response) => console.log(response))
		.catch((error) => {
			console.log(error)
		})
	}
}

module.exports = api;