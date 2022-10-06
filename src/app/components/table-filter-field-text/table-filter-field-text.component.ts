import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
	selector: 'fb-table-filter-field-text',
	templateUrl: './table-filter-field-text.component.html'
})
export class TableFilterFieldTextComponent implements AfterViewInit {
	@Input() name: string = '';
	//@ts-ignore
	@Input() value: String;
	@Input() helpMessage: string = '';
	@Output() valueChange = new EventEmitter<String>();
	@Output() onInputEnter = new EventEmitter<void>();
	// @ts-ignore
	@ViewChild('field') field: ElementRef;

	ngAfterViewInit() {
		this.field.nativeElement.focus();
	}


	changeValue(event: any) {
		this.valueChange.emit(event);
	}

	/**
	 * Check for keypress in text field and emit event if the key pressed was ENTER
	 */
	handleKeydown(event: any) {
		if (event.keyCode === 13) {
			this.onInputEnter.emit();
		}
	}
}

