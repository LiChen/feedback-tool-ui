import { Component, OnInit } from '@angular/core';

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
	constructor() {
		this.carbonTableModel = new TableModel();
		this.carbonTableModel.data = [
			[new TableItem({data: "Name 1"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 2"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 3"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 4"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 5"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 6"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 7"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})],
			[new TableItem({data: "Name 8"}), new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"}),new TableItem({data: "qwer"})]
		];
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
	}


	updateTableFilter() {
	}
}
