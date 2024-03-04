'use strict'


export class Ajax{

	#outerApi = 'http://127.0.0.1:8080';
	#get = 'GET';
	#post = 'POST';

    post(url, body, callback){
       	const init = {
			method: this.#post,
			headers: { 'Content-type': 'application/json'},
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
		}

		this.#ajax(this.#fullAdress(url), callback, init, arguments);
    }

    get(url, callback){
        const init = {
			method: this.#get,
			mode: "cors",
			credentials: 'include',
		}
		
		this.#ajax(this.#fullAdress(url), callback, init, arguments);
    }

	#fullAdress(route){
		return(this.#outerApi + route);
	}

    #ajax(url, callback, init) {
        fetch(url, init)
			.then(response => {
				console.log(response);
				if(response.ok){
					return response.json()
				} else {
					console.log(`${response.status} ERROR: ${response.statusText}`)
				}
			})
			.then(data => callback(data)) 
			.catch(err => alert(err));
    
    }
}