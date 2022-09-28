import { throwError as observableThrowError, Observable} from 'rxjs';
import { catchError} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CommsService {
	env = environment;
	token: any;
	persona = '';
	nonCallErrorCode = '9999';
	nonCall;
	timeout = 30;
	cookies = {};

	constructor(
		public http: HttpClient
	) {
		// nonCall is used when the access is not allowed according to environments/endpoints.ts
		// is simulates an API call and can return the following error response without having to make an HTTP call
		this.nonCall = new Observable((call) => {
			const err = {
				error: {
					message: 'Unauthorized Access',
					code: this.nonCallErrorCode
				}
			};
			call.error(err);
		});
	}

	getTitle() {
		return "this is test comms.service!!!";
	}

	canAccess(access: Array<any>) {
		let canAccess = false;
		access.forEach(d => {
			if (this.persona === d) {
				canAccess = true;
			}
		});
		return canAccess;
	}

	/**
	 * Universal API post call
	 */
	 postCall(body: {}, endpoint: any, addString?: string, host?: string, customHTTPProps = {}) {

		console.log('POST CALL TOKEN: ', this.token);

		if (this.canAccess(endpoint.access)) {

			let headers = new HttpHeaders({
				'Content-Type': 'application/json'
			});

			if (this.token) {
				headers = headers.append('x-access-token', this.token);
				headers = headers.append('Authorization', 'Bearer ' + this.token);
			}

			const addEnd = addString === undefined ? '' : addString;
			const root = host === undefined ? this.env.apiRoot : host;
			const url = root + endpoint.path + addEnd;
			console.log('POST URL: ', url);

			return this.http.post<any>(url, body, { headers, ...customHTTPProps}).pipe(
				catchError(error => this.errorHandler(error, url, 'POST', body)));
		} else {
			console.log('POST NO ACCESS', endpoint);
			return this.nonCall;
		}
	}

	/**
	 * Universal API put call
	 */
	putCall(body: {}, endpoint: any, addString?: string, host?: string) {

		if (this.canAccess(endpoint.access)) {

			let headers = new HttpHeaders({
				'Content-Type': 'application/json'
			});

			if (this.token) {
				headers = headers.append('x-access-token', this.token);
				headers = headers.append('Authorization', 'Bearer ' + this.token);
			}

			const addEnd = addString === undefined ? '' : addString;
			const root = host === undefined ? this.env.apiRoot : host;
			const url = root + endpoint.path + addEnd;
			console.log('PUT URL: ', url);

			return this.http.put<any>(url, body, { headers }).pipe(
				catchError(error => this.errorHandler(error, url, 'PUT', body)));
		} else {
			console.log('PUT NO ACCESS', endpoint);
			return this.nonCall;
		}
	}

	/**
	 * Universal API get call
	 */
	getCall(endpoint: any, addString?: string, host?: string) {

		if (this.canAccess(endpoint.access)) {

			let headers = new HttpHeaders({
				'Content-Type': 'application/json'
			});

			if (this.token) {
				headers = headers.append('x-access-token', this.token);
				headers = headers.append('Authorization', 'Bearer ' + this.token);
			}

			const addEnd = addString === undefined ? '' : addString;
			const root = host === undefined ? this.env.apiRoot : host;
			const url = root + endpoint.path + addEnd;
			console.log('GET URL: ', url);

			return this.http.get<any>(url, { headers }).pipe(
				catchError(error => this.errorHandler(error, url, 'GET')));

		} else {
			console.log('GET NO ACCESS', endpoint);
			return this.nonCall;
		}
	}

	// private methods. if gets unauthorzied 401, it shoudld get a new token from backend and try again.
	private errorHandler(err: any, url: string, method: string, body?: {}) {
	// 	if (err.status === 401 && this.dataService.refreshToken) {
	// 		return this.refreshToken().pipe(
	// 			switchMap(data => {
	// 				this.token = data['accessToken'];
	// 				this.cookieService.set('token', this.token, 99999999999999999, '/');
	// 				let headers = new HttpHeaders({
	// 					'Content-Type': 'application/json'
	// 				});
	// 				if (this.token) {
	// 					headers = headers.append('x-access-token', this.token);
	// 					headers = headers.append('Authorization', 'Bearer ' + this.token);
	// 				}
	// 				const options = { headers };
	// 				if (method.toUpperCase() === 'POST') {
	// 					return this.http.post(url, body, options);
	// 				} else if (method.toUpperCase() === 'PUT') {
	// 					return this.http.put(url, body, options);
	// 				} else if (method.toUpperCase() === 'GET') {
	// 					return this.http.get(url, options);
	// 				} else if (method.toUpperCase() === 'DELETE') {
	// 					return this.http.delete(url, options);
	// 				}
	// 			}));
	// 	}
		return observableThrowError(err);
	}

}
