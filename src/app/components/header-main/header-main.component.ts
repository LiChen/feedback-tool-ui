import { Component, OnInit, ElementRef, HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'fb-header-main',
	templateUrl: './header-main.component.html',
	styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {
	@HostListener('document:click', ['$event.target']) onClick(target: any) {
		// this handles closing the menu when clicking outside of any part of the header element
		if (this.menuButtonActive) {
			if (!this.elementRef.nativeElement.contains(target)) {
				this.menuButtonActive = false;
			}
		}
	}
	menuButtonActive = false;
	mainMenuItems;

	constructor(
		public elementRef: ElementRef,
		public router: Router
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
