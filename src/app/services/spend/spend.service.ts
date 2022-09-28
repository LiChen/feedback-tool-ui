import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SpendService {

	constructor() { }

	getTitle() {
		return "this is testing spend service!";
	}
}
