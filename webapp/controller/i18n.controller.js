sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Label",
    "sap/m/Input",
    "sap/ui/layout/form/SimpleForm",
    "sap/m/TextArea",
    "sap/m/MessageBox"
],
    function (Controller, Label, Input, SimpleForm, TextArea, MessageBox) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport398.controller.i18n", {
            onInit: function () {
                this.trocaIdioma();
            },

            enviaCadastro: function(){
                //msgConfirmacao
                 debugger;
                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                var Cliente = this.getView().byId("cliente").getValue();
                var Cidade = this.getView().byId("cidade").getValue();
                var Estado = this.getView().byId("estado").getValue();

                var sMensagem = oResourceBundle.getText("msgConfirmacao", [Cliente, Cidade, Estado]);

                MessageBox.confirm(sMensagem);

            },

            trocaIdioma: function(){
                var i18nModel = new sap.ui.model.resource.ResourceModel({
                    bundleName: "br.com.gestao.fioriappreport398.i18n.i18n", 
                    locale: "de"
                });

                this.getView().setModel(i18nModel, "i18n");
            }
        });
    });
