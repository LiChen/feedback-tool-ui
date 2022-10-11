import { Component, OnInit } from '@angular/core';
import { SpendService } from 'src/app/services/spend/spend.service';


@Component({
	selector: 'fb-modal-feedback-submit',
	templateUrl: './modal-feedback-submit.component.html',
	styleUrls: ['./modal-feedback-submit.component.scss']
})
export class ModalFeedbackSubmitComponent implements OnInit {
	clientOptions: Array<any>;
	categoryOptions: Array<any>;
	unspscOptions: Array<any>;

	categoryDisabled = true;
	unspscDisabled = true;

	open = true;
	selectedUNSPSC: any;

	constructor(
		public spendService: SpendService
	) {
		this.clientOptions = [
			{
				id: 'c1',
				content: 'Coco Cola'
			}, {
				id: 'c2',
				content: 'Bank of America'
			}, {
				id: 'c3',
				content: 'Costco Wholesale'
			}
		];
		this.categoryOptions = [
			{
				id: 'prs4',
				content: 'Personal Relocation Services L4'
			}, {
				id: 'ppe3',
				content: 'Personal Protective Equipment (L3)'
			}, {
				id: 'ppe4',
				content: 'Personal Protective Equipment (L4)'
			}
		];
		this.unspscOptions = [
			{
				id: 'unspsc1',
				content: 'Ear Gauge Measuring Device (L4)'
			}, {
				id: 'unspsc2',
				content: 'Respiratory Protection (L3)'
			}, {
				id: 'unspsc23',
				content: 'Mask or Accesories (L4)'
			}, {
				id: 'unspsc4',
				content: 'Respirators (L4)'
			}, {
				id: 'unspsc5',
				content: 'Gas Masks (L4)'
			}
		]
	}

	ngOnInit(): void {
	}

	onSelected(event:any, optionType: string) {
		if (optionType === 'client') {
			this.categoryDisabled = false;
			this.unspscDisabled = true;
		} else if (optionType === 'category') {
			this.unspscDisabled = false;
		}  else if (optionType === 'unspsc') {
			this.selectedUNSPSC = event.item;
		}
	}

	onSearch(event: any) {
	}

	onCloseFeedbackModal() {
		this.spendService.showFeedbackSubmit = false;
	}

	onSubmit() {
		// this.spendService.selectedSpendRows
		this.onCloseFeedbackModal();
	}
}
