// functions used for converting values for API call
// some filters need to be sent to API as strings instead of their native value (like a number or boolean)
const tableFilterToString = function (originalValue: any) {
	return (originalValue === undefined || originalValue === null) ? '' : originalValue.toString();
};
// this is a temporary transformation to only send one date until the API supports a date range
const tableFilterDateToString = function (originalValue: any) {
	return (originalValue === undefined || originalValue === null) ? '' : originalValue.startDate;
};
// this is a temporary transformation until the API supports multiple selection
const tableFilterTakeFirstOfArray = function (originalValue: any) {
	if (originalValue === undefined || originalValue.length === 0) {
		return undefined;
	} else {
		return originalValue[0];
	}
};

// date range component creates object with start/end date, but needs to result in array of properties
const tableFilterDateRangeToArray = function (originalValue: any) {
	return [originalValue.startDate, originalValue.endDate];
};

// functions for date filtering
const dateOnlyFridays = function(date: any) { return (date.getDay() === 5); };
const dateOnlySaturdays = function(date: any) { return (date.getDay() === 6); };

// help messages for search fields
const msg_startDate = 'Searching by start date will show all entries with that start date and AFTER that start date.';
const msg_endDate = 'Searching by end date will show all entries with that end date and BEFORE that end date.';
const msg_dateRange = 'Use \'From\' date, \'To\' date, or both to search within a range.';
const msg_remainingStHours = 'Searching by Remaining ST Hours will show all entries with equal or less remaining ST hours.';
const msg_supplierNo = 'An exact match of the full supplier number (case sensitive) is required.';

/**
 * Configuring table filters:
 * In the config file (src\assets\config\config.csv), the "Search" column should be an "x" to show up as a filter on the table
 * The "Validation Type" column can be left blank if it is simple text, or "boolean", "date", or "number" to specify the type
 * If the filter needs to be more complex, it can be configured in the below "fieldParams" object.
 * To specify params for a filter, add an object to filterParams, matching the names exactly as they are in the config.csv.
 *
 * Example: fieldParams['purchaseorder']['companycode']
 * (where 'purchaseorder' is from the 'Data Object' column, and 'companycode' is from the 'API Field' column of config.csv)
 *
 * These are the parameters that can be added:
 * 		type: data type of field to be used (boolean, text, select, number, date)
 * 		apiPropertyName: if the api takes a different name than what's in the config.csv
 * 			optionally, this can be an array to support filters that result in more than one property.
 * 			these names will be matched to a value array in the same order.
 * 		convertToApiProp: a function to transform data from the search field to the format required by the API
 * 		options: an array of {id, label} for 'select' types to show available options
 * 		helpMessage: helpful text displayed under field
 * 		dateFiltering: a function to return 'true' for dates to be enabled (all others disabled)
 */
export const fieldParams = {
	['timesheet']: {
		['statusuidescription']: {
			type: 'select',
			apiPropertyName: 'statusdescription',
			convertToApiProp: tableFilterTakeFirstOfArray,
			options: [
				{
					id: 'Pending approval',
					label: 'Pending Verification'
				}, {
					id: 'approved',
					label: 'Verified'
				}, {
					id: 'rejected',
					label: 'Rejected'
				}, {
					id: 'Pending SAM approval',
					label: 'Pending SAM Verification'
				}, {
					id: 'Pending Mgr approval',
					label: 'Pending Mgr Verification'
				}, {
					id: 'Unsubmitted',
					label: 'Unsubmitted'
				}, {
					id: 'Reason Code Submitted',
					label: 'Reason Code Submitted'
				}
			]
		},
		['migration.date']: {
			type: 'date',
			apiPropertyName: 'migrationdate',
			convertToApiProp: tableFilterDateToString
		},
		['hasovertime']: {
			type: 'boolean',
			convertToApiProp: tableFilterToString
		},
		['hasexpenses']: {
			type: 'boolean',
			convertToApiProp: tableFilterToString
		},
		['startdate']: {
			helpMessage: msg_startDate,
			convertToApiProp: tableFilterDateToString,
			dateFiltering: dateOnlySaturdays
		},
		['enddate']: {
			helpMessage: msg_endDate,
			convertToApiProp: tableFilterDateToString,
			dateFiltering: dateOnlyFridays
		},
		['approvaldatetime']: {
			type: 'daterange',
			apiPropertyName: ['approvalstartdate', 'approvalenddate'],
			convertToApiProp: tableFilterDateRangeToArray,
			helpMessage: msg_dateRange
		},
		['supplierid']: {
			helpMessage: msg_supplierNo
		}
	},
	['invoice']: {
		['reconciliationstatus']: {
			type: 'select',
			convertToApiProp: tableFilterTakeFirstOfArray,
			options: [
				{
					id: 'Pending',
					label: 'Pending'
				}, {
					id: 'Pass',
					label: 'Pass'
				}, {
					id: 'Failed',
					label: 'Failed'
				}, {
					id: 'Forced Pass',
					label: 'Forced Pass'
				}
			]
		},
		['billingstart']: {
			helpMessage: msg_startDate,
			convertToApiProp: tableFilterDateToString,
		},
		['billingend']: {
			helpMessage: msg_endDate,
			convertToApiProp: tableFilterDateToString,
		},
		['cleareddate']: {
			type: 'daterange',
			apiPropertyName: ['clearedstartdate', 'clearedenddate'],
			convertToApiProp: tableFilterDateRangeToArray,
			helpMessage: msg_dateRange
		},
		['supplierid']: {
			helpMessage: msg_supplierNo
		}
	},
	['bcinvoice']: {
		['billingstart']: {
			helpMessage: msg_startDate,
			convertToApiProp: tableFilterDateToString,
		},
		['billingend']: {
			helpMessage: msg_endDate,
			convertToApiProp: tableFilterDateToString,
		},
		['supplierid']: {
			helpMessage: msg_supplierNo
		}
	},
	['supplierinvoice']: {
		['billingstart']: {
			helpMessage: msg_startDate,
			convertToApiProp: tableFilterDateToString,
		},
		['billingend']: {
			helpMessage: msg_endDate,
			convertToApiProp: tableFilterDateToString,
		},
		['rejectionstatus']: {
			type: 'select',
			convertToApiProp: tableFilterTakeFirstOfArray,
			options: [
				{
					id: 'Complete',
					label: 'Complete'
				}, {
					id: 'Requested',
					label: 'Requested'
				}
			]
		}
	},
	['user']: {
		['rolename']: {
			type: 'select',
			apiPropertyName: 'role',
			convertToApiProp: tableFilterTakeFirstOfArray,
			options: [
				{
					id: 'pm',
					label: 'Manager'
				}, {
					id: 'sam',
					label: 'Supplier Account Manager'
				}, {
					id: 'srm',
					label: 'Supplier Relations Manager'
				}, {
					id: 'contractor',
					label: 'Contractor'
				}, {
					id: 'tra',
					label: 'Delegated Time Verifier'
				}, {
					id: 'cca',
					label: 'Contractor Administrator'
				}, {
					id: 'sa',
					label: 'Supplier Administrator'
				}, {
					id: 'fa',
					label: 'Finance Analyst'
				}
			]
		}
	},
	['contractor']: {
		['actualstartdate']: {
			helpMessage: msg_startDate,
			convertToApiProp: tableFilterDateToString,
		},
		['actualenddate']: {
			helpMessage: msg_endDate,
			convertToApiProp: tableFilterDateToString,
		},
		['supplierid']: {
			helpMessage: msg_supplierNo
		},
		['editdesc']: {
			type: 'select',
			apiPropertyName: 'editdesc',
			convertToApiProp: tableFilterTakeFirstOfArray,
			options: [
				{
					id: 'All approved',
					label: 'All Approved'
				}, {
					id: 'Pending MGR approval',
					label: 'Pending MGR Approval'
				}, {
					id: 'Pending MGR edits',
					label: 'Pending MGR Edits'
				}, {
					id: 'Pending MGR edits,approval',
					label: 'Pending MGR Edits, Approval'
				}, {
					id: 'Pending SAM approval',
					label: 'Pending SAM Approval'
				}, {
					id: 'Pending SAM edits',
					label: 'Pending SAM Edits'
				}, {
					id: 'Pending SAM edits,approval',
					label: 'Pending SAM Edits, Approval'
				}, {
					id: 'Pending MGR,SAM edits',
					label: 'Pending MGR, SAM Edits'
				}
			]
		},
	},
	['purchaseorder']: {
		['remainingSTQuantity']: {
			helpMessage: msg_remainingStHours
		},
		['supplierid']: {
			helpMessage: msg_supplierNo
		}
	},
	['smartcontract']: {
		['supplierid']: {
			helpMessage: msg_supplierNo
		}
	}
};
