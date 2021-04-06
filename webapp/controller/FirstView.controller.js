sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/EventBus",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"BasicControls/BasicControls/js/demo"
], function (Controller, EventBus, Fragment, MessageToast) {
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
			var that = this;
			//check your user-slug in SAP Conversational AI 
			$.ajax({
				type: "GET",
				url: "https://" + "api.cai.tools.sap/auth/v1/owners/sagarslyn",
				headers: {
					"Authorization": "0778aa4ce06953cd01fa4cc2a0eb70fa" //request token
				},
				success: function (data) {
					that.uuid = data.results.owner.id;
				},
				error: function (data) {
					debugger
				}
			});

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
				that.fnAddContentToChatWindowFromPost(vInWrittenVal);
				that.fnChatInputPost(vInWrittenVal); //----- Calling Written Input Post method to get response ----- //
			}
		},
		liveChangeWriteReply: function (oEvent) {

		},
		fnAddContentToChatWindowFromPost: function (vTextVal) {
			var that = this;
			var View = that.getView();
			// var vPathImage = jQuery.sap.getModulePath("mahi.Ven.MM");
			// var oImageBot = vPathImage + '/Image/Bot.jpg';
			var VBox = sap.ui.getCore().byId("id_VBChatWindow");
			var oFBoxBotIP = new sap.m.FlexBox({
				justifyContent: "Start"
			}).addStyleClass("cl_ChatFelxBox");
			// var oImg = new sap.m.Image({
			// 	src: oImageBot
			// }).addStyleClass("cl_ImgBot");
			// OFBoxBotIP.addItem(oImg);
			var oBotText = new sap.m.Text({
				text: vTextVal
			}).addStyleClass("cl_BotIPTextCir");
			oFBoxBotIP.addItem(oBotText);
			// oVBox.addItem(OFBoxBotIP);
		},
		fnChatInputPost: function (vInWrittenVal) {
			var that = this;
			var oData = {
				"message": {
					"type": "text",
					"content": vInWrittenVal //--- Message wrote by User ---//
				},
				"conversation_id": "test-189713489629", //--- Can pass any value --- //
				"log_level": "info"
			};
			$.ajax({
				type: 'POST',
				data: JSON.stringify(oData),
				url: "https://" + "api.cai.tools.sap/build/v1/dialog", //--- Callback URL for getting response from created Bot --- //
				contentType: "application/json",
				path: "/build/v1/dialog",
				scheme: "https",
				headers: {
					"Authorization": "Token 6809c583a15e48ef59d511d35a95b8e7", //--- Generated Authorization token --- //
					"x-uuid": that.uuid
				},
				success: function (oData, oResponse) {
					if (oData.results) {
						that.vBotResText = oData.results.messages[0].content; //--- Bot response --- //
					} else {
						that.vBotResText = 'Sorry, we can not help you right now, please connect to us after sometime';
					}
					that.fnAddContentToChatWindowFromPost(that.vBotResText); //--- Calling method for setting value to Chat Bot Window --- //
					//$("div").scrollTop(6000);
				},
				error:function (Response) {
					debugger
				}
			});
		},
		//SAP Conversational AI
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