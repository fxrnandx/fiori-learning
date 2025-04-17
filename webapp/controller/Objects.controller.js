sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("br.com.gestao.fioriappreport398.controller.Objects", {
        onInit: function () {

        },
        OnClickSet: function(evt){
            var objTitleText = this.getView().byId("headerTitle");
            objTitleText.setText("Novo Titulo Header");
        },
        OnClickGet: function(evit){
            debugger;
            var objTitleText = this.getView().byId("headerTitle");
            var TextValue = objTitleText.getText();

        }
    });
});
