sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"BasicControls/BasicControls/js/Utils"
], function (Controller,Utils) {
	"use strict";

	return Controller.extend("BasicControls.BasicControls.controller.AvailableProduct", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BasicControls.BasicControls.view.AvailableProduct
		 */
		onInit: function () {
			var items = {
				product: [
					{
						productName: "Notebook",
						category: "Stationary",
						quantity: "10"
					}, {
						productName: "Notebook",
						category: "Stationary",
						quantity: "10"
					}, {
						productName: "Notebook",
						category: "Stationary",
						quantity: "10"
					}, {
						productName: "Notebook",
						category: "Stationary",
						quantity: "10"
					}, {
						productName: "Notebook",
						category: "Stationary",
						quantity: "10"
					}
				]
			}
			var itemModel = new sap.ui.model.json.JSONModel(items)
			this.getView().byId("table").setModel(itemModel)
			
		},
		onDropAvailableProductsTable: function(oEvent) {
			var oDraggedItem = oEvent.getParameter("draggedControl");
			var oDraggedItemContext = oDraggedItem.getBindingContext();
			if (!oDraggedItemContext) {
				return;
			}

			// reset the rank property and update the model to refresh the bindings
			var oAvailableProductsTable = Utils.getAvailableProductsTable(this);
			var oProductsModel = oAvailableProductsTable.getModel();
			oProductsModel.setProperty("Rank", Utils.ranking.Initial, oDraggedItemContext);
		},

		moveToSelectedProductsTable: function() {
			var oAvailableProductsTable = Utils.getAvailableProductsTable(this);
			Utils.getSelectedItemContext(oAvailableProductsTable, function(oAvailableItemContext, iAvailableItemIndex) {
				var oSelectedProductsTable = Utils.getSelectedProductsTable(this);
				var oFirstItemOfSelectedProductsTable = oSelectedProductsTable.getItems()[0];
				var iNewRank = Utils.ranking.Default;

				if (oFirstItemOfSelectedProductsTable) {
					var oFirstContextOfSelectedProductsTable = oFirstItemOfSelectedProductsTable.getBindingContext();
					iNewRank =  Utils.ranking.Before(oFirstContextOfSelectedProductsTable.getProperty("Rank"));
				}

				var oProductsModel = oAvailableProductsTable.getModel();
				oProductsModel.setProperty("Rank", iNewRank, oAvailableItemContext);

				// select the inserted and previously selected item
				oSelectedProductsTable.getItems()[0].setSelected(true);
				var oPrevSelectedItem = oAvailableProductsTable.getItems()[iAvailableItemIndex];
				if (oPrevSelectedItem) {
					oPrevSelectedItem.setSelected(true);
				}
			}.bind(this));
		},

		onBeforeOpenContextMenu: function(oEvent) {
			oEvent.getParameter("listItem").setSelected(true);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf BasicControls.BasicControls.view.AvailableProduct
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf BasicControls.BasicControls.view.AvailableProduct
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf BasicControls.BasicControls.view.AvailableProduct
		 */
		//	onExit: function() {
		//
		//	}

	});

});