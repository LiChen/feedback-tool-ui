import {
	Component,
	OnInit,
	Input,
	Output,
	OnChanges
} from '@angular/core';

import {
	Table,
	TableModel,
	IconService
} from 'carbon-components-angular';

// @ts-ignore
import { Edit32 } from '@carbon/icons';

@Component({
	selector: 'fb-carbon-table',
	templateUrl: './carbon-table.component.html',
	styleUrls: ['./carbon-table.component.scss']
})
	export class CarbonTableComponent implements OnInit, OnChanges {
	/*
	Required:
		[isLoading] Boolean
		[showPagination] Boolean // ToDo: Expore if showPagination can be a optional parameter
		[numberOfColumns] Number (whole numbers only) - for column span when table is loading or has no data
		[carbonTableModel] TableModel - a carbon table model with complete TableModel.header\TableHeaderItems
		(refreshTableData) Function() - function call to refresh data in table

	Optional:
		[tableHeader] Object default: { tableTitle: '', tableDescription: '' }
		[dateRange] Object default: { labels: { from: '', to: '' }, model: [] } - only required if (onDateRangeChange) is used
		(onDateRangeChange) Function() - function call to handle when user selects different date range so parents function can change query date range
		[showExportButton] Boolean default: false - only required if (exportData) is used
		(exportData) Function(carbonTableModel) - function call to handle exporting the TableModel that is currently being viewed to a downloadable file
		[addButton] Object default: { text: '', toolTip: '' } - only required if (addButtonAction) is used
		(addButtonAction) Function() - function call to handle when user clicks "Add" button
	*/

	title = 'IBM Feedback Tool';

	open = false;

	// Table Title & Description
	hasTableHeader: Boolean = true;
	@Input() tableHeader = {
		tableTitle: 'Feedback Discovery Table',
		tableDescription: ''
	};

	// Table Models & More
	@Input() numberOfColumns: number = 2;
	@Input() showPagination: boolean = true;
	@Input() carbonTableModel= new TableModel(); // passed-in by parent component, also the current table view
	initialTableModel = new TableModel(); // used to reset the table after clearing the search bar
	sortSearchTableModel = new TableModel(); // for table search and/or sorting
	searchValue: string = '';
	skeletonModel = Table.skeletonModel(6, 9);
	skeleton = true;
	sortable = true;
	stickyHeader = false;
	showSelectionColumn = true;
	striped = true;
	isDataGrid = true;
	
	constructor(
		public iconService: IconService
	) {
		// register icons for carbon icons ("ibmIcon")
		this.iconService.register(Edit32);
	}

	ngOnInit() {
		if (this.tableHeader.tableTitle != '') {
			this.hasTableHeader = true;
		}
		if (this.numberOfColumns) {
			this.skeletonModel = Table.skeletonModel(6, this.numberOfColumns);
		} else {
			this.skeletonModel = Table.skeletonModel(6, 9);
		}
		this.buildTable();
	}

	changeCategory() {
		//open modal
		this.open = true;
	}

	refreshTable() {
		//open modal
	}

	ngOnChanges() {
		// LifeCycle Hook, this function will trigger when the Parent component updates @Input value
		// console.log('in carbonTableComponent ngOnChanges() carbonTableModel:');
		// console.log(this.carbonTableModel);
		// this.searchValue = ''; // clear search bar when getting a new set of data
		// this.buildTable();
	}

	buildTable() {
		// this.carbonTableModel.data = [];// clear out old table data

		// console.log("carbon Table Model");
		// console.log(this.carbonTableModel); // is the current VIEW of the table
		this.skeleton = false;

		this.initialTableModel.data = this.carbonTableModel.data; // used to reset the table after clearing the search bar
		this.sortSearchTableModel.data = this.carbonTableModel.data; // for table search and/or sorting
		this.sortSearchTableModel.totalDataLength = this.carbonTableModel.totalDataLength;

		if (this.carbonTableModel.data.length > 0) {
			this.selectPage(1);
			// this.tableSort(0); // sort table by first column
		}
	}

	async tableSort(index: number) {
		/* Important Note:
		For single arrow sort direction icons to show
		the sorted table model headers must be the same as table view model headers */
		this.sortSearchTableModel.header = this.carbonTableModel.header;
		this.sort(this.sortSearchTableModel, index);
		this.selectPage(this.carbonTableModel.currentPage);
	}

	sort(passedInModel: any, index: number) {
		if (passedInModel.header[index].sorted) {
			// if already sorted flip sorting direction
			passedInModel.header[index].ascending = passedInModel.header[index].descending;
		}
		passedInModel.sort(index);
	}

	selectPage(page: number) {
		const offset = this.carbonTableModel.pageLength * (page - 1);
		this.carbonTableModel.currentPage = page;
		this.carbonTableModel.totalDataLength = this.sortSearchTableModel.totalDataLength;
		this.carbonTableModel.data = this.sortSearchTableModel.data.slice(
			offset,
			offset + this.carbonTableModel.pageLength
		);
	}

	searchValueChange(event: any) {
		this.searchValue = event;
			// console.log('Search Value:')
			// console.log(this.searchValue);

		if (this.searchValue === '') {
				this.clearSearchBar();
			} else if (this.searchValue && this.searchValue !== '') {
				let searchString = this.searchValue.toLowerCase();

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
		this.selectPage(1);
	}
	}

	clearSearchBar() {
		this.sortSearchTableModel.data = this.initialTableModel.data;
		this.carbonTableModel.totalDataLength = this.sortSearchTableModel.data.length;
		this.searchValue = '';
		this.refreshTable(); // do we need this?
		this.selectPage(1);
	}

}

