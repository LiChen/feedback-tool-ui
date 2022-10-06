import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SpendService {
	tableHeaderConfigs = [
		{
			prop: "supplierId",
			name: "Supplier ID",
			search: true,
			sort: true,
			type: 'text',
			helpText: 'An exact match of the full supplier number (case sensitive) is required'
		}, {
			prop: "supplierName",
			name: "Supplier Name",
			search: true,
			sort: true,
			type: 'text',
			helpText: ''
		}, {
			prop: "spend",
			name: "Spend",
			search: true,
			sort: true,
			type: 'text',
			helpText: ''
		}, {
			prop: "gl",
			name: "GL",
			search: true,
			sort: true,
			type: 'text',
			helpText: ''
		}, {
			prop: "materialGroup",
			name: "Material Group",
			search: true,
			sort: true,
			type: 'text',
			helpText: ''
		}, {
			prop: "invoiceText",
			name: "Invoice text",
			search: true,
			sort: true,
			type: 'text',
			helpText: ''
		}, {
			prop: "poItemText",
			name: "Po Item Text",
			search: true,
			sort: true,
			type: 'text',
			helpText: ''
		}
	];

	constructor() { }
}
