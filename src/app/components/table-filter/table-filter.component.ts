import { Component, Input, Output, EventEmitter,OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableFilter, TableFilterService } from '../../services/table-filter/table-filter.service';

@Component({
  selector: 'fb-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})

export class TableFilterComponent implements OnInit, OnChanges {
	@Input() dataObjName: string = "spend";
	@Input() tableKey: string = "tabName";
	@Input() getFilterOptions: Function = ()=>{};
	@Input() tableFilters: Array<TableFilter> =[];
	@Output() onUpdateFilter = new EventEmitter();

	filterOptions: Array<TableFilter> = [];

	constructor(
		public tableFilterService: TableFilterService,
	) { }


	ngOnInit(): void {
		this.updateFilterOptions();
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
		this.onUpdateFilter.emit(this.tableFilters);
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
}
