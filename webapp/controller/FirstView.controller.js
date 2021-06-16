sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/EventBus",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/m/GroupHeaderListItem",
	"BasicControls/BasicControls/js/demo"
], function (Controller, EventBus, Fragment, MessageToast,GroupHeaderListItem) {
	"use strict";

	return Controller.extend("BasicControls.BasicControls.controller.FirstView", {
		onInit: function () {

			// var studModel=new sap.ui.model.json.JSONModel();
			// studModel.loadData("model/data.json");
			// sap.ui.getCore().setModel(studModel);

			//Menu
			debugger;

			this.getView().byId("idDateRange").setDateValue(new Date());
			this.getView().byId("idDateRange").setSecondDateValue(new Date());

			this.getView().byId("openMenu").attachBrowserEvent("tab keyup", function (oEvent) {
				this._bKeyboard = oEvent.type == "keyup";
			}, this);

			var data = {
				"ProductCollection": [{
					"ProductId": "1",
					"Name": "Sagar"
				}, {
					"ProductId": "2",
					"Name": "Sunil"
				}, {
					"ProductId": "2",
					"Name": "Shiva"
				}, {
					"ProductId": "2",
					"Name": "Rakshi"
				}]
			};
			var oModel = new sap.ui.model.json.JSONModel(data);
			this.getOwnerComponent().setModel(oModel, "model");

			//Menu

			//EventBus
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("_onButtonPress", this._onButtonPress, this);
			//EventBus

			//ProcessFlowData
			var processData = {
				"nodes": [{
					"id": "1",
					"lane": "0",
					"title": "Sales Order 1",
					"titleAbbreviation": "SO 1",
					"children": [10, 11],
					"state": "Positive",
					"stateText": "OK status",
					"focused": true,
					"highlighted": false,
					"texts": ["Sales Order Document Overdue long text for the wrap up all the aspects", "Not cleared"]
				}, {
					"id": "10",
					"lane": "1",
					"title": "Outbound Delivery 40",
					"titleAbbreviation": "OD 40",
					"children": [20, 21],
					"state": "Negative",
					"stateText": "NOT OK",
					"focused": false,
					"highlighted": false,
					"texts": ["text 1", "text 2"]
				}, {
					"id": "11",
					"lane": "1",
					"title": "Outbound Delivery 43",
					"titleAbbreviation": "OD 43",
					"children": [20],
					"state": "Neutral",
					"stateText": null,
					"focused": false,
					"highlighted": false,
					"texts": ["text 1", "text 2"]
				}, {
					"id": "12",
					"lane": "1",
					"title": "Outbound Delivery 45",
					"titleAbbreviation": "OD 45",
					"children": [20],
					"state": "Neutral",
					"stateText": null,
					"focused": false,
					"highlighted": false,
					"texts": null
				}, {
					"id": "20",
					"lane": "2",
					"title": "Invoice 9",
					"titleAbbreviation": "I 9",
					"children": [30, 31],
					"state": "Positive",
					"stateText": "OK status",
					"focused": false,
					"highlighted": false,
					"texts": null
				}, {
					"id": "21",
					"lane": "2",
					"title": "Invoice Planned",
					"titleAbbreviation": "IP",
					"children": null,
					"state": "PlannedNegative",
					"stateText": null,
					"focused": false,
					"highlighted": false,
					"texts": null
				}, {
					"id": "30",
					"lane": "3",
					"title": "Accounting Document 5",
					"titleAbbreviation": "AD 5",
					"children": [51],
					"state": "Critical",
					"stateText": "AD Issue",
					"focused": false,
					"highlighted": false,
					"texts": null
				}, {
					"id": "31",
					"lane": "3",
					"title": "Accounting Document 7",
					"titleAbbreviation": "AD 7",
					"children": [41],
					"state": "Positive",
					"stateText": "OK status",
					"focused": false,
					"highlighted": false,
					"texts": null
				}, {
					"id": "41",
					"lane": "4",
					"title": "Payment Document 75",
					"titleAbbreviation": "PD 75",
					"children": [51],
					"state": "Positive",
					"stateText": "OK status",
					"focused": false,
					"highlighted": false,
					"texts": null
				}, {
					"id": "51",
					"lane": "5",
					"title": "Acceptance Letter 14",
					"titleAbbreviation": "AL 14",
					"children": [61],
					"state": "Positive",
					"stateText": "OK status",
					"focused": false,
					"highlighted": false,
					"texts": null
				}, {
					"id": "61",
					"lane": "6",
					"title": "Credit Voucher 67",
					"titleAbbreviation": "CV 67",
					"children": [71],
					"state": "Positive",
					"stateText": "OK status",
					"focused": false,
					"highlighted": false,
					"texts": null
				}, {
					"id": "71",
					"lane": "6",
					"title": "Credit Return 77",
					"titleAbbreviation": "CR 77",
					"children": null,
					"state": "Planned",
					"stateText": "Planned status text",
					"focused": false,
					"highlighted": false,
					"texts": null
				}],
				"lanes": [{
					"id": "0",
					"icon": "sap-icon://order-status",
					"label": "Order Processing",
					"position": 0
				}, {
					"id": "1",
					"icon": "sap-icon://monitor-payments",
					"label": "Delivery Processing",
					"position": 1
				}, {
					"id": "2",
					"icon": "sap-icon://payment-approval",
					"label": "Invoicing",
					"position": 2
				}, {
					"id": "3",
					"icon": "sap-icon://money-bills",
					"label": "Accounting",
					"position": 3
				}, {
					"id": "4",
					"icon": "sap-icon://payment-approval",
					"label": "Payment Processing",
					"position": 4
				}, {
					"id": "5",
					"icon": "sap-icon://nurse",
					"label": "Receipt Processing",
					"position": 5
				}, {
					"id": "6",
					"icon": "sap-icon://retail-store",
					"label": "Return Processing",
					"position": 6
				}]
			}
			var processModel = new sap.ui.model.json.JSONModel(processData)
			this.getView().byId("processflow1").setModel(processModel)
				//ProcessFlowData
				
				
				//Grouping list
				var productList = [{
					Name:"TV",
					Type:"EL"
				},{
					Name:"Radio",
					Type:"EL"
				},{
					Name:"AC",
					Type:"EL"
				},{
					Name:"Rice",
					Type:"PA"
				},{
					Name:"Wheat",
					Type:"PA"
				},{
					Name:"Bajra",
					Type:"PA"
				}];
				var productListModel = new sap.ui.model.json.JSONModel(productList)
			this.getView().byId("ShortProductList").setModel(productListModel)
				//Grouping list
		},
		onButtonPress: function (oEvent) {
			debugger;
			var oData = {
				message: "View 1 button was clicked."
			};

			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("_onButtonPress", oEvent, oData);

		},

		_onButtonPress: function (oEvent, oData) {
			debugger
			var sMessage = oData.message;
			sap.m.MessageToast.show("sMessage");

		},

		// Menu
		handlePressOpenMenu: function (oEvent) {
			var oButton = oEvent.getSource();

			// create menu only once
			if (!this._menu) {
				this._menu = sap.ui.xmlfragment(
					"BasicControls.BasicControls.fragments.Menu",
					this
				);
				this.getView().addDependent(this._menu);
			}

			var eDock = sap.ui.core.Popup.Dock;
			this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
		},
		onPopoverPress: function (oEvent) {
			var oButton = oEvent.getSource();

			// create popover
			if (!this._oPopover) {
				Fragment.load({
					name: "BasicControls.BasicControls.fragments.Popover",
					controller: this
				}).then(function (pPopover) {
					this._oPopover = pPopover;
					this.getView().addDependent(this._oPopover);
					// this._oPopover.bindElement("/ProductCollection/0");
					this._oPopover.openBy(oButton);
				}.bind(this));
			} else {
				this._oPopover.openBy(oButton);
			}
		},

		handleMenuItemPress: function (oEvent) {
			var msg = "'" + oEvent.getParameter("item").getText() + "' pressed";
			sap.m.MessageToast.show(msg);
		},

		handleTextFieldItemPress: function (oEvent) {
			var msg = "'" + oEvent.getParameter("item").getValue() + "' entered";
			sap.m.MessageToast.show(msg);
		},
		onPress: function () {
			debugger;
		},
		onKidPress: function () {
			debugger;
		},
		// Menu
		onApiCall: function () {
			debugger;
			$.ajax({
				url: "https://my-json-server.typicode.com/sagarsalyan/fake-json/profiles",
				success: function (result) {
					debugger;
				},
				error: function (err) {
					debugger;
				}
			});
		},
		onSecond: function () {
			var route = new sap.ui.core.UIComponent.getRouterFor(this);
			route.navTo("Second", true);
		},
		onRowSelect: function (oEvent) {
			MessageToast.show(oEvent.getSource().getParent().getBindingContext("JSON").getObject().name)
		},
		onBindAgain: function (oEvent) {
			debugger
			var students = [{
				"sid": "1",
				"name": "Sagar",
				"class": "MCA",
				"address": "Perla",
				"mobile": "8129482811"
			}, {
				"sid": "2",
				"name": "Rakshi",
				"class": "MCA",
				"address": "Mudipu",
				"mobile": "9964634224"
			}]
			this.getView().getModel("JSON").setProperty("/students", students)
			this.getView().getModel("JSON").refresh();
		},
		//SAP Conversational AI
		getBot: function () {
			debugger;
			var that = this;
			//check your user-slug in SAP Conversational AI 

			var oAuthURL = "https://sapcai-community.authentication.eu10.hana.ondemand.com/oauth/token";

			var oAuthPayload = {
				"client_id": "sb-1206e778-1a15-4ade-8ff4-9eae26ebed98-CLONE-DT!b40741|cai-production!b20881",
				"client_secret": "2Gyz12wNhHVTyI3Em4klAjjpNWs=",
				"grant_type": "client_credentials"
			}

			var oAuthHeaders = {
				"Content-Type": "application/x-www-form-urlencoded"
			}
			$.ajax({
				type: "POST",
				url: oAuthURL,
				headers: oAuthHeaders,
				data: oAuthPayload,
				success: function (data) {
					that.oAuthToken = data['access_token'];
				},
				error: function (data) {
					debugger
				}
			});

			// $.ajax({
			// 	type: "GET",
			// 	url: "https://" + "api.cai.tools.sap/auth/v1/owners/sagarslyn",
			// 	headers: {
			// 		"Authorization": "Token 0778aa4ce06953cd01fa4cc2a0eb70fa" //request token
			// 	},
			// 	success: function (data) {
			// 		that.uuid = data.results.owner.id;
			// 	},
			// 	error: function (data) {
			// 		debugger
			// 	}
			// });

		},
		onChat: function (oEvent) {
			var that = this;
			var oView = that.getView();
			if (!this._PopDialog) {
				this._PopDialog = sap.ui.xmlfragment(
					"BasicControls.BasicControls.fragments.Chatbot", this);
				oView.addDependent(this._PopDialog);
			}
			this._PopDialog.openBy(oView.byId("idChat"));
		},
		onTextEnter: function (oEvent) {
			var that = this;
			var vInWrittenVal = sap.ui.getCore().byId("id_IPReply").getValue();
			sap.ui.getCore().byId("id_IPReply").setValue("");
			// sap.ui.getCore().byId("id_BtnResPopBotonEnter").setEnabled(false);
			// sap.m.MessageToast.show("Hello");
			// Value / Text entered by User
			if (vInWrittenVal) {
				that.fnAddContentToChatWindowFromPost(vInWrittenVal,"self");
				that.fnChatInputPost(vInWrittenVal); //----- Calling Written Input Post method to get response ----- //
			}
		},
		liveChangeWriteReply: function (oEvent) {

		},
		fnAddContentToChatWindowFromPost: function (vTextVal,msgType) {
			var that = this;
			var View = that.getView();
			// var justifyContent = msgType === "self" ? "End" : "Start";
			var direction = msgType === "self" ? "RowReverse" : "Row";
			
			var oVBox = sap.ui.getCore().byId("id_VBChatWindow");
			var oFBoxBotIP = new sap.m.FlexBox({
				direction:direction,
				justifyContent: "Start"
			});
			var icon = "sap-icon://customer"
			var oIcon = new sap.ui.core.Icon({
				src: icon
			});
			oFBoxBotIP.addItem(oIcon);
			
			var oBotText = new sap.m.Text({
				text: vTextVal
			}).addStyleClass("cssChatMessage");
			oFBoxBotIP.addItem(oBotText);
			oVBox.addItem(oFBoxBotIP);
		},
		fnChatInputPost: function (vInWrittenVal) {
			var that = this;
			var oURL = "https://api.cai.tools.sap/build/v1/dialog";
			var oData = {
				"message": {
					"type": "text",
					"content": vInWrittenVal //--- Message wrote by User ---//
				},
				"conversation_id": "test", //--- Can pass any value --- //
				"log_level": "info"
			};
			var botToken = "5c0b471ef90ce613a76deb780aa108d1";
			var oheaders = {
				"Authorization": "Bearer " + this.oAuthToken,
				"X-Token": "Token " + botToken,
				"Content-Type": "application/json"
			}
			$.ajax({
				type: 'POST',
				data: JSON.stringify(oData),
				url: oURL,
				headers: oheaders,
				success: function (odata, oResponse) {
					if (odata.results) {
						that.vBotResText = odata.results.messages[0].content; //--- Bot response --- //
					} else {
						that.vBotResText = 'Sorry, we can not help you right now, please connect to us after sometime';
					}
					that.fnAddContentToChatWindowFromPost(that.vBotResText,"bot"); //--- Calling method for setting value to Chat Bot Window --- //
					//$("div").scrollTop(6000);
				},
				error: function (Response) {
					debugger
				}
			});
		},
		//SAP Conversational AI
		getType:function(oEvent){
			return oEvent.getProperty('Type');
		},
		getGroupHeader:function(oEvent){
			if(oEvent.key === "EL") var text = "Electronics";
			else if(oEvent.key === "PA") text = "Paddy";
			return new GroupHeaderListItem({
				title : text
			})
		},
		openActionPlan:function(oEvent){
			if (!this._ActionPlanDialog) {
				this._ActionPlanDialog = sap.ui.xmlfragment(
					"BasicControls.BasicControls.fragments.ActionPlan",
					this
				);
				this.getView().addDependent(this._ActionPlanDialog);
			}
			this._ActionPlanDialog.open();
			
			
			var actionplans = [
				{
					title:"Action Plan1",
					text:"Something1"
				},
				{
					title:"Action Plan2",
					text:"Something2"
				}
			];
			var oModel = new sap.ui.model.json.JSONModel(actionplans)
			this._ActionPlanDialog.setModel(oModel);
		},
		onAfterRendering: function () {
			var inp = this.getView().byId("name");
			// inp.onkeypress = function(){
			// 	debugger;	
			// };
			// inp.onfocusin = function(){
			// 	debugger;	
			// };
			// inp.onfocusout = function(){
			// 	debugger;	
			// };

			inp.attachBrowserEvent("keypress", function () {
				debugger;
			});
			inp.attachBrowserEvent("focusin", function () {
				debugger;
			});
			inp.attachBrowserEvent("focusout", function () {
				debugger;
			});

			//SAP Conversational AI integration
			this.getBot()
				//SAP Conversational AI integration
		}

	});
});