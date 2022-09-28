import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
	selector: 'fb-table-filter-field-text',
	templateUrl: './table-filter-field-text.component.html'
})
export class TableFilterFieldTextComponent {
	@Input() name: string = '';
	@Input() value: string = '';
	@Input() helpMessage: string ='help text goes here';
	@Output() valueChange = new EventEmitter<String>();
	@Output() onInputEnter = new EventEmitter<void>();

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
