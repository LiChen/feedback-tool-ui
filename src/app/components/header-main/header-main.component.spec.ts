import { Component, Input, Output } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';
import { DataService } from '../../services/data/data.service';
import { NoteService } from '../../services/note/note.service';
import { NotificationService } from '../../services/notification/notification.service';
import { TimesheetService } from '../../services/timesheet/timesheet.service';
import { UserService } from '../../services/user/user.service';
import { CommsService } from '../../services/comms/comms.service';

import { HeaderMainComponent } from './header-main.component';

// mock components
/* eslint-disable */
@Component({ selector: 'ibm-header', template: '<div></div>' })
class FakeIbmHeaderComponent {
	@Input() route;
	@Input() name;
}
// tslint:disable-next-line:component-selector
@Component({ selector: 'ibm-header-item', template: '<div></div>' })
class FakeIbmHeaderItemComponent { }
// tslint:disable-next-line:component-selector
@Component({ selector: 'ibm-header-global', template: '<div></div>' })
class FakeIbmHeaderGlobalComponent { }
// tslint:disable-next-line:component-selector
@Component({ selector: 'ibm-header-menu', template: '<div></div>' })
class FakeIbmHeaderMenuComponent {
	@Input() icon;
}
// tslint:disable-next-line:component-selector
@Component({ selector: 'ibm-header-action', template: '<div></div>' })
class FakeIbmHeaderActionComponent {
	@Input() active;
}
// tslint:disable-next-line:component-selector
@Component({ selector: 'ibm-panel', template: '<div></div>' })
class FakeIbmPanelComponent {
	@Input() expanded;
}
// tslint:disable-next-line:component-selector
@Component({ selector: 'ibm-switcher-list', template: '<div></div>' })
class FakeIbmSwitcherListComponent { }
// tslint:disable-next-line:component-selector
@Component({ selector: 'ibm-switcher-list-item', template: '<div></div>' })
class FakeIbmSwitcherListItemComponent { }
/* eslint-enable */

let mockCommsService;

describe('HeaderComponent', () => {
	mockCommsService = {
		getUserEmail: () => of('test-response')
	};

	let component: HeaderMainComponent;
	let fixture: ComponentFixture<HeaderMainComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				HeaderMainComponent,
				FakeIbmHeaderComponent,
				FakeIbmHeaderItemComponent,
				FakeIbmHeaderGlobalComponent,
				FakeIbmHeaderMenuComponent,
				FakeIbmHeaderActionComponent,
				FakeIbmPanelComponent,
				FakeIbmSwitcherListComponent,
				FakeIbmSwitcherListItemComponent
			],
			providers: [
				{ provide: NotificationService, useValue: {} },
				{ provide: NoteService, useValue: {} },
				{ provide: Router, useValue: {} },
				{ provide: ConfigService, useValue: {} },
				{ provide: TimesheetService, useValue: {} },
				{ provide: UserService, useValue: {} },
				{ provide: DataService, useValue: {} },
				{ provide: CommsService, useValue: mockCommsService }
			]
		});
		fixture = TestBed.createComponent(HeaderMainComponent);
		component = fixture.componentInstance;
	});

	it('should create the HeaderMainComponent', () => {
		expect(component).toBeTruthy();
	});
});
