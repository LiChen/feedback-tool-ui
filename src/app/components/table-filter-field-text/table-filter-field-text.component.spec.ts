import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TableFilterFieldTextComponent } from './table-filter-field-text.component';
import { FormsModule } from '@angular/forms';
import { InputModule } from 'carbon-components-angular';

describe('TableFilterFieldTextComponent', () => {
	let component: TableFilterFieldTextComponent;
	let fixture: ComponentFixture<TableFilterFieldTextComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TableFilterFieldTextComponent
			],
			imports: [FormsModule, InputModule]
		});
		fixture = TestBed.createComponent(TableFilterFieldTextComponent);
		component = fixture.componentInstance;
	});

	it('should create the TableFilterFieldTextComponent', () => {
		expect(component).toBeTruthy();
	});
});
