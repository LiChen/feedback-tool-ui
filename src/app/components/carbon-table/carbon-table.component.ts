import {
	Component,
	OnInit,
	Input,
	Output,
	OnChanges,
	EventEmitter
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

	@Output() tablePagination = new EventEmitter<any>();
	@Output() tableSort = new EventEmitter<any>();
	@Output() tableSearch = new EventEmitter<any>();

	searchValue = '';
	skeletonModel = Table.skeletonModel(6, 9);
	skeleton = true;
	sortable = true;
	stickyHeader = false;
	showSelectionColumn = true;
	striped = true;
	isDataGrid = false;

	clientOptions: Array<any>;
	categoryOptions: Array<any>;
	unspscOptions: Array<any>;

	categoryDisabled = true;
	unspscDisabled = true;

	constructor(
		public iconService: IconService
	) {
		// register icons for carbon icons ("ibmIcon")
		this.iconService.register(Edit32);
		this.clientOptions = [
			{
				id: 'c1',
				content: 'Coco Cola'
			}, {
				id: 'c2',
				content: 'Bank of America'
			}, {
				id: 'c3',
				content: 'Costco Wholesale'
			}
		];
		this.categoryOptions = [
			{
				id: 'prs4',
				content: 'Personal Relocation Services L4'
			}, {
				id: 'ppe3',
				content: 'Personal Protective Equipment (L3)'
			}, {
				id: 'ppe4',
				content: 'Personal Protective Equipment (L4)'
			}
		];
		this.unspscOptions = [
			{
				id: 'unspsc1',
				content: 'Ear Gauge Measuring Device (L4)'
			}, {
				id: 'unspsc2',
				content: 'Respiratory Protection (L3)'
			}, {
				id: 'unspsc23',
				content: 'Mask or Accesories (L4)'
			}, {
				id: 'unspsc4',
				content: 'Respirators (L4)'
			}, {
				id: 'unspsc5',
				content: 'Gas Masks (L4)'
			}
		]
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
		if (this.carbonTableModel.data.length > 0) {
			this.skeleton = false;
		}
	}

	ngOnChanges() {
		// LifeCycle Hook, this function will trigger when the Parent component updates @Input value
		// console.log('in carbonTableComponent ngOnChanges() carbonTableModel:');
		// console.log(this.carbonTableModel);
		// this.searchValue = ''; // clear search bar when getting a new set of data
		// this.buildTable();
	}

	sort(event: number) {
		this.tableSort.emit(event);
	}

	selectPage(page:number) {
		this.tablePagination.emit(page);
	}

	search(event: string) {
		this.tableSearch.emit(event);
	}

	clearSearchBar() {
		this.searchValue = '';
		this.tableSearch.emit('');
	}

	changeCategory() {
		//open modal
		this.open = true;
	}

	handleSelection(event: any) {

	}

	onSelected(optionType: string) {
		if (optionType === 'client') {
			this.categoryDisabled = false;
			this.unspscDisabled = true;
		} else if (optionType === 'category') {
			this.unspscDisabled = false;
		}
	}

	onSearch(event: any) {
	}
}

