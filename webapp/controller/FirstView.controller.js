sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/EventBus",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"BasicControls/BasicControls/js/demo"
], function (Controller, EventBus,Fragment,MessageToast) {
	"use strict";

	return Controller.extend("BasicControls.BasicControls.controller.FirstView", {
		onInit: function () {

			// var studModel=new sap.ui.model.json.JSONModel();
			// studModel.loadData("model/data.json");
			// sap.ui.getCore().setModel(studModel);

			//Menu
			debugger;
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
				}).then(function(pPopover) {
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
				error :function(err){
					debugger;
				}
			});
		},
		onSecond: function () {
			var route = new sap.ui.core.UIComponent.getRouterFor(this);
			route.navTo("Second", true);
		},
		onRowSelect:function(oEvent){
			MessageToast.show(oEvent.getSource().getParent().getBindingContext("JSON").getObject().name)
		},
		onBindAgain:function(oEvent){
			debugger
			var students=[{
				"sid":"1",
				"name":"Sagar",
				"class":"MCA",
				"address":"Perla",
				"mobile":"8129482811"
				},
				{
				"sid":"2",
				"name":"Rakshi",
				"class":"MCA",
				"address":"Mudipu",
				"mobile":"9964634224"
				}
			]
			this.getView().getModel("JSON").setProperty("/students",students)
			this.getView().getModel("JSON").refresh();
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
		}

	});
});