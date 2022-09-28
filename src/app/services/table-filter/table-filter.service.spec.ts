import { TestBed, inject } from '@angular/core/testing';

import { TableFilterService } from './table-filter.service';

describe('TableFilterService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ TableFilterService ]
		});
	});

	it('should be created', inject([TableFilterService], (service: TableFilterService) => {
		expect(service).toBeTruthy();
	}));

	it('hasActiveFilter should return true when a filter has a value', inject([TableFilterService], (service: TableFilterService) => {
		const data = [ { propName: 'a', value: 'v' } ];
		expect(service.hasActiveFilter(data)).toEqual(true);
	}));

	it('hasActiveFilter should return false when there are no filters', inject([TableFilterService], (service: TableFilterService) => {
		const data = [];
		expect(service.hasActiveFilter(data)).toEqual(false);
	}));

	it('hasActiveFilter should return false when no filters are defined', inject([TableFilterService], (service: TableFilterService) => {
		const data = [ { propName: 'a', value: null } ];
		expect(service.hasActiveFilter(data)).toEqual(false);
	}));

	it('addFilter should add object to list', inject([TableFilterService], (service: TableFilterService) => {
		const data = { propName: 'a', value: 'v' };
		const list = [];
		service.addFilter(list, data);
		expect(list.length).toEqual(1);
	}));

	it('removeFilter should remove from list by name', inject([TableFilterService], (service: TableFilterService) => {
		const data = 'a';
		const list = [{ propName: 'a', value: 'v' }, { propName: 'b', value: 'v' }];
		service.removeFilter(list, data);
		expect(list.length).toEqual(1);
		expect(list[0].propName).toEqual('b');
	}));

	it('removeAllFiltersFromTab should remove all elements from given list', inject([TableFilterService], (service: TableFilterService) => {
		const list = [{ propName: 'a', value: 'v' }, { propName: 'b', value: 'v' }];
		service.removeAllFiltersFromTab(list);
		expect(list.length).toEqual(0);
	}));

	it('formatFilterOptions will take one object format and return another format', inject([TableFilterService], (service: TableFilterService) => {
		const preFormat = [
			{ validate: 'boolean', prop: 'p1', name: 'p1 name' },
			{ validate: 'date', prop: 'p2', name: 'p2 name' },
			{ validate: 'number', prop: 'p3', name: 'p3 name' },
			{ validate: '', prop: 'p4', name: 'p4 name' }
		];
		const postFormat = service.formatFilterOptions(preFormat, 'test-object');
		expect(postFormat[0].propName).toEqual(preFormat[0].prop);
		expect(postFormat[1].type).toEqual(preFormat[1].validate);
		expect(postFormat[2].name).toEqual(preFormat[2].name);
		expect(postFormat[3].type).toEqual('text');
	}));

	it('applyFilterToBody should add properties to the body object', inject([TableFilterService], (service: TableFilterService) => {
		const body = {};
		service.applyFilterToBody([ { propName: 'propname1', value: 5 } ], body);

		expect(body).toEqual({ propname1: 5 });
	}));

	it('applyFilterToBody should add to body and convert value based on convertToApiProp', inject([TableFilterService], (service: TableFilterService) => {
		const body = {};
		service.applyFilterToBody([ {
			propName: 'propname1',
			value: 5,
			params: { convertToApiProp: x => x + x }
		} ], body);

		expect(body).toEqual({ propname1: 10 });
	}));

	it('applyFilterToBody should add to body using a different apiPropertyName', inject([TableFilterService], (service: TableFilterService) => {
		const body = {};
		service.applyFilterToBody([ {
			propName: 'propname1',
			value: 5,
			params: { apiPropertyName: 'newname' }
		} ], body);

		expect(body).toEqual({ newname: 5 });
	}));

	it('applyFilterToBody should add to body using a multiple properties', inject([TableFilterService], (service: TableFilterService) => {
		const body = {};
		service.applyFilterToBody([ {
			propName: 'propname1',
			value: [1, 2],
			params: { apiPropertyName: ['prop1', 'prop2'] }
		} ], body);

		expect(body).toEqual({ prop1: 1, prop2: 2 });
	}));
});
