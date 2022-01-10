sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	'sap/ui/export/Spreadsheet',
	'sap/ui/export/library',
	"sap/m/ColumnListItem",
	"BasicControls/BasicControls/utils/jszip",
	"BasicControls/BasicControls/utils/xlsx",

], function (Controller, Export, ExportTypeCSV, Spreadsheet, exportLibrary, ColumnListItem, jszip, xlsx) {
	"use strict";
	var EdmType = exportLibrary.EdmType;
	return Controller.extend("BasicControls.BasicControls.controller.SecondView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BasicControls.BasicControls.view.SecondView
		 */
		onInit: function () {
			debugger
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);

			var rows = [{
				exp: "+"
			}, {
				exp: "-"
			}, {
				exp: "x"
			}, {
				exp: "/"
			}, ]
			var oRows = new sap.ui.model.json.JSONModel(rows);
			this.getView().byId("mathTable").setModel(oRows, "oRows")

			//Drag and drop table data
			var items = {
				avproduct: [{
					rowId: 1,
					productName: "Notebook",
					category: "Stationary",
					quantity: "10"
				}, {
					rowId: 2,
					productName: "Pencil",
					category: "Stationary",
					quantity: "15"
				}, {
					rowId: 3,
					productName: "Laptop",
					category: "Electronics",
					quantity: "5"
				}, {
					rowId: 4,
					productName: "Mouse",
					category: "Electronics",
					quantity: "10"
				}, {
					rowId: 5,
					productName: "CPU",
					category: "Electronics",
					quantity: "1"
				}],
				seproduct: []
			}
			var itemModel = new sap.ui.model.json.JSONModel(items)
			this.getView().byId("atable").setModel(itemModel)
			this.getView().byId("stable").setModel(itemModel)

			//Dynamic Table Container
			var tableData = {
				tableData: {
					name: "Product List",
					count: 5,
					tables: [{
						tableName: "TV",
						items: [{
							brand: "LG",
							price: "45000"
						}, {
							brand: "MI",
							price: "12000"
						}, {
							brand: "Samsung",
							price: "71000"
						}, {
							brand: "Philips",
							price: "72000"
						}, {
							brand: "Sony",
							price: "92000"
						}]
					}, {
						tableName: "Phone",
						items: [{
							brand: "Motorola",
							price: "17000"
						}, {
							brand: "Samsung",
							price: "75000"
						}, {
							brand: "One Plus",
							price: "35000"
						}, {
							brand: "Sony",
							price: "35000"
						}, {
							brand: "Lava",
							price: "13000"
						}]
					}, {
						tableName: "Laptop",
						items: [{
							brand: "DELL",
							price: "45000"
						}, {
							brand: "HP",
							price: "35000"
						}, {
							brand: "Samsung",
							price: "55000"
						}]
					}]
				}
			}

			var tableDataModel = new sap.ui.model.json.JSONModel(tableData);
			this.getView().byId("dynTabCont").setModel(tableDataModel);

			//FactoryMethod
			var arr = [{
				"Name": "a",
				"City": "w",
				"Amount": 10,
			}, {
				"Name": "b",
				"City": "x",
				"Amount": 2,
			}, {
				"Name": "c",
				"City": "y",
				"Amount": 0,
			}, {
				"Name": "d",
				"City": "z",
				"Amount": 0,
			}, ];
			var demoModel = new sap.ui.model.json.JSONModel({
				"results": arr
			});
			this.getView().byId("ID_DEMO").setModel(demoModel, "demoModel");
			//FactoryMethod

			//Merged UI Table
			var jsonData = [{
				a: "1",
				b: "Column"
			}, {
				a: "2",
				b: "Column n"
			}, {
				a: "1",
				b: "Column s"
			}, {
				a: "2",
				b: "Column"
			}, {
				a: "2",
				b: "Column s"
			}, {
				a: "Test s",
				b: "Column"
			}, {
				a: "Test s",
				b: "Column s"
			}];
			var jsonModel = new sap.ui.model.json.JSONModel(jsonData);

			var oTable = new sap.ui.table.Table({
				id: "table",
				selectionMode: sap.ui.table.SelectionMode.None,
				visibleRowCount: 7,
				columns: [new sap.ui.table.Column({
						label: "Test",
						id: "id2",
						visible: true,
						showSortMenuEntry: false,
						template: new sap.m.Text({
							text: "{a}"
						}),
						sortProperty: "a"
					}),
					new sap.ui.table.Column({
						label: "Column",
						id: "id3",
						visible: true,
						template: new sap.m.Text({
							text: "{b}"
						})
					})
				]
			});
			this.getView().byId("mergeTableBox").addItem(oTable);
			sap.ui.getCore().byId("table").setModel(jsonModel).bindRows("/");

			var oColumn = oTable.getColumns()[0];
			oTable.sort(oColumn);
			//Aggregate first column for similar values
			oTable.onAfterRendering = function () {
				sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
				var aRows = oTable.getRows();
				if (aRows && aRows.length > 0) {
					var pRow = {};
					for (var i = 0; i < aRows.length; i++) {
						if (i > 0) {
							var pCell = pRow.getCells()[0],
								cCell = aRows[i].getCells()[0];
							if (cCell.getText() === pCell.getText()) {
								$("#" + cCell.getId()).css("visibility", "hidden");
								$("#" + pRow.getId() + "-col0").css("border-bottom-style", "hidden");
							}
						}
						pRow = aRows[i];
					}
				}
			};

			//Merged UI Table
		},
		onButtonPress: function (oEvent) {
			debugger;
			var oData = {
				message: "View 2 button was clicked."
			};

			var oEventBus = this.getOwnerComponent().getEventBus();
			oEventBus.publish("View2", "evtPress", oData);

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
					template: new sap.m.Input({
						value: "{" + coltemplate + "}"
					})
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
					})
				}),
				new sap.m.Column({
					header: new sap.m.Text({
						text: "Dept"
					}),
					mergeDuplicates: true
				}),
				new sap.m.Column({
					header: new sap.m.Text({
						text: "Mark"
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
						"mark": 80,
						"dob": new Date()
					}, {
						"firstname": "Sunil",
						"lastname": "Poojari",
						"dept": "Comp.Sci.",
						"mark": 90,
						"dob": new Date()
					}, {
						"firstname": "Shiva",
						"lastname": "Poojari",
						"dept": "Comp.Sci.",
						"mark": 70,
						"dob": new Date()
					}, {
						"firstname": "Rakshi",
						"lastname": "Kulal",
						"dept": "Comp.Sci.",
						"mark": 80,
						"dob": new Date()
					}, {
						"firstname": "Karan",
						"lastname": "Rathod",
						"dept": "Comp.Sci.",
						"mark": 60,
						"dob": new Date()
					}, {
						"firstname": "Swasthik",
						"lastname": "Bhat",
						"dept": "Comp.Sci.",
						"mark": 50,
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
					text: "{mark}"
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
				type: EdmType.Date,
				format: 'dd-mm-yyyy h:mm:ss AM/PM',
				width: 25
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
		onUpload: function (e) {
			this._import(e.getParameter("files") && e.getParameter("files")[0]);
		},
		_import: function (file) {
			var that = this;
			var excelData = {};
			if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var data = e.target.result;
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function (sheetName) {
						// Here is your object for every sheet in workbook
						excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

					});
					// Setting the data to the local model 
					this.getView().byId("idResultsTablem").getModel().setData({
						items: excelData
					});
					this.getView().byId("idResultsTablem").getModel().refresh(true);
				}.bind(this);
				reader.onerror = function (ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		},
		onSend: function (oEvent) {
			debugger
			var selectedData = this.getView().byId("idResultsTablem").getSelectedItems().map(data => data.getBindingContext().getObject());
			alert(JSON.stringify(selectedData))
				// or

			var selectedData2;
			var data = this.getView().byId("idResultsTablem").getSelectedItems()
				// for loop
		},
		onSelectionChange: function (oEvent) {
			debugger
			// oEvent.getParameter('listItem').addStyleClass('cssSelectedBg');
			oEvent.getParameter('listItem').addCustomData(new sap.ui.core.CustomData({
				key: "selected",
				value: "true",
				writeToDom: true

			}));
		},
		onTotal: function (oEvent) {
			debugger
			var selectedData = this.getView().byId("idResultsTablem").getSelectedItems().map(data => data.getBindingContext().getObject());
			var total = selectedData.reduce((acc, cur) => {
				return {
					mark: acc.mark + cur.mark
				}
			})
			var mark = total.mark
			alert(mark)
		},
		onLiveChange: function (oEvent) {
			debugger
			var val1 = parseInt(oEvent.getSource().getParent().getCells()[0].getValue());
			var val2 = parseInt(oEvent.getSource().getParent().getCells()[2].getValue());
			var exp = oEvent.getSource().getParent().getCells()[1].getText();
			var res;

			switch (exp) {
			case "+":
				res = val1 + val2;
				break;
			case "-":
				res = val1 - val2;
				break;
			case "x":
				res = val1 * val2;
				break;
			case "/":
				res = val1 / val2;
				break;
			}
			res = isNaN(res) ? 0 : res;
			oEvent.getSource().getParent().getCells()[3].setValue(res);
		},
		onClear: function (oEvent) {
			debugger
			//with RowID
			var rowId = oEvent.getSource().getId().split("-")[4]
			this.getView().byId("mathTable").getItems()[rowId].getCells()[0].setValue("")
			this.getView().byId("mathTable").getItems()[rowId].getCells()[2].setValue("")
			this.getView().byId("mathTable").getItems()[rowId].getCells()[3].setValue("")

			//without RowID
			// oEvent.getSource().getParent().getCells()[0].setValue("")
			// oEvent.getSource().getParent().getCells()[2].setValue("")
			// oEvent.getSource().getParent().getCells()[3].setValue("")
		},
		onDocPress: function () {
			var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
				"xmlns:w='urn:schemas-microsoft-com:office:word' " +
				"xmlns='http://www.w3.org/TR/REC-html40'>" +
				"<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

			var content = "<input type='text' value='Sagar'/>";
			var footer = "</body></html>";
			// var sourceHTML = header + document.getElementById("SimpleFormChange354").innerHTML + footer;
			// var sourceHTML = header + this.getView().byId("SimpleFormChange354").$().html() + footer;
			var sourceHTML = header + content + footer;

			var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
			var fileDownload = document.createElement("a");
			document.body.appendChild(fileDownload);
			fileDownload.href = source;
			fileDownload.download = 'document.doc';
			fileDownload.click();
			document.body.removeChild(fileDownload);
		},
		onPDFPress: function () {
			var content = "<div style=float:left>" +
				"<p>School Name        : " + "Satya Narayana High School Perla" + "</p>" +
				"<p>Owner Name         : " + "Sagar Salyan" + "</p>" +
				"<p>Owner E-mail       : " + "sagarslyn@gmail.com" + "</p>" +
				"</div><div style=float:right>" +
				"<p>Owner Mobile No    : " + "8129482811" + "</p>" +
				"<p>Owner Staus        : " + "Owned" + "</p>" +
				"<p>Scholl Address     : " + "Perla" + "</p>" +
				"</div>";
			var wind = window.open("", "prntExample");
			wind.document.write(content);

			setTimeout(function () {
				wind.print();
				wind.close();
			}, 1000);
		},
		onPDFPress2: function (oEvent) {
			var data =
				"JVBERi0xLjMNCiXi48/TDQolUlNUWFBERjMgUGFyYW1ldGVyczogQUJEUFJTVFhiaA0KJURldnR5cGUgSFBMSklJSUQgRm9udCBDT1VSSUVSICBib2xkIDEyMCBMYW5nIEVOIFNjcmlwdDogIDAgLT4vQzAwMQ0KMyAwIG9iag0KPDwNCi9UeXBlIC9Gb250RGVzY3JpcHRvcg0KL0FzY2VudCA3MjANCi9DYXBIZWlnaHQgNjYwDQovRGVzY2VudCAtMjcwDQovRmxhZ3MgMzINCi9Gb250QkJveCBbLTE4NCAtMjM2IDEyODcgOTI4IF0NCi9Gb250TmFtZSAvUnVwZWVGb3JhZGlhbg0KL0l0YWxpY0FuZ2xlIDANCi9TdGVtViAxMDUNCi9Gb250RmlsZTIgMiAwIFINCj4+DQplbmRvYmoNCjQgMCBvYmoNCi9XaW5BbnNpRW5jb2RpbmcNCmVuZG9iag0KNSAwIG9iag0KPDwNCi9UeXBlIC9Gb250DQovU3VidHlwZSAvVHJ1ZVR5cGUNCi9CYXNlRm9udCAvUnVwZWVGb3JhZGlhbg0KL05hbWUgL0MwMDENCi9FbmNvZGluZyA0IDAgUg0KL1dpZHRocw0KWyAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDANCiAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMCAwNjAwIDA2MDAgMDYwMF0NCi9GaXJzdENoYXIgMzINCi9MYXN0Q2hhciAxMjYNCi9Gb250RGVzY3JpcHRvciAzIDAgUg0KPj4NCmVuZG9iag0KNiAwIG9iag0KPDwNCi9GaWx0ZXIgNyAwIFINCi9MZW5ndGggOCAwIFINCj4+DQpzdHJlYW0NCnic7chREUAhCERRKlDBClSgghWoYAUrUIEKVNgKVrAC+mK8Gc/P7tw5Z2aq6t57rSUirbUxBjOLA6jee0QUYI4bHOV3qszMvwciEruh6Hn+5gA2wCs8DQplbmRzdHJlYW0NCmVuZG9iag0KOCAwIG9iag0KODYNCmVuZG9iag0KNyAwIG9iag0KDQpbL0ZsYXRlRGVjb2RlXQ0KZW5kb2JqDQo5IDAgb2JqDQo8PA0KL1R5cGUgL1hPYmplY3QNCi9TdWJ0eXBlIC9JbWFnZQ0KL0ZpbHRlciAxMCAwIFINCi9MZW5ndGggMTEgMCBSDQovTmFtZSAvMDAwMDkNCi9XaWR0aCA1Ng0KL0hlaWdodCA0OQ0KL0JpdHNQZXJDb21wb25lbnQgOA0KL0NvbG9yU3BhY2UgWyAvSW5kZXhlZCAvRGV2aWNlUkdCIDI1NSA2IDAgUl0NCj4+DQpzdHJlYW0NCnic7da7DsMgDAXQGQ9AusD/f2kjKrXB9/qRbpXqDcIp2KSBOX86RNoZIrdQL+MdpWdVHSpqZtam1ZKRksLYGf6UYqgAOmyMw2QPjzkz+syEVkk+cT85J8WY0QkT09H9j7PjE6YYlrTnHCwU/gQ8SrzMRmsVOqNbJ6ifH0bakRNjVyPXv3TVKHPkXgliQXU98TUrdFO1o0Poj+1Btxhd0468MMwBIwslDpbJSweOnRUwiHZhwNcTHf8Q6hMFHMmOrZR0pKBuP0y3D1RNh+0j95bL5jy4Cw/cy4l7calrhdTdlfxlZNHlavoa8o8VT1PE95oNCmVuZHN0cmVhbQ0KZW5kb2JqDQoxMSAwIG9iag0KMjQxDQplbmRvYmoNCjEwIDAgb2JqDQoNClsvRmxhdGVEZWNvZGVdDQplbmRvYmoNCiVEZXZ0eXBlIEhQTEpJSUlEIEZvbnQgVElNRVMgICAgYm9sZCAxMjAgTGFuZyBFTiBTY3JpcHQ6ICAwIC0+L0MwMDINCjEyIDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnREZXNjcmlwdG9yDQovQXNjZW50IDcyMA0KL0NhcEhlaWdodCA2NjANCi9EZXNjZW50IC0yNzANCi9GbGFncyAzMg0KL0ZvbnRCQm94IFstMTg0IC0yMzYgMTI4NyA5MjggXQ0KL0ZvbnROYW1lIC9SdXBlZUZvcmFkaWFuDQovSXRhbGljQW5nbGUgMA0KL1N0ZW1WIDEwNQ0KL0ZvbnRGaWxlMiAyIDAgUg0KPj4NCmVuZG9iag0KMTMgMCBvYmoNCjw8DQovVHlwZSAvRm9udA0KL1N1YnR5cGUgL1RydWVUeXBlDQovQmFzZUZvbnQgL1J1cGVlRm9yYWRpYW4NCi9OYW1lIC9DMDAyDQovRW5jb2RpbmcgNCAwIFINCi9XaWR0aHMNClsgMDUwMCAwMzMzIDA0NjMgMDUwMCAwNTAwIDA4ODggMDgzMyAwMzMzIDAzMzMgMDMzMyAwNTAwIDA4ODggMDMzMyAwMzMzIDAzMzMgMDMzMyAwNTAwIDA1MDAgMDUwMCAwNTAwIDA1MDAgMDUwMCAwNTAwIDA1MDAgMDUwMCAwNTAwIDAzMzMgMDMzMyAxMDAwIDA4ODggMTAwMCAwNTAwIDA4ODggMDcyMSAwNjY3IDA3MjEgMDcyMSAwNjY3IDA2MTMgMDc3OSAwNzc5IDAzODggMDQ3OSAwNzc5IDA2NjcgMDk0NiAwNzIxIDA3NzkgMDYxMyAwNzc5DQogMDcyMSAwNTU0IDA2NjcgMDcyMSAwNzIxIDEwMDAgMDcyMSAwNzIxIDA2NjcgMDMzMyAwMzMzIDAzMzMgMDUwMCAwNTAwIDAzMzMgMDUwMCAwNTU0IDA0NDYgMDU1NCAwNDQ2IDAzNTAgMDUwMCAwNTU0IDAyNzkgMDMzMyAwNTU0IDAyNzkgMDgzMyAwNTU0IDA1MDAgMDU1NCAwNTU0IDA0NDYgMDM4OCAwMzMzIDA1NTQgMDUwMCAwNzIxIDA1MDAgMDUwMCAwNDQ2IDA1MDAgMDUwMCAwNTAwIDEwMDBdDQovRmlyc3RDaGFyIDMyDQovTGFzdENoYXIgMTI2DQovRm9udERlc2NyaXB0b3IgMTIgMCBSDQo+Pg0KZW5kb2JqDQolRGV2dHlwZSBIUExKSUlJRCBGb250IExOUFJJTlQgIG5vcm1hbCAwODUgTGFuZyBFTiBTY3JpcHQ6ICAwIC0+L0MwMDMNCjE0IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnREZXNjcmlwdG9yDQovQXNjZW50IDcyMA0KL0NhcEhlaWdodCA2NjANCi9EZXNjZW50IC0yNzANCi9GbGFncyAzMg0KL0ZvbnRCQm94IFstMTg0IC0yMzYgMTI4NyA5MjggXQ0KL0ZvbnROYW1lIC9SdXBlZUZvcmFkaWFuDQovSXRhbGljQW5nbGUgMA0KL1N0ZW1WIDEwNQ0KL0ZvbnRGaWxlMiAyIDAgUg0KPj4NCmVuZG9iag0KMTUgMCBvYmoNCjw8DQovVHlwZSAvRm9udA0KL1N1YnR5cGUgL1RydWVUeXBlDQovQmFzZUZvbnQgL1J1cGVlRm9yYWRpYW4NCi9OYW1lIC9DMDAzDQovRW5jb2RpbmcgNCAwIFINCi9XaWR0aHMNClsgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2DQogMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDYgMDUwNiAwNTA2IDA1MDZdDQovRmlyc3RDaGFyIDMyDQovTGFzdENoYXIgMTI2DQovRm9udERlc2NyaXB0b3IgMTQgMCBSDQo+Pg0KZW5kb2JqDQolRGV2dHlwZSBIUExKSUlJRCBGb250IENPVVJJRVIgIGJvbGQgMTAwIExhbmcgRU4gU2NyaXB0OiAgMCAtPi9DMDAxDQoxNiAwIG9iag0KPDwNCi9UeXBlIC9YT2JqZWN0DQovU3VidHlwZSAvSW1hZ2UNCi9GaWx0ZXIgMTcgMCBSDQovTGVuZ3RoIDE4IDAgUg0KL05hbWUgLzAwMDE2DQovV2lkdGggNTENCi9IZWlnaHQgNTcNCi9CaXRzUGVyQ29tcG9uZW50IDENCi9JbWFnZU1hc2sgdHJ1ZQ0KPj4NCnN0cmVhbQ0KeJx9j20KgCAMhqcE/vQIHcWjJXgy6SJ2g36G1Jab2Sek8DyK76Zmyj+TqPNgiQfoYkVYF+UAtCPeBmTGxhZ9lvQSnW7REY/iEkEjAlvlWGC2i0EYhYmp0iDZuWqRErX2VfbsWq4w+H5lavx+2O/KucwYDQplbmRzdHJlYW0NCmVuZG9iag0KMTggMCBvYmoNCjExNA0KZW5kb2JqDQoxNyAwIG9iag0KDQpbL0ZsYXRlRGVjb2RlL1J1bkxlbmd0aERlY29kZV0NCmVuZG9iag0KMTkgMCBvYmoNCjw8DQovVHlwZSAvWE9iamVjdA0KL1N1YnR5cGUgL0ltYWdlDQovRmlsdGVyIDIwIDAgUg0KL0xlbmd0aCAyMSAwIFINCi9OYW1lIC8wMDAxOQ0KL1dpZHRoIDUxDQovSGVpZ2h0IDU3DQovQml0c1BlckNvbXBvbmVudCAxDQovSW1hZ2VNYXNrIHRydWUNCj4+DQpzdHJlYW0NCnicfY9tCoAgDIanBP70CB3FoyV4MukidoN+htSWm9knpPA8iu+mZso/k6jzYIkH6GJFWBflALQj3gZkxsYWfZb0Ep1u0RGP4hJBIwJb5VhgtotBGIWJqdIg2blqkRK19lX27FquMPh+ZWr8ftjvyrnMGA0KZW5kc3RyZWFtDQplbmRvYmoNCjIxIDAgb2JqDQoxMTQNCmVuZG9iag0KMjAgMCBvYmoNCg0KWy9GbGF0ZURlY29kZS9SdW5MZW5ndGhEZWNvZGVdDQplbmRvYmoNCiVEZXZ0eXBlIEhQTEpJSUlEIEZvbnQgSEVMVkUgICAgYm9sZCAxMDAgTGFuZyBFTiBTY3JpcHQ6ICAwIC0+L0MwMDQNCjIyIDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnREZXNjcmlwdG9yDQovQXNjZW50IDcyMA0KL0NhcEhlaWdodCA2NjANCi9EZXNjZW50IC0yNzANCi9GbGFncyAzMg0KL0ZvbnRCQm94IFstMTg0IC0yMzYgMTI4NyA5MjggXQ0KL0ZvbnROYW1lIC9SdXBlZUZvcmFkaWFuDQovSXRhbGljQW5nbGUgMA0KL1N0ZW1WIDEwNQ0KL0ZvbnRGaWxlMiAyIDAgUg0KPj4NCmVuZG9iag0KMjMgMCBvYmoNCjw8DQovVHlwZSAvRm9udA0KL1N1YnR5cGUgL1RydWVUeXBlDQovQmFzZUZvbnQgL1J1cGVlRm9yYWRpYW4NCi9OYW1lIC9DMDA0DQovRW5jb2RpbmcgNCAwIFINCi9XaWR0aHMNClsgMDUwMCAwMzM1IDA1MjAgMDYzMCAwNjMwIDEwMDAgMDc2MCAwMzM1IDAzMzUgMDMzNSAwNjMwIDEwMDAgMDMzNSAwMzM1IDAzMzUgMDMzNSAwNjMwIDA2MzAgMDYzMCAwNjMwIDA2MzAgMDYzMCAwNjMwIDA2MzAgMDYzMCAwNjMwIDAzMzUgMDMzNSAxMDAwIDEwMDAgMTAwMCAwNTIwIDEwMDAgMDc0MCAwNjMwIDA3MDUgMDcyMCAwNTc1IDA1NTUgMDc0MCAwNzIwIDAyODAgMDU1NSAwNjY1IDA1MzUgMDkwNSAwNzIwIDA3NjAgMDU5NSAwNzgwDQogMDY1MCAwNjUwIDA2MzAgMDcyMCAwNzIwIDEwMDAgMDcyMCAwNjg1IDA2MTAgMDMzNSAwMzM1IDAzMzUgMDUwMCAwNTAwIDAzMzUgMDUzNSAwNTc1IDA1MzUgMDU3NSAwNTM1IDAzNzAgMDU3NSAwNTc1IDAyNDAgMDI0MCAwNTM1IDAyNDAgMDg3MCAwNTc1IDA1NzUgMDU3NSAwNTc1IDAzNTAgMDUwMCAwMzcwIDA1NzUgMDU1NSAwODcwIDA1NTUgMDU1NSAwNDgwIDA1MDAgMDUwMCAwNTAwIDEwMDBdDQovRmlyc3RDaGFyIDMyDQovTGFzdENoYXIgMTI2DQovRm9udERlc2NyaXB0b3IgMjIgMCBSDQo+Pg0KZW5kb2JqDQoyNCAwIG9iag0KPDwN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hODwACxar4VkG3kaHWLaLUII1v7Qvx5CHa/h1v1VH9yFCBE1oH5sRe6hf99DkY+FK3DCSMQEnGYV/9TEtr9aX12//XtfXCggS5K1qlKqCmlqbXm+968k/wfpnL5ZDQplbmRzdHJlYW0NCmVuZG9iag0KMjkgMCBvYmoNCjUwMDUNCmVuZG9iag0KMjggMCBvYmoNCg0KWy9GbGF0ZURlY29kZV0NCmVuZG9iag0KMzAgMCBvYmoNCjw8DQovTGVuZ3RoIDMxIDAgUg0KPj4NCnN0cmVhbQ0KIDAgZyBCVCA0NzQuNjAgODA4LjM1IFRkIDAgVHcgL0MwMDEgMTIuMDAgVGYgPDUwNjE3OTczNkM2OTcwPlRqIDAgVHIgRVQgMCBnIEJUIDQ2MC4yMCA3OTYuMzUgVGQgMCBUdyA8NDE3NTY3NzU3Mzc0MjAzMjMwMzEzMD5UaiAwIFRyIEVUIHEgMCAwIDAgcmcgNDAuMzAgMCAwIDM1LjMwIDgzIDc4NSBjbSAvMDAwMDkgRG8gUSAwIGcgQlQgMjI1Ljg1IDgwOC4zNSBUZCAwIFR3DQogPDUzNzQ2MTc0NjUyMDQyNjE2RTZCMjA2RjY2MjA0OTZFNjQ2OTYxPlRqIDAgVHIgRVQgMCBnIEJUIDI3Ni4yNSA3OTYuMzUgVGQgMCBUdyAvQzAwMiAxMi4wMCBUZiAwLjAwIFR3IDw0ODUyNEQ1Mz5UaiAwIFRyIEVUIHEgMCAwIDAgUkcgMC43NSB3IDQ2LjIwIDgyMC4zNSBtIDQ2LjIwIDc4NS4yMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyAxNTkuNjAgODIwLjM1IG0gMTU5LjYwIDc4NS4yMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdw0KIDQ1Ljg1IDgyMC4zNSBtIDE2MC4wMCA4MjAuMzUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDUuODUgNzg1LjIwIG0gMTYwLjAwIDc4NS4yMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyAxNTkuNjAgODIwLjM1IG0gMTU5LjYwIDc4NS4yMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0MjguOTAgODIwLjM1IG0gNDI4LjkwIDc4NS4yMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyAxNTkuMjUgODIwLjM1IG0gNDI5LjMwIDgyMC4zNSBsIFMgUSBxDQogMCAwIDAgUkcgMC43NSB3IDE1OS4yNSA3ODUuMjAgbSA0MjkuMzAgNzg1LjIwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDQyOC45MCA4MjAuMzUgbSA0MjguOTAgNzg1LjIwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDU3MC42NSA4MjAuMzUgbSA1NzAuNjUgNzg1LjIwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDQyOC41NSA4MjAuMzUgbSA1NzEuMDUgODIwLjM1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDQyOC41NSA3ODUuMjAgbQ0KIDU3MS4wNSA3ODUuMjAgbCBTIFEgMCBnIEJUIDUwOC41MCA3MzMuNTUgVGQgMCBUdyAvQzAwMyA4LjUwIFRmIDwyMDMwMzEyRTMwMzQyRTMyMzAzMTMwPlRqIEVUIDAgZyBCVCA0MjkuMTUgNzMzLjU1IFRkIDAgVHcgPDIwNDQ2MTc0NjUyMDZGNjYyMDRBNkY2OTZFNjk2RTY3PlRqIEVUIDAgZyBCVCA0MjkuMTUgNzQ3LjcwIFRkIDAgVHcgPDIwNDQ2MTc0NjUyMDZGNjYyMDQyNjk3Mjc0Njg+VGogRVQgMCBnIEJUIDUwOC41MCA3NDcuNzAgVGQNCiAwIFR3IDwyMDMwMzQyRTMxMzAyRTMxMzkzODM1PlRqIEVUIDAgZyBCVCAxMzguMDUgNjc5Ljk1IFRkIDAgVHcgPDIwNDUyRDRENjE2OTZDM0E2MTcyNkE3NTZFMkU3MjYxNzY2OTc0Njk0MDY3NkQ2MTY5NkMyRTYzNkY2RD5UaiBFVCAwIGcgQlQgNDUuMzUgNjc5Ljk1IFRkIDAgVHcgPDIwNEQ2RjYyNjk2QzY1M0EzOTM4MzczNjM1MzQzMzMyMzEzMT5UaiBFVCAwIGcgQlQgNDg4LjcwIDY3OS45NSBUZCAwIFR3DQogPDIwNDQ0MTNBMjAzMzM5MkUzNjMwMjAyNT5UaiBFVCAwIGcgQlQgNDg5LjI1IDY5NC4xMCBUZCAwIFR3IDwyMDU1NDM0QzIwM0EzMD5UaiBFVCAwIGcgQlQgNDA1LjY1IDY5NC4xMCBUZCAwIFR3IDwyMDUwNEMyMDNBMzI+VGogRVQgMCBnIEJUIDMyMS43NSA2OTQuMTAgVGQgMCBUdyA8MjA0MzRDMjAzQTMwPlRqIEVUIDAgZyBCVCAzMjEuNzUgNzA4LjI1IFRkIDAgVHcNCiA8MjA0QzY1NjE3NjY1MjA0MjYxNkM2MTZFNjM2NTIwNjE3MzIwNkY2RTIwMzAzMTJFMzAzMzJFMzIzMDMxMzg+VGogRVQgMCBnIEJUIDQ1LjM1IDY5NC4xMCBUZCAwIFR3IDwyMDUwNDE0RTIwNEU2RjJFPlRqIEVUIDAgZyBCVCAxMzguMDUgNjk0LjEwIFRkIDAgVHcgPDIwNDE0MTQxNTA0QjMxMzIzMzM0NEM+VGogRVQgMCBnIEJUIDQ1LjM1IDcwOC4yNSBUZCAwIFR3IDwyMDQyNzI2MTZFNjM2ODJGNEY2NjY2Njk2MzY1PlRqIEVUIDAgZyBCVA0KIDEzOC4wNSA3MDguMjUgVGQgMCBUdyA8MjA0MzQzMjA0RDc1NkQ2MjYxNjk+VGogRVQgMCBnIEJUIDQ1LjM1IDcyMi40MCBUZCAwIFR3IDwyMDQ0NjU3MDYxNzI3NDZENjU2RTc0MkU+VGogRVQgMCBnIEJUIDEzOC4wNSA3MjIuNDAgVGQgMCBUdyA8MjAyRTM1MzkyMDRGNzI2NzYxNkU2OTdBNjE3NDY5NkY2RTYxNkMyMDU1NkU2OTc0MjAzMT5UaiBFVCAwIGcgQlQgNDUuMzUgNzM2LjU1IFRkIDAgVHcNCiA8MjA1MDZGNzM2OTc0Njk2RjZFMkY0NDY1NzM2OTY3MkU+VGogRVQgMCBnIEJUIDEzOC4wNSA3MzYuNTUgVGQgMCBUdyA8MjAyRTM1MzkyMDUwNEY1MzQ5NTQ0OTRGNEUyMDM1PlRqIEVUIDAgZyBCVCA0MjkuMTUgNzY0Ljg1IFRkIDAgVHcgPDIwNTA0NjIwNDk2RTY0NjU3ODIwNEU2Rj5UaiBFVCAwIGcgQlQgNTA4LjUwIDc2NC44NSBUZCAwIFR3IDwyMDMwMzAzNTMxMzUzMDMwMzc+VGogRVQgMCBnIEJUIDQ1LjM1IDc1MC43MCBUZCAwIFR3DQogPDIwNEU2MTZENjU+VGogRVQgMCBnIEJUIDEzOC4wNSA3NTAuNzAgVGQgMCBUdyA8MjA0RDcyMkUyMDIwNzM2MTY0Njg3NTIwMjA3NDY1NzM3NDM1PlRqIEVUIDAgZyBCVCA0NS4zNSA3NjQuODUgVGQgMCBUdyA8MjA1MDQ1NTI0RTUyMkY0NTZENzAyRTRFNkYyRT5UaiBFVCAwIGcgQlQgMTM4LjA1IDc2NC44NSBUZCAwIFR3IDwyMDMwMzAzNTMxMzUzMDMwMzU+VGogRVQgcSAwIDAgMCBSRyAwLjc1IHcgNDUuMzUgNzczLjg1IG0NCiA0NS4zNSA3NTkuNzAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMTM4LjA1IDc3My44NSBtIDEzOC4wNSA3NTkuNzAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDUuMDAgNzczLjg1IG0gMTM4LjQ1IDc3My44NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4wMCA3NTkuNzAgbSAxMzguNDUgNzU5LjcwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDEzOC4wNSA3NzMuODUgbSAxMzguMDUgNzU5LjcwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3DQogNDI5LjE1IDc3My44NSBtIDQyOS4xNSA3NTkuNzAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMTM3LjcwIDc3My44NSBtIDQyOS41NSA3NzMuODUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMTM3LjcwIDc1OS43MCBtIDQyOS41NSA3NTkuNzAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDI5LjE1IDc3My44NSBtIDQyOS4xNSA3NTkuNzAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNTA4LjUwIDc3My44NSBtIDUwOC41MCA3NTkuNzAgbCBTIFEgcQ0KIDAgMCAwIFJHIDAuNzUgdyA0MjguODAgNzczLjg1IG0gNTA4LjkwIDc3My44NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0MjguODAgNzU5LjcwIG0gNTA4LjkwIDc1OS43MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1MDguNTAgNzczLjg1IG0gNTA4LjUwIDc1OS43MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1NzAuMDAgNzczLjg1IG0gNTcwLjAwIDc1OS43MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1MDguMTUgNzczLjg1IG0NCiA1NzAuNDAgNzczLjg1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDUwOC4xNSA3NTkuNzAgbSA1NzAuNDAgNzU5LjcwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDQ1LjM1IDc1OS43MCBtIDQ1LjM1IDc0NS41NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyAxMzguMDUgNzU5LjcwIG0gMTM4LjA1IDc0NS41NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4wMCA3NDUuNTUgbSAxMzguNDUgNzQ1LjU1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3DQogMTM4LjA1IDc1OS43MCBtIDEzOC4wNSA3NDUuNTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDI5LjE1IDc1OS43MCBtIDQyOS4xNSA3NDUuNTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMTM3LjcwIDc0NS41NSBtIDQyOS41NSA3NDUuNTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDI5LjE1IDc1OS43MCBtIDQyOS4xNSA3NDUuNTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNTA4LjUwIDc1OS43MCBtIDUwOC41MCA3NDUuNTUgbCBTIFEgcQ0KIDAgMCAwIFJHIDAuNzUgdyA0MjguODAgNzQ1LjU1IG0gNTA4LjkwIDc0NS41NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1MDguNTAgNzU5LjcwIG0gNTA4LjUwIDc0NS41NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1NzAuMDAgNzU5LjcwIG0gNTcwLjAwIDc0NS41NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1MDguMTUgNzQ1LjU1IG0gNTcwLjQwIDc0NS41NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4zNSA3NDUuNTUgbQ0KIDQ1LjM1IDczMS40MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyAxMzguMDUgNzQ1LjU1IG0gMTM4LjA1IDczMS40MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4wMCA3MzEuNDAgbSAxMzguNDUgNzMxLjQwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDEzOC4wNSA3NDUuNTUgbSAxMzguMDUgNzMxLjQwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDQyOS4xNSA3NDUuNTUgbSA0MjkuMTUgNzMxLjQwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3DQogMTM3LjcwIDczMS40MCBtIDQyOS41NSA3MzEuNDAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDI5LjE1IDc0NS41NSBtIDQyOS4xNSA3MzEuNDAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNTA4LjUwIDc0NS41NSBtIDUwOC41MCA3MzEuNDAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDI4LjgwIDczMS40MCBtIDUwOC45MCA3MzEuNDAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNTA4LjUwIDc0NS41NSBtIDUwOC41MCA3MzEuNDAgbCBTIFEgcQ0KIDAgMCAwIFJHIDAuNzUgdyA1NzAuMDAgNzQ1LjU1IG0gNTcwLjAwIDczMS40MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1MDguMTUgNzMxLjQwIG0gNTcwLjQwIDczMS40MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4zNSA3MzEuNDAgbSA0NS4zNSA3MTcuMjUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMTM4LjA1IDczMS40MCBtIDEzOC4wNSA3MTcuMjUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDUuMDAgNzE3LjI1IG0NCiAxMzguNDUgNzE3LjI1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDEzOC4wNSA3MzEuNDAgbSAxMzguMDUgNzE3LjI1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDU3MC4wNSA3MzEuNDAgbSA1NzAuMDUgNzE3LjI1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDEzNy43MCA3MTcuMjUgbSA1NzAuNDUgNzE3LjI1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDQ1LjM1IDcxNy4yNSBtIDQ1LjM1IDcwMy4xMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdw0KIDEzOC4wNSA3MTcuMjUgbSAxMzguMDUgNzAzLjEwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDQ1LjAwIDcwMy4xMCBtIDEzOC40NSA3MDMuMTAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMTM4LjA1IDcxNy4yNSBtIDEzOC4wNSA3MDMuMTAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMzIxLjc1IDcxNy4yNSBtIDMyMS43NSA3MDMuMTAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMTM3LjcwIDcwMy4xMCBtIDMyMi4xNSA3MDMuMTAgbCBTIFEgcQ0KIDAgMCAwIFJHIDAuNzUgdyAzMjEuNzUgNzE3LjI1IG0gMzIxLjc1IDcwMy4xMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1NzAuMDUgNzE3LjI1IG0gNTcwLjA1IDcwMy4xMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyAzMjEuNDAgNzAzLjEwIG0gNTcwLjQ1IDcwMy4xMCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4zNSA3MDMuMTAgbSA0NS4zNSA2ODguOTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMTM4LjA1IDcwMy4xMCBtDQogMTM4LjA1IDY4OC45NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4wMCA2ODguOTUgbSAxMzguNDUgNjg4Ljk1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDEzOC4wNSA3MDMuMTAgbSAxMzguMDUgNjg4Ljk1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDMyMS43NSA3MDMuMTAgbSAzMjEuNzUgNjg4Ljk1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDEzNy43MCA2ODguOTUgbSAzMjIuMTUgNjg4Ljk1IGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3DQogMzIxLjc1IDcwMy4xMCBtIDMyMS43NSA2ODguOTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDA1LjY1IDcwMy4xMCBtIDQwNS42NSA2ODguOTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgMzIxLjQwIDY4OC45NSBtIDQwNi4wNSA2ODguOTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDA1LjY1IDcwMy4xMCBtIDQwNS42NSA2ODguOTUgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDg5LjI1IDcwMy4xMCBtIDQ4OS4yNSA2ODguOTUgbCBTIFEgcQ0KIDAgMCAwIFJHIDAuNzUgdyA0MDUuMzAgNjg4Ljk1IG0gNDg5LjY1IDY4OC45NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0ODkuMjUgNzAzLjEwIG0gNDg5LjI1IDY4OC45NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA1NzAuMDUgNzAzLjEwIG0gNTcwLjA1IDY4OC45NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0ODguOTAgNjg4Ljk1IG0gNTcwLjQ1IDY4OC45NSBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4zNSA2ODguOTUgbQ0KIDQ1LjM1IDY3NS45MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyAxMzguMDUgNjg4Ljk1IG0gMTM4LjA1IDY3NS45MCBsIFMgUSBxIDAgMCAwIFJHIDAuNzUgdyA0NS4wMCA2NzUuOTAgbSAxMzguNDUgNjc1LjkwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDEzOC4wNSA2ODguOTUgbSAxMzguMDUgNjc1LjkwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3IDEzNy43MCA2NzUuOTAgbSA0ODEuMTAgNjc1LjkwIGwgUyBRIHEgMCAwIDAgUkcgMC43NSB3DQogNDg4LjcwIDY4OC45NSBtIDQ4OC43MCA2NzUuOTAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDgxLjA1IDY3NS45MCBtIDQ4OS4xMCA2NzUuOTAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDg4LjcwIDY4OC45NSBtIDQ4OC43MCA2NzUuOTAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNTcwLjA1IDY4OC45NSBtIDU3MC4wNSA2NzUuOTAgbCBTIFEgcSAwIDAgMCBSRyAwLjc1IHcgNDg4LjM1IDY3NS45MCBtIDU3MC40NSA2NzUuOTAgbCBTIFENCiAwIGcgQlQgNDQuODAgNjYwLjg1IFRkIDAgVHcgL0MwMDEgMTAuMDAgVGYgPDIwNDU2MTcyNkU2OTZFNjc3Mz5UaiAwIFRyIEVUIHEgMCAwIDAgcmcgMTguMzUgMCAwIDIwLjUwIDI0MSA2NDkgY20gLzAwMDE2IERvIFEgMCBnIEJUIDMwMC40NSA2NjAuODUgVGQgMCBUdyA8MjA0NDY1NjQ3NTYzNzQ2OTZGNkU3MzIwMjg0MzcyMkUyMDc0NkYyMDQxMkY2MzIwNEU2RjJFMjk+VGogMCBUciBFVCBxIDAgMCAwIHJnDQogMTguMzUgMCAwIDIwLjUwIDUxOSA2NDkgY20gLzAwMDE5IERvIFEgMCBnIEJUIDQ0LjgwIDY0MC4zMCBUZCAwIFR3IC9DMDAzIDguNTAgVGYgPDIwNDI2MTczNjk2MzIwNTA2MTc5PlRqIEVUIDAgZyBCVCAxOTkuNTUgNjQwLjMwIFRkIDAgVHcgPDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAzMTM5MkMzNDMwMzAyRTMwMzAyMD5UaiBFVCAwIGcgQlQgMzA3LjY1IDY0MC4zMCBUZCAwIFR3DQogPDQ1NjUyMDUwNDYyMDYzNkY2RTc0NzI2OTYyNzU3NDY5NkY2RT5UaiBFVCAwIGcgQlQgNTIxLjgwIDY0MC4zMCBUZCAwIFR3IDwzMTJDMzkzNDMwMkUzMDMwPlRqIEVUIDAgZyBCVCA0NC44MCA2MjkuMTUgVGQgMCBUdyA8MjA0NDY1NjE3MjZFNjU3MzczMjA0MTZDNkM2Rjc3NjE2RTYzNjU+VGogRVQgMCBnIEJUIDE5OS41NSA2MjkuMTUgVGQgMCBUdyA8MjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMzcyQzM5MzEzNTJFMzIzMDIwPlRqIEVUIDAgZw0KIEJUIDMwNy42NSA2MjkuMTUgVGQgMCBUdyA8NTA3MjZGNjYyMDU0NjE3ODIwMkQyMDczNzA2QzY5NzQyMDcwNjU3MjY5NkY2ND5UaiBFVCAwIGcgQlQgNTMwLjQwIDYyOS4xNSBUZCAwIFR3IDwzMjMwMzAyRTMwMzA+VGogRVQgMCBnIEJUIDQ0LjgwIDYxOC4wMCBUZCAwIFR3IDwyMDQ4NkY3NTczNjUyMDUyNjU2RTc0MjA0MTZDNkM2Rjc3NjE2RTYzNjU+VGogRVQgMCBnIEJUIDE5OS41NSA2MTguMDAgVGQgMCBUdw0KIDwyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAzMTJDMzYzNDM5MkUzMDMwMjA+VGogRVQgMCBnIEJUIDMwNy42NSA2MTguMDAgVGQgMCBUdyA8NDkyRTU0NjE3ODIwNjQ2NTY0MkUyMDY0NzU3MjY5NkU2NzIwNkQ2RjZFNzQ2OD5UaiBFVCAwIGcgQlQgNTIxLjgwIDYxOC4wMCBUZCAwIFR3IDwzMjJDMzIzMzM1MkUzMDMwPlRqIEVUIDAgZyBCVCA0NC44MCA2MDYuODUgVGQgMCBUdw0KIDwyMDQzNjk3NDc5MjA0MzZGNkQ3MDY1NkU3MzYxNzQ2RjcyNzkyMDQxNkM2Qzc3NkU2Mz5UaiBFVCAwIGcgQlQgMTk5LjU1IDYwNi44NSBUZCAwIFR3IDwyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMjAyMDIwMzUzNDMwMkUzMDMwMjA+VGogRVQgMCBnIEJUIDMwNy42NSA2MDYuODUgVGQgMCBUdyA8NTA3NDYxNzgyMDY0NjU2NDc1NjM3NDY5NkY2RTIwNjM2MTcyNzI3OTIwNjY3NzY0PlRqIEVUIDAgZyBCVCA1MzAuNDAgNjA2Ljg1IFRkIDAgVHcNCiA8MzgzMDMwMkUzMDMwPlRqIEVUIDAgZyBCVCA0NC44MCA1OTUuNzAgVGQgMCBUdyA8MjA0MTcyNzI2NTYxNzI3MzIwNkY2NjIwNjU2MTcyNkU2OTZFNjc3Mz5UaiBFVCAwIGcgQlQgMTk5LjU1IDU5NS43MCBUZCAwIFR3IDwyMDIwMjAyMDIwMjAyMDIwMjAyMDMxMzEzOTJDMzMzODMxMkUzNzM1MjA+VGogRVQgMCBnIEJUIDMwNy42NSA1OTUuNzAgVGQgMCBUdyA8NDg2Rjc1NzM2NTIwNTI2NTZFNzQyMDUyNjU2MzZGNzY2NTcyNzk+VGogRVQgMCBnDQogQlQgNTMwLjQwIDU5NS43MCBUZCAwIFR3IDwzMzMxMzQyRTMwMzA+VGogRVQgMCBnIEJUIDQ0LjgwIDU4NC41NSBUZCAwIFR3IDwyMD5UaiBFVCAwIGcgQlQgMzA3LjY1IDU4NC41NSBUZCAwIFR3IDw0Njc1NzI2RTY5NzQ3NTcyNjUyMDUyNjU2MzZGNzY2NTcyNzk+VGogRVQgMCBnIEJUIDUzMC40MCA1ODQuNTUgVGQgMCBUdyA8MzIzNTM2MkUzMDM2PlRqIEVUIDAgZyBCVCA0NC44MCA1NzMuNDAgVGQgMCBUdyA8MjA+VGogRVQgMCBnIEJUDQogMzA3LjY1IDU3My40MCBUZCAwIFR3IDw0MjQ2MjA0NTY1Mjc3MzIwNTA0NjIwNDE3MjcyNjU2MTcyNzM+VGogRVQgMCBnIEJUIDUyMS44MCA1NzMuNDAgVGQgMCBUdyA8MzMyQzM4MzgzMDJFMzAzMD5UaiBFVCAwIGcgQlQgNDQuODAgNTYyLjI1IFRkIDAgVHcgPDIwPlRqIEVUIDAgZyBCVCA0NC44MCA1NTEuMTAgVGQgMCBUdyA8MjA+VGogRVQgMCBnIEJUIDQ0LjgwIDUzOS45NSBUZCAwIFR3IDwyMD5UaiBFVCAwIGcgQlQNCiA0NC44MCA1MjguODAgVGQgMCBUdyA8MjA+VGogRVQgMCBnIEJUIDQ0LjgwIDUxNy42NSBUZCAwIFR3IDwyMD5UaiBFVCAwIGcgQlQgNDQuODAgNTA2LjUwIFRkIDAgVHcgPDIwPlRqIEVUIDAgZyBCVCA0NC44MCA0OTUuMzUgVGQgMCBUdyA8MjA+VGogRVQgMCBnIEJUIDQ0LjgwIDQ4NC4yMCBUZCAwIFR3IDwyMD5UaiBFVCAwIGcgQlQgNDQuODAgNDczLjA1IFRkIDAgVHcgPDIwPlRqIEVUIDAgZyBCVCA0NC44MCA0NjEuOTAgVGQgMCBUdw0KIDwyMD5UaiBFVCAwIGcgQlQgNDQuODAgNDUwLjc1IFRkIDAgVHcgPDIwPlRqIEVUIDAgZyBCVCA0NC44MCA0MzkuNjAgVGQgMCBUdyA8MjA+VGogRVQgMCBnIEJUIDQ0LjgwIDQyOC40NSBUZCAwIFR3IDwyMD5UaiBFVCAwIGcgQlQgNDQuODAgNDE3LjMwIFRkIDAgVHcgPDIwPlRqIEVUIDAgZyBCVCA0NC44MCA0MDYuMTUgVGQgMCBUdyA8MjA+VGogRVQgMCBnIEJUIDQ0LjgwIDM5NS4wMCBUZCAwIFR3IDwyMD5UaiBFVCAwIGcgQlQNCiA0NC44MCAzODMuODUgVGQgMCBUdyAvQzAwMSAxMC4wMCBUZiA8MjA1NDZGNzQ2MTZDPlRqIDAgVHIgRVQgMCBnIEJUIDE5OS41NSAzODMuODUgVGQgMCBUdyAvQzAwMyA4LjUwIFRmIDwyMDIwMjAyMDIwMjAyMDIwMjAyMDMxMzQzODJDMzgzODM1MkUzOTM1MjA+VGogRVQgMCBnIEJUIDMwMC40NSAzODMuODUgVGQgMCBUdyAvQzAwMSAxMC4wMCBUZiA8MjA1NDZGNzQ2MTZDPlRqIDAgVHIgRVQgMCBnIEJUIDUyMS44MCAzODMuODUgVGQgMCBUdw0KIC9DMDAzIDguNTAgVGYgPDM5MkMzNjMyMzUyRTMwMzY+VGogRVQgMCBnIEJUIDQ0LjgwIDM3Mi4zNSBUZCAwIFR3IDwyMDUwNjE3OTY1NjUyMDQyNzI2MTZFNjM2ODIwM0EyMDIwMjA0RDU1NEQ0MjQxNDkyMDRENDE0OTRFMjA+VGogPDQyNTI0MTRFNDM0ODJFPlRqIEVUIDAgZyBCVCAzMDAuNTAgMzcyLjM1IFRkIDAgVHcgL0MwMDEgMTAuMDAgVGYNCiA8MjA1NDYxNkI2NTIwNDg2RjZENjUyMDUwNjE3OTI4MzUzMTM1MzAzMDM1MzUzMTM1MzAzMDM1Mjk+VGogMCBUciBFVCAwIGcgQlQgNTEzLjI1IDM3Mi4zNSBUZCAwIFR3IC9DMDAzIDguNTAgVGYgPDMxMzMzOTJD"

			// This is to convert the binary format of the data to readable format
			var bin = atob(data);

			// This is to save the data as PDF 
			sap.ui.core.util.File.save(bin, "filename", "pdf", "application/pdf");
		},
		onPDFPress3: function (oEvent) {
			var columns = [

				{
					title: "CustomerID",
					key: "CustomerID"
				},

				{
					title: "CompanyName",
					key: "CompanyName"
				}

			];
			var data = [{
				CustomerID: "1",
				CompanyName: "Jojo"
			}]

			var doc = new jsPDF('p', 'pt', 'a2');

			doc.autoTable(columns, data, {});

			doc.save('table.pdf');
		},
		onPDFPress4: function (oEvent) {
			var data = "<html><body><div>Sagar</div><div>Rakshi</div></body></html>";
			let pdf = new jsPDF('p', 'pt', 'a4');
			pdf.html(data, {
				callback: function (doc) {
					doc.save("test.pdf");
				}
			});
		},
		onPDFPress5: function (oEvent) {
			var sRootPath = jQuery.sap.getModulePath("BasicControls.BasicControls") + "/icon/usericon.png";
			var contents = "<div>Sagar</div>";
			contents = contents + "<img src='"+sRootPath+"' alt='Girl in a jacket' width='500' height='600'>";
			contents = contents + "<table><tr><th>Name</th><th>Class</th></tr></table>";
			var frame1 = document.createElement('iframe');
			frame1.name = "frame1";
			frame1.style.position = "absolute";
			frame1.style.top = "-1000000px";
			document.body.appendChild(frame1);
			var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document :
				frame1.contentDocument;
			frameDoc.document.open();
			frameDoc.document.write('<html><head><title>DIV Contents</title>');
			frameDoc.document.write('</head><body>');
			frameDoc.document.write(contents);
			frameDoc.document.write('</body></html>');
			frameDoc.document.close();
			setTimeout(function () {
				window.frames["frame1"].focus();
				window.frames["frame1"].print();
				document.body.removeChild(frame1);
			}, 100);
			return false;
		},
		onDragAvaliableProductStart: function (oEvent) {
			var dragRow = oEvent.getParameter("target");
			var dragSession = oEvent.getParameter("dragSession");
			dragSession.setComplexData("draggedRowContext", dragRow.getBindingContext());
		},
		onDragSelectedProductStart: function (oEvent) {
			var dragRow = oEvent.getParameter("target");
			var dragSession = oEvent.getParameter("dragSession");
			dragSession.setComplexData("draggedRowContext", dragRow.getBindingContext());
		},
		onDropAvailableProductsTable: function (oEvent) {
			var oDraggedItem = oEvent.getParameter("draggedControl");
			var dropTable = oEvent.getParameter("droppedControl");
			var dragTable = oDraggedItem.getParent()
				// var dropTable = oDroppedItem.getParent()
			var dragSession = oEvent.getParameter("dragSession");
			var draggedRowContext = dragSession.getComplexData("draggedRowContext");

			var oDraggedItemContext = oDraggedItem.getBindingContext();
			if (!oDraggedItemContext) {
				return;
			}
			var i = oDraggedItem.getBindingContextPath().split("/").slice(-1)[0]
			var data = oDraggedItem.getBindingContext().getObject()
			dragTable.getModel().getData().seproduct.splice(i, 1)
			dropTable.getModel().getData().avproduct.push(data)
			dragTable.getModel().refresh(true)
			dropTable.getModel().refresh(true)
		},
		onDropSelectedProductsTable: function (oEvent) {
			var oDraggedItem = oEvent.getParameter("draggedControl");
			var dropTable = oEvent.getParameter("droppedControl");
			var dragTable = oDraggedItem.getParent()
				// var dropTable = oDroppedItem.getParent()
			var dragSession = oEvent.getParameter("dragSession");
			var draggedRowContext = dragSession.getComplexData("draggedRowContext");

			var oDraggedItemContext = oDraggedItem.getBindingContext();
			if (!oDraggedItemContext) {
				return;
			}
			// if (oDroppedItem instanceof sap.m.ColumnListItem) {

			// }
			var i = oDraggedItem.getBindingContextPath().split("/").slice(-1)[0]
			var data = oDraggedItem.getBindingContext().getObject()
			dragTable.getModel().getData().avproduct.splice(i, 1)
			dropTable.getModel().getData().seproduct.push(data)
			dragTable.getModel().refresh(true)
			dropTable.getModel().refresh(true)
		},

		onDragStart: function (oEvent) {
			var dragRow = oEvent.getParameter("target");
			var dragSession = oEvent.getParameter("dragSession");
			dragSession.setComplexData("draggedRowContext", dragRow.getBindingContext());
		},
		onDropTable: function (oEvent) {
			var dragSession = oEvent.getParameter("dragSession");
			var draggedRowContext = dragSession.getComplexData("draggedRowContext");
			var dragTab = parseInt(oEvent.getSource().getId().split("-")[4]);
			if (!draggedRowContext) {
				return;
			}
			var dragTab = parseInt(draggedRowContext.getPath().split("/")[3]);
			var dragLine = parseInt(draggedRowContext.getPath().split("/")[5]);
			var droppedRow = oEvent.getParameter("droppedControl");
			if (droppedRow && droppedRow instanceof sap.m.ColumnListItem) {
				var dropPosition = oEvent.getParameter("dropPosition");
				var droppedRowContext = droppedRow.getBindingContext();
				var droppedTab = parseInt(droppedRowContext.getPath().split("/")[3]);
				var droppedLine = parseInt(droppedRowContext.getPath().split("/")[5]);
				var oTabModel = droppedRow.getParent().getModel();
				var oTabResult = oTabModel.getData().tableData.tables

				if (dragTab === droppedTab) {

					var newRowContext = oTabResult[dragTab].items[dragLine];
					oTabResult[droppedTab].items.splice(droppedLine, 0, newRowContext)
					oTabResult[dragTab].items.splice(dragLine, 1)
				}
				if (dragTab !== droppedTab) {
					if (oEvent.getParameter("dropPosition") == "After")
						var iNewRowIndex = droppedLine + 1;
					else
						var iNewRowIndex = droppedLine;
					var newRowContext = oTabResult[dragTab].items[dragLine];
					oTabResult[droppedTab].items.splice(iNewRowIndex, 0, newRowContext)
					oTabResult[dragTab].items.splice(dragLine, 1)

				}
			} else {
				var oTabResult = oEvent.getParameter("droppedControl").getModel().getData().tableData.tables;
				var droppedTab = oEvent.getParameter("droppedControl").getId().split("-")[4];
				var newRowContext = oTabResult[dragTab].items[dragLine];
				oTabResult[droppedTab].items.push(newRowContext);
				oTabResult[dragTab].items.splice(dragLine, 1)
			}
			oEvent.getParameter("droppedControl").getParent().getModel().refresh(true)

			// var oDraggedItem = oEvent.getParameter("draggedControl");
			// var dropTable = oEvent.getParameter("droppedControl");
			// var dragSession = oEvent.getParameter("dragSession");
			// var draggedRowContext = dragSession.getComplexData("draggedRowContext");

			// var dragTable = oDraggedItem.getParent()
			// 	// var dropTable = oDroppedItem.getParent()
			// var dragTblIndex = dragTable.getBindingContext().getPath().split("/")[3]
			// var dropTblIndex = dropTable.getBindingContext().getPath().split("/")[3]

			// var oDraggedItemContext = oDraggedItem.getBindingContext();
			// if (!oDraggedItemContext) {
			// 	return;
			// }
			// // if (oDroppedItem instanceof sap.m.ColumnListItem) {

			// // }
			// var data = oDraggedItem.getBindingContext().getObject()
			// var i = oDraggedItem.getBindingContextPath().split("/").slice(-1)[0]
			// dragTable.getModel().getData().tableData.tables[dragTblIndex].items.splice(i, 1)
			// // dragTable.getModel().getData().avproduct.splice(i, 1)
			// dropTable.getModel().getData().tableData.tables[dropTblIndex].items.push(data)
			// dragTable.getModel().refresh(true)
			// dropTable.getModel().refresh(true)
		},
		myFactory: function (sId, oContext) {
			var Value = oContext.getProperty("Amount");
			var element;
			if (Value > 0) {
				element = new sap.m.Text({
					text: "{demoModel>Amount}"
				});
			} else {
				element = new sap.m.Input({
					value: "{demoModel>Amount}"
				});
			}

			return new sap.m.ColumnListItem({
				cells: [new sap.m.Text({
						text: "{demoModel>Name}"
					}),
					new sap.m.Text({
						text: "{demoModel>City}"
					}),
					element
				]
			});
		},
		onXLSXDownload: function (oEvent) {

			var data = [{
				"name": "John",
				"city": "Seattle"
			}, {
				"name": "Mike",
				"city": "Los Angeles"
			}, {
				"name": "Zach",
				"city": "New York"
			}]
			var ws = XLSX.utils.json_to_sheet(data);

			/* Create a new empty workbook, then add the worksheet */
			var wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "People");

			/* Generate xlsx files */
			XLSX.writeFile(wb, "sheetjs.xlsx");
		},
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

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf BasicControls.BasicControls.view.SecondView
		 */
		onExit: function () {
			debugger;
			console.log("Exit");
		},

		odataV2BatchOperation: function () {
			//the content of this method is only for knowledge purpose, there in no table in XML and not "this.getView().getModel()"
			debugger;

			var oModel = this.getView().getModel(),
				oTable = this._oTable, // Your Table that you will get item's data.
				iLength = oTable.getItems("items").length,
				oItem,
				sPath,
				bError = false;

			// Distinguish your request from other batch requests like below.

			oModel.setDeferredBatchGroups(["myId"]);

			for (var i = 0; i < iLength; i++) {

				var oEntry = {},
					oParams = {};

				// You need to show your message that returns from backend the latest.

				if (i === (iLength - 1)) {

					oParams.success = function (oData, oResponse) {
						sap.ui.core.BusyIndicator.hide();
						MessageToast.show(this._oResourceBundle.getText("PROCESS_SUCCESS"));
						// debugger;

					}.bind(this);

					oParams.error = function (oError) {
						// debugger;
						sap.ui.core.BusyIndicator.hide();
						var oJson = JSON.parse(oError.responseText);
						this._bIsError = true;
						var oJson = JSON.parse(oError.responseText);
						var oMsgBox = sap.ca.ui.message.showMessageBox({
							type: sap.ca.ui.message.Type.ERROR,
							message: oJson.error.message.value
						});

						if (!sap.ui.Device.support.touch) {
							oMsgBox.addStyleClass("sapUiSizeCompact");
						}

						oModel.refresh();

					}.bind(this);

				}

				oParams.async = false;
				oParams.batchGroupId = "myId";

				oItem = oTable.getItems("items")[i];
				sPath = oItem.getBindingContextPath();

				// needing to bind yourSpecific Json Model to Table's item aggregation.
				// in this scenario, 
				oEntry = this._getViewModel().getProperty(oItem.getBindingContextPath());

				sap.ui.core.BusyIndicator.show(0);
				oModel.create("/YourEntitySet", oEntry, oParams);
			}

			if (bError === true) {
				return;
			}

			oModel.submitChanges({
				groupId: "myId"
			});
		},
		onAfterRendering: function () {
			this._resizeTableRow();
		},
		_resizeTableRow: function () {

			var oTable = this.getView().byId("idResultsTable");
			var sTop = $('#' + oTable.getId()).offset().top;

			var sHeight = $(document).height();

			//if there a row, you can take the row Height
			//var iRowHeight = $(oTable.getAggregation("rows")[0].getDomRef()).height();

			var iRowHeight = 40;

			var iRows = Math.trunc((sHeight - sTop) / iRowHeight);

			oTable.setVisibleRowCount(iRows);
		},

	});

});