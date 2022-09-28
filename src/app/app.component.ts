import { Component } from '@angular/core';

import { SpendService } from './services/spend/spend.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'feedback-tool-ui';

	constructor(
		public spendService: SpendService
	) {
		this.title = this.spendService.getTitle();
	}


}
