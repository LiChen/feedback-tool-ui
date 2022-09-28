import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TableFilter, TableFilterService } from '../../services/table-filter/table-filter.service';

@Component({
  selector: 'fb-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})

export class TableFilterComponent implements OnChanges {
	@Input() dataObjName: string = "spend";
	@Input() tableKey: string = "tabName";
	@Input() getFilterOptions: Function = ()=>{};
	@Input() tableFilters: Array<TableFilter>;
	@Output() onUpdateFilter = new EventEmitter();

	filterOptions: Array<TableFilter> = [];

	constructor(
		private tableFilterService: TableFilterService,
	) {
		this.tableFilters = [
			{
				name: 'Division Code',
				propName: 'divisioncode',
				type: 'text',
				value: '',
				params: {
					type: 'text'
				}
			}, {
				name: 'Supplier No',
				propName: 'supplierid',
				type: 'text',
				value: '',
				params: {
					type: 'text',
					helpMessage: 'An exact match of the full supplier number (case sensitive) is required.'
				}
			}
		]
	}


	ngOnChanges(changes: SimpleChanges) {
		if (changes['tableKey']) {
			this.updateFilterOptions();
		}
	}

	/**
	 * Getting filter options returns a new object each time, so it has to be done only once when the table changes
	 */
	updateFilterOptions(): void {
		const filterOptionsExternal = this.getFilterOptions();
		this.filterOptions = this.tableFilterService.formatFilterOptions(filterOptionsExternal, this.dataObjName);
	}

	getUnusedFilterOptions(): Array<TableFilter> {
		return this.filterOptions.filter(f => !this.tableFilters.map(tf => tf.propName).includes(f.propName));
	}

	handleSelectFilter(filterSelected: string): void {
		this.tableFilterService.addFilter(this.tableFilters, this.filterOptions.filter(f => f.propName === filterSelected)[0]);
	}

	updateFilter(): void {
		this.onUpdateFilter.emit();
	}

	handleFilterSubmit(): void {
		this.updateFilter();
	}

	handleClickRemove(filterPropName: string): void {
		this.tableFilterService.removeFilter(this.tableFilters, filterPropName);
		this.updateFilter();
	}

	handlePressEnterOnRemove(event: any, prop: string): void {
		if (event.keyCode === 13) {
			this.handleClickRemove(prop);
		}
	}

	handleClearAllFilters(): void {
		this.tableFilterService.removeAllFiltersFromTab(this.tableFilters);
		this.updateFilter();
	}

	// getDateFormatter(): Function {
	// 	return this.dataService.formatLocalDate;
	// }

	changeValue(event: any) {

	}

	handleKeydown(event: any) {

	}
}
