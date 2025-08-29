sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (BaseController, ) {
  "use strict";

  return BaseController.extend("br.com.gestao.fioriappreport398.controller.Detalhes", {
    onInit: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("Detalhes").attachMatched(this.onBindingProdutoDetalhes, this);
    },

    onBindingProdutoDetalhes: function (oEvent) {
      //Capturando o parametro trafegado no Route Detalhes (Productid)
      var oProductId = oEvent.getParameter("arguments").Productid;

      //Objeto referente a view Detalhes
      var oView = this.getView();

      //Criar a URL de chamada da nossa entidade de produtos
      var sURL = "/Products('" + oProductId + "')";

      oView.bindElement({
        path: sURL,
        parameters: { expand: 'to_cat' },
        events: {
          change: this.onBindingChange.bind(this),
          dataRequested: function () {
            oView.setBusy(true);
          },
          dataReceived: function (data) {
            oView.setBusy(false);
          }
        }
      });
    },

    onBindingChange: function () {
      var oView = this.getView();
      var oElementBinding = oView.getElementBinding();
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

      //se não existir um elemento (registro) válido eu farei uma ação
      if (!oElementBinding.getBoundContext()) {
        oRouter.getTargets().display("objNotFound");
      }
    },

    onNavBack: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("Lista");
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

    //Apresentar os valores numéricos formatados tipo decimal
    floatNumber: function (value) {
      var numFloat = sap.ui.core.format.NumberFormat.getFloatInstance({
        maxFractionsDigits: 2,
        minFractionsDigits: 2,
        groupingEnabled: true,
        groupingSeparator: ".",
        decimalSeparator: ","
      });

      return numFloat.format(value);
    },

  });
});
