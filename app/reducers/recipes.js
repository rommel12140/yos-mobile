import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedRecipes = createReducer({}, {
	[types.SET_SEARCHED_RECIPES](state, action) {
		let newState = {};
		action.recipes.forEach( (recipe) => {
			newState[recipe.id] = recipe
		})
		return newState;
	}
})

export const setOrderSummaryDetail = createReducer({}, {
	[types.SET_ORDER_SUMMARY_DETAIL](state, action) {
		var result = Object.keys(action.orderSummaryDetail).map(function(key) {
			return {
				key: action.orderSummaryDetail[key][0]["username"],
				values: action.orderSummaryDetail[key]
			}
		});
		// return Object.keys(result).map(key => result[key]);
		return result;
	}
})

export const setOrders = createReducer({}, {
	[types.SET_ORDERS](state, action) {
		var results = Object.keys(action.orders).map(key => {
			return {
				name : key,
				value : action.orders[key],
			}
		})
		return results;
	}
})

export const setEmployeeCarts = createReducer({}, {
	[types.SET_EMPLOYEE_CARTS](state, action) {
		var results = Object.keys(action.carts).map(function(key){
			return {
				title: key,
				data: action.carts[key]
			}
		})
		return results;
	}
})

export const setOrdersSummary = createReducer([], {
	[types.SET_ORDERS_SUMMARY](state, action) {
		const result = Object.keys(action.ordersSummary).map(function(key) {
			return {
				key: action.ordersSummary[key]["name"],
				value: action.ordersSummary[key]
			}
		})
		// console.log("))))))))))))))))))")
		// console.log(Object.keys(result).map(key => result[key]))
		// return Object.keys(result).map(key => result[key]);
		return result;
	}
})

export const recipeCount = createReducer(0, {
	[types.SET_SEARCHED_RECIPES](state, action){
		 return action.recipes.length;
	},
	[types.ADD_RECIPE](state, action){
		 return state + 1;
	}
})

export const Token = createReducer("", {
	[types.SET_TOKEN](state , action){
		return action.token; 
	},
	[types.RESET_TOKEN](state , action){
		return ''; 
	}
})

export const User = createReducer({},{
	[types.SET_USER](state, action){
		return action.user;
	},
	[types.RESET_USER](state, action){
		return {};
	}
})

export const AuthAccept = createReducer(false,{
	[types.SET_ACCEPTED](state, action){
		return action.value;
	},
})

export const AuthCheck = createReducer(false,{
	[types.SET_FAIL](state, action){
		return action.value;
	},
})

export const CartID = createReducer("",{
	[types.SET_CART_ID](state, action){
		return action.id;
	},
})