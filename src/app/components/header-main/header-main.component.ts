import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'fb-header-main',
	templateUrl: './header-main.component.html',
	styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {
	menuButtonActive = false;
	mainMenuItems;

	constructor(
		private router: Router
	) {
		this.mainMenuItems = [
			{
				label: 'Feedback Discover',
				path: 'discover'
			}, {
				label: 'Feedback Approve',
				path: 'approve'
			}, {
				label: 'Logout',
				path: 'logout'
			}
		];
	}

	ngOnInit() {
	}

	showMenuItem(item: any) {
		return true;
	}

	handleMenuIconClick() {
		this.menuButtonActive = !this.menuButtonActive;
	}

	menuItemClick(event: any, path: string) {
	}
}
