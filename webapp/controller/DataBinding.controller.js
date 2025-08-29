sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Label",
    "sap/m/Input",
    "sap/ui/layout/form/SimpleForm",
    "sap/m/TextArea"
],
function (Controller, Label, Input, SimpleForm, TextArea) {
    "use strict";

    return Controller.extend("br.com.gestao.fioriappreport398.controller.DataBinding", {
        onInit: function () {

            var objModelJSON = new sap.ui.model.json.JSONModel();
            objModelJSON.loadData("dados/Produtos.json");
            this.getView().setModel(objModelJSON, "Model_JSON_Produtos");
        },

        getRegion: function(){
            var objRegionModelJSON = new sap.ui.model.json.JSONModel();
            objRegionModelJSON.loadData("dados/Regions.json");
            this.getView().setModel(objRegionModelJSON, "Model_JSON_Regions");

            var objForm = this.getView().byId("formRegions");
            objForm.bindElement("Model_JSON_Regions>/regions/1");
        }
    });
});
