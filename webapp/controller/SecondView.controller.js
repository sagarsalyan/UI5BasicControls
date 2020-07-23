sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	'sap/ui/export/Spreadsheet'
], function (Controller, Export, ExportTypeCSV, Spreadsheet) {
	"use strict";

	return Controller.extend("BasicControls.BasicControls.controller.SecondView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BasicControls.BasicControls.view.SecondView
		 */
		onInit: function () {

			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},

		_handleRouteMatched: function (oEvent) {
			debugger;
			//sap.ui.table
			var oTable = this.getView().byId("idResultsTable");
			var resultsCol = {
				"columns": [{
					"columnName": "First Name",
					"coltemplate": "firstname"
				}, {
					"columnName": "Last Name",
					"coltemplate": "lastname"
				}, {
					"columnName": "Department",
					"coltemplate": "dept"
				}, {
					"columnName": "DOB",
					"coltemplate": "dob"
				}]
			};

			var resultsRows = {
				"rows": [

					{
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}
				]
			};
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				rows: resultsRows.rows,
				columns: resultsCol.columns
			});
			oTable.setModel(oModel);
			oTable.bindColumns("/columns", function (sId, oContext) {
				var columnName = oContext.getObject().columnName;
				var coltemplate = oContext.getObject().coltemplate;
				return new sap.ui.table.Column({
					label: columnName,
					template: coltemplate
				});
			});
			oTable.bindRows("/rows");
			//sap.ui.table

			//sap.m.table
			var oTablem = this.getView().byId("idResultsTablem");
			oTablem.removeAllColumns();

			var OHColumn = [
				new sap.m.Column({
					header: new sap.m.Text({
						text: "FirstName"
					})
				}),
				new sap.m.Column({
					header: new sap.m.Text({
						text: "LastName"
					}),
					mergeDuplicates: true
				}),
				new sap.m.Column({
					header: new sap.m.Text({
						text: "Dept"
					})
				}),
				new sap.m.Column({
					header: new sap.m.Text({
						text: "DOB"
					})
				})
			];
			oTablem.setHeaderText("Demo");
			OHColumn.forEach(function (item) {
				oTablem.addColumn(item);
			});
			resultsRows = {
				"rows": [

					{
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}, {
						"firstname": "Sagar",
						"lastname": "Salyan",
						"dept": "Comp.Sci.",
						"dob": new Date()
					}
				]
			};
			oModel = new sap.ui.model.json.JSONModel(resultsRows);
			oTablem.setModel(oModel);

			var OHCells = [
				new sap.m.Text({
					text: "{firstname}"
				}),
				new sap.m.Text({
					text: "{lastname}"
				}),
				new sap.m.Text({
					text: "{dept}"
				}),
				new sap.m.Text({
					text: {
						path: "dob",
						type: 'sap.ui.model.type.Date',
						formatOptions: {
							pattern: 'dd/MM/yyyy'
						}
					}
				})
			];
			var mytemplate = new sap.m.ColumnListItem({
				cells: OHCells
			});
			oTablem.bindAggregation("items", {
				path: "/rows",
				template: mytemplate
			});
			//sap.m.table

		},
		onDownloadCSV: function () {
			debugger;
			var itemModel = this.getView().byId("idResultsTablem").getModel();
			var oExport = new Export({

				exportType: new ExportTypeCSV({
					separatorChar: ","
				}),

				models: itemModel,

				rows: {
					path: "/rows"
				},

				columns: [{
					name: "Firstname",
					template: {
						content: "{firstname}"
					}
				}, {
					name: "LastName",
					template: {
						content: "{lastname}"
					}
				}, {
					name: "Dept",
					template: {
						content: "{dept}"
					}
				}, {
					name: "DOB",
					template: {
						content: "{dob}"
					}
				}]

			});
			console.log(oExport);
			oExport.saveFile().catch(function (oError) {
				console.log("error");
			}).then(function () {
				oExport.destroy();
			});
		},
		onDownloadSS: function () {
			debugger;
			var aCols, oSettings, oSheet;
			// aCols = this.createColumnConfig();
			var aCols = [];

			aCols.push({
				label: 'FirstName',
				property: 'firstname',
				type: 'string'
			});

			aCols.push({
				label: 'Lastname',
				property: 'lastname',
				type: 'string'
			});

			aCols.push({
				label: 'Dept',
				property: 'dept',
				type: 'string'
			});

			aCols.push({
				label: 'DOB',
				property: 'dob',
				type: 'date'
			});
			var oModel = this.getView().byId("idResultsTablem").getModel();
			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: oModel.getData().rows
			};
			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then(function () {
					sap.m.MessageToast.show('Template downloaded. Please fill the sheet and upload');
				})
				.finally(function () {
					oSheet.destroy();
				});
		},
		onLiveChange: function (oEvent) {
			debugger
			var val1 = parseInt(oEvent.getSource().getParent().getCells()[0].getValue());
			var val2 = parseInt(oEvent.getSource().getParent().getCells()[2].getValue());
			var exp = oEvent.getSource().getParent().getCells()[1].getText();
			var res;

			switch (exp) {
			case "+":
				res =  val1 + val2;
				break;
			case "-":
				res =  val1 - val2;
				break;
			case "x":
				res =  val1 * val2;
				break;
			case "/":
				res =  val1 / val2;
				break;
			}
			 res = isNaN(res) ? 0 : res;
			 oEvent.getSource().getParent().getCells()[3].setValue(res);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf BasicControls.BasicControls.view.SecondView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf BasicControls.BasicControls.view.SecondView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf BasicControls.BasicControls.view.SecondView
		 */
		//	onExit: function() {
		//
		//	}

	});

});