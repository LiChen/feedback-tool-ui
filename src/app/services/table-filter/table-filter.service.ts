import { Injectable } from '@angular/core';
import { fieldParams } from './table-filter-fields';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService {
	/**
	 * determine if a filter object has any that would be considered active
	 */
	hasActiveFilter(filterObject: Array<TableFilter>): boolean {
		let result = false;
		if (filterObject && filterObject.length > 0) {
			filterObject.forEach(filter => {
				if (!(filter.value === undefined || filter.value === null)) {
					result = true;
				}
			});
		}
		return result;
	}

	/**
	 * Add a new filter to the current table
	 */
	addFilter(tableFilterList: Array<TableFilter>, selectedAddFilter: TableFilter): void {
		tableFilterList.push(selectedAddFilter);
	}

	/**
	 * removes the first filter found that matches the prop name to be removed
	 */
	removeFilter(tableFilterList: TableFilter[], filterPropName: string): void {
		for (let i = 0; i < tableFilterList.length; i++) {
			if (tableFilterList[i].propName === filterPropName) {
				// remove value so it doesn't re-appear when adding the field again
				tableFilterList[i].value = null;
				tableFilterList.splice(i, 1);
				break;
			}
		}
	}

	/**
	 * removes all filters from given tab object
	 */
	removeAllFiltersFromTab(tableFilterList: TableFilter[]): void {
		// remove all values so they don't re-appear when adding the field again
		tableFilterList.forEach(item => item.value = null);
		tableFilterList.splice(0, tableFilterList.length);
	}

	formatFilterOptions(filterOptionsExternal: Array<any>, dataObjectName: string): Array<TableFilter> {
		const filterOptionsFormatted: Array<TableFilter> = filterOptionsExternal.map(unformattedFilter => {
			// if a type isn't specified, assume that it's text
			let params: any = { type: 'text' };

			// this "validate" field comes from the config.csv file. See comment in table-filter-fields.ts for larger explanation.
			if (unformattedFilter.validate === 'boolean') {
				params.type = 'boolean';
			} else if (unformattedFilter.validate === 'date') {
				params.type = 'date';
			} else if (unformattedFilter.validate === 'number') {
				params.type = 'number';
			}

			// BCL
			// if (fieldParams[dataObjectName] && fieldParams[dataObjectName][unformattedFilter.prop]) {
			// 	// if there is a field params object that matches, use that over anything else
			// 	params = { ...params, ...fieldParams[dataObjectName][unformattedFilter.prop]};
			// }

			return {
				name: unformattedFilter.name,
				propName: unformattedFilter.prop,
				value: undefined,
				type: params.type,
				params
			};
		});
		return filterOptionsFormatted;
	}

	/**
	 * Applies object's filters to object to create an API request body
	 */
	applyFilterToBody(tableFilters: Array<TableFilter>, body: any) {
		if (tableFilters) {
			tableFilters.forEach(filter => {
				let value = filter.value;
				if (filter.params && typeof filter.params.convertToApiProp === 'function') {
					value = filter.params.convertToApiProp(value);
				}

				// use the prop name, or the special api property name if it has one
				if (filter.params?.apiPropertyName) {
					if (Array.isArray(filter.params.apiPropertyName)) {
						// if api property name is an array, then it will result in multiple properties added to the request body
						for (const [index, propName] of filter.params.apiPropertyName.entries()) {
							body[propName] = value[index];
						}
					} else {
						// otherwise, assume it's a single string property name
						body[filter.params.apiPropertyName] = value;
					}
				} else {
					// use the filter's prop name
					body[filter.propName] = value;
				}
			});
		}
	}
}

export interface TableFilter {
	name?: string;
	propName: string;
	value: any;
	type?: string;
	params?: any;
}

