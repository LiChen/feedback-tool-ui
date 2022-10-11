// Core Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {
	ButtonModule,
	CheckboxModule,
	GridModule,
	PaginationModule,
	TilesModule,
	TableModule,
	TableModel,

	UIShellModule,
	DropdownModule,
	NotificationModule,
	NFormsModule,
	DialogModule,
	DatePickerModule,
	AccordionModule,
	IconModule,
	ComboBoxModule,
	SelectModule,
	InputModule,
	ModalModule
} from 'carbon-components-angular';


// APPLICATION SERVICES
import { CommsService } from './services/comms/comms.service';
import { SpendService } from './services/spend/spend.service';
import { PageSpendsComponent } from './components/page-spends/page-spends.component';
import { CarbonTableComponent } from './components/carbon-table/carbon-table.component';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { ModalFeedbackSubmitComponent } from './components/modal-feedback-submit/modal-feedback-submit.component';

@NgModule({
	declarations: [
		AppComponent,
		PageSpendsComponent,
		CarbonTableComponent,
		HeaderMainComponent,
		TableFilterComponent,
  ModalFeedbackSubmitComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ButtonModule,
		CheckboxModule,
		GridModule,
		PaginationModule,
		TilesModule,
		TableModule,
		UIShellModule,
		FormsModule,

		DropdownModule,
		NotificationModule,
		NFormsModule,
		DialogModule,
		DatePickerModule,
		AccordionModule,
		IconModule,
		ComboBoxModule,
		SelectModule,
		InputModule,
		ModalModule
	],
	providers: [
		CommsService,
		SpendService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
