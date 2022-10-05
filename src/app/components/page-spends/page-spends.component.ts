import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import {
	TableModel,
	TableItem,
	TableHeaderItem
} from 'carbon-components-angular';

@Component({
	selector: 'fb-page-spends',
	templateUrl: './page-spends.component.html',
	styleUrls: ['./page-spends.component.scss']
})
export class PageSpendsComponent implements OnInit {
	carbonTableModel: TableModel;
	initialTableModel: TableModel; // used to reset the table after clearing the search bar
	sortSearchTableModel:TableModel; // for table search and/or sorting

	constructor() {
		this.carbonTableModel = new TableModel();
		this.initialTableModel = new TableModel();
		this.sortSearchTableModel = new TableModel(); // for table search and/or sorting

		this.initialTableModel.data = [
			[new TableItem({data: "Name 1"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 2"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 3"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 4"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 5"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 6"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 7"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 8"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})]
		];
		this.initialTableModel.header = [
			new TableHeaderItem({data: "Supplier ID"}),
			new TableHeaderItem({data: "Supplie rName" }),
			new TableHeaderItem({data: "Spend"}),
			new TableHeaderItem({data: "GL" }),
			new TableHeaderItem({data: "Material Group"}),
			new TableHeaderItem({data: "Invoice text" }),
			new TableHeaderItem({data: "PO item Text"})
		];
		this.initialTableModel.pageLength = 3;
		this.initialTableModel.totalDataLength = 8;
		this.sortSearchTableModel = _.cloneDeep(this.initialTableModel);

		this.carbonTableModel.header = [
			new TableHeaderItem({data: "Supplier ID"}),
			new TableHeaderItem({data: "Supplie rName" }),
			new TableHeaderItem({data: "Spend"}),
			new TableHeaderItem({data: "GL" }),
			new TableHeaderItem({data: "Material Group"}),
			new TableHeaderItem({data: "Invoice text" }),
			new TableHeaderItem({data: "PO item Text"})
		];
		this.carbonTableModel.pageLength = 3;
		this.carbonTableModel.totalDataLength = 8;
	}

	ngOnInit(): void {
		this.tablePagination(1);
	}

	updateTableFilter() {
	}

	tablePagination(page: number) {
		const offset = this.initialTableModel.pageLength * (page - 1);
		this.carbonTableModel.currentPage = page;
		this.carbonTableModel.totalDataLength = this.sortSearchTableModel.totalDataLength;
		this.carbonTableModel.data = this.sortSearchTableModel.data.slice(
			offset,
			offset + this.carbonTableModel.pageLength
		);
	}

	tableSort(index: number) {
		/* Important Note:
		For single arrow sort direction icons to show
		the sorted table model headers must be the same as table view model headers */
		this.sortSearchTableModel.header = this.carbonTableModel.header;
		this.sort(this.sortSearchTableModel, index);
		this.tablePagination(this.carbonTableModel.currentPage);
	}

	sort(passedInModel: any, index: number) {
		if (passedInModel.header[index].sorted) {
			// if already sorted flip sorting direction
			passedInModel.header[index].ascending = passedInModel.header[index].descending;
		}
		passedInModel.sort(index);
	}

	tableSearch(searchValue: string) {
		if (searchValue === '') {
			this.clearSearch();
		} else if (searchValue && searchValue !== '') {
			let searchString = searchValue.toLowerCase();

			const dataFiltered = this.initialTableModel.data.filter((tableRow) => {
				let containsValue = false;

				tableRow.forEach((item) => {
					// Convert all data types to string for search string comparison
					if (item.data !== undefined) {
						let tmpVal;
						if (typeof item.data === 'number') {
							tmpVal = String(item.data).toLowerCase();
						}

						if (typeof item.data === 'string') {
							tmpVal = item.data.toLowerCase();
						}

						// In JavaScript arrays are a type of object
						if (typeof item.data === 'object') {
							tmpVal = Object.values(item.data).toString().toLowerCase();
						}
						// Does data string include search value?
						if (tmpVal && tmpVal.includes(searchString)) {
							containsValue = true;
						}
					}
				});
				return containsValue;
			});

			this.sortSearchTableModel.data = dataFiltered;
			this.sortSearchTableModel.totalDataLength = dataFiltered.length;
			this.sortSearchTableModel.currentPage = 1;

			this.carbonTableModel.data = this.sortSearchTableModel.data;
			this.carbonTableModel.totalDataLength = this.sortSearchTableModel.totalDataLength;
			this.carbonTableModel.currentPage = this.sortSearchTableModel.currentPage;
			this.tablePagination(1);
		}
	}

	clearSearch() {
		this.sortSearchTableModel.data = this.initialTableModel.data;
		this.carbonTableModel.totalDataLength = this.sortSearchTableModel.data.length;
		this.tablePagination(1);
	}
}
