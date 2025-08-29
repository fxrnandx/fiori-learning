sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport398.controller.Lista", {
            onInit: function () {

                //Trocando o idioma de logon do Fiori

                var oConfiguration = sap.ui.getCore().getConfiguration();

                oConfiguration.setFormatLocale("pt-BR");

            },

            onSearch: function (evt) {

                debugger;

                //Capturando individualmente cada objeto input do FilterBar
                var oProductId = this.getView().byId("productIdInput")
                var oProductName = this.getView().byId("productNameInput")

                var oFilter = new Filter({
                    filters: [
                        new Filter("Productid", FilterOperator.Contains, oProductId.getValue()),
                        new Filter("Name", FilterOperator.Contains, oProductName.getValue()),
                    ],
                    and: true
                })

                //Criação do objeto List e acesso a agregação Items onde sabemos qual a entidade onde será aplicado o filtro

                var oTable = this.getView().byId("productsTable");
                var binding = oTable.getBinding("items");

                //Aplicação do filtro no DataBinding
                binding.filter(oFilter);
            },

            formatDate: function (value) {

                var oConfiguration = sap.ui.getCore().getConfiguration();
                var oLocale = oConfiguration.getFormatLocale();
                var oPattern

                if (oLocale === "pt-BR") {
                    oPattern = "dd/MM/yyyy";
                } else {
                    oPattern = "MM/dd/yyyy"
                }

                debugger;
                if (value) {

                    var year = new Date().getFullYear();
                    if (year === 9999) {
                        return "";
                    } else {
                        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                            style: "medium",
                            pattern: oPattern
                        });

                        return oDateFormat.format(new Date(value));
                    }

                } else {
                    return value;
                }
            },

            //Apresentar texto do status "E" "P" "F" baseado no arquivo i18n
            productStatus: function (value) {

                debugger;

                var oBundle = this.getView().getModel("i18n").getResourceBundle();

                try {
                    return oBundle.getText("status" + value);
                } catch (err) {
                    return "";
                }

            },

            //Altera a cor do estado (cor) "E" "P" "F" baseado no arquivo i18n
            stateProduct: function (value) {

                debugger;

                var oBundle = this.getView().getModel("i18n").getResourceBundle();

                try {
                    if (value === "E") {
                        return "Success";
                    } else if (value === "P") {
                        return "Warning";
                    } else if (value === "F") {
                        return "Error";
                    } else {
                        return "None";
                    }

                } catch (err) {
                    return "None";
                }
            },

            //Altera a cor do estado (icone) "E" "P" "F" baseado no arquivo i18n
            iconProduct: function (value) {

                debugger;

                var oBundle = this.getView().getModel("i18n").getResourceBundle();

                try {
                    if (value === "E") {
                        return "sap-icon://sys-enter-2";
                    } else if (value === "P") {
                        return "sap-icon://factory";
                    } else if (value === "F") {
                        return "sap-icon://lateness";
                    } else {
                        return "None";
                    }

                } catch (err) {
                    return "";
                }
            },

            onRouting: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detalhes");
            },

            onSelectedItem: function (evt) {

                //Captura do Valor da linha selecionada  
                var oProductId = evt.getSource().getBindingContext().getProperty("Productid");

                // Envio para o Route de Detalhes com o parâmetro
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detalhes", {
                    Productid: oProductId
                });
            },

        });
    });
