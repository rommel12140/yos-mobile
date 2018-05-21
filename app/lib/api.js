// const baseUrl = 'http://192.168.1.8:8000/'; //Home WIFI
// const baseUrl = 'http://192.168.1.9:8000/'; //Home WIFI
// const baseUrl = 'http://192.168.2.122:8000/';
// const baseUrl = 'http://192.168.2.121:8000/'; //YAHSHUA-2G
// const baseUrl = 'http://192.168.2.124:8000/'; //YAHSHUA-2G
const baseUrl = 'https://www.yahshua-ordering.com/api/v1/';

class Api {
	static headers(token) {
		if (token){
			return {
				'Accept': 'application/json',
				'Authorization' : 'JWT ' + token,
				'Content-type': 'application/json',
				'dataType': 'json',
				'X-Requested-With': 'XMLHttpRequest',
				'X-Mashape-Key': 'KEY',
			}
		}else{
			return {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'dataType': 'json',
				'X-Requested-With': 'XMLHttpRequest',
				'X-Mashape-Key': 'KEY',
			}
		}
	}

	static get(route) {
		return this.xhr(route, null, 'GET')
	}

	static put(route, params) {
		return this.xhr(route, params, 'PUT')
	}

	static post(route, params) {
		return this.xhr(route, params, 'POST')
	}

	static delete(route, params) {
		return this.xhr(route, params, 'DELETE')
	}

	static xhr(route, params, verb) {
		const host = baseUrl
		const url = `${host}${route}`;
		let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);
		options.headers = Api.headers();
		// console.log(params.token);
		if (params.token != null) {
			console.log("token not null");
			options.headers = Api.headers(params.token);
		}else{
			console.log("token null");
			options.headers = Api.headers(null);
		}
		return fetch(url, options).then((resp) => {
			let json = resp.json();
			if(resp.ok) { return json;}
			return json.then(err => {throw err});
		});
	}
}

export default Api;