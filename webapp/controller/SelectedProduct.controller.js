sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/ColumnListItem",
	"BasicControls/BasicControls/js/Utils"
], function (Controller,ColumnListItem,Utils) {
	"use strict";

	return Controller.extend("BasicControls.BasicControls.controller.SelectedProduct", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf BasicControls.BasicControls.view.SelectedProduct
		 */
		onInit: function () {

		},
		moveToAvailableProductsTable: function() {
			var oSelectedProductsTable = Utils.getSelectedProductsTable(this);
			Utils.getSelectedItemContext(oSelectedProductsTable, function(oSelectedItemContext, iSelectedItemIndex) {
				// reset the rank property and update the model to refresh the bindings
				var oProductsModel = oSelectedProductsTable.getModel();
				oProductsModel.setProperty("Rank", Utils.ranking.Initial, oSelectedItemContext);

				// select the previously selected position
				var aItemsOfSelectedProductsTable = oSelectedProductsTable.getItems();
				var oPrevItem = aItemsOfSelectedProductsTable[Math.min(iSelectedItemIndex, aItemsOfSelectedProductsTable.length - 1)];
				if (oPrevItem) {
					oPrevItem.setSelected(true);
				}
			});
		},

		onDropSelectedProductsTable: function(oEvent) {
			var oDraggedItem = oEvent.getParameter("draggedControl");
			var oDraggedItemContext = oDraggedItem.getBindingContext();
			if (!oDraggedItemContext) {
				return;
			}

			var oRanking = Utils.ranking;
			var iNewRank = oRanking.Default;
			var oDroppedItem = oEvent.getParameter("droppedControl");

			if (oDroppedItem instanceof ColumnListItem) {
				// get the dropped row data
				var sDropPosition = oEvent.getParameter("dropPosition");
				var oDroppedItemContext = oDroppedItem.getBindingContext();
				var iDroppedItemRank = oDroppedItemContext.getProperty("Rank");
				var oDroppedTable = oDroppedItem.getParent();
				var iDroppedItemIndex = oDroppedTable.indexOfItem(oDroppedItem);

				// find the new index of the dragged row depending on the drop position
				var iNewItemIndex = iDroppedItemIndex + (sDropPosition === "After" ? 1 : -1);
				var oNewItem = oDroppedTable.getItems()[iNewItemIndex];
				if (!oNewItem) {
					// dropped before the first row or after the last row
					iNewRank = oRanking[sDropPosition](iDroppedItemRank);
				} else {
					// dropped between first and the last row
					var oNewItemContext = oNewItem.getBindingContext();
					iNewRank = oRanking.Between(iDroppedItemRank, oNewItemContext.getProperty("Rank"));
				}
			}

			// set the rank property and update the model to refresh the bindings
			var oSelectedProductsTable = Utils.getSelectedProductsTable(this);
			var oProductsModel = oSelectedProductsTable.getModel();
			oProductsModel.setProperty("Rank", iNewRank, oDraggedItemContext);
		},

		moveSelectedItem: function(sDirection) {
			var oSelectedProductsTable = Utils.getSelectedProductsTable(this);
			Utils.getSelectedItemContext(oSelectedProductsTable, function(oSelectedItemContext, iSelectedItemIndex) {
				var iSiblingItemIndex = iSelectedItemIndex + (sDirection === "Up" ? -1 : 1);
				var oSiblingItem = oSelectedProductsTable.getItems()[iSiblingItemIndex];
				var oSiblingItemContext = oSiblingItem.getBindingContext();
				if (!oSiblingItemContext) {
					return;
				}

				// swap the selected and the siblings rank
				var oProductsModel = oSelectedProductsTable.getModel();
				var iSiblingItemRank = oSiblingItemContext.getProperty("Rank");
				var iSelectedItemRank = oSelectedItemContext.getProperty("Rank");

				oProductsModel.setProperty("Rank", iSiblingItemRank, oSelectedItemContext);
				oProductsModel.setProperty("Rank", iSelectedItemRank, oSiblingItemContext);

				// after move select the sibling
				oSelectedProductsTable.getItems()[iSiblingItemIndex].setSelected(true);
			});
		},

		moveUp: function() {
			this.moveSelectedItem("Up");
		},

		moveDown: function() {
			this.moveSelectedItem("Down");
		},

		onBeforeOpenContextMenu: function(oEvent) {
			oEvent.getParameters().listItem.setSelected(true);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf BasicControls.BasicControls.view.SelectedProduct
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf BasicControls.BasicControls.view.SelectedProduct
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf BasicControls.BasicControls.view.SelectedProduct
		 */
		//	onExit: function() {
		//
		//	}

	});

});