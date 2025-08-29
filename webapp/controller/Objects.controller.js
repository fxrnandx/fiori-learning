sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Label",
    "sap/m/Input",
    "sap/ui/layout/form/SimpleForm",
    "sap/m/TextArea"
],
    function (Controller, Label, Input, SimpleForm, TextArea) {
        "use strict";

        return Controller.extend("br.com.gestao.fioriappreport398.controller.Objects", {
            onInit: function () {

            },
            OnClickSet: function (evt) {
                var objTitleText = this.getView().byId("headerTitle");
                objTitleText.setText("Novo Titulo Header");
            },
            OnClickGet: function (evt) {
                debugger;
                var objTitleText = this.getView().byId("headerTitle");
                var TextValue = objTitleText.getText();

            },

            addForm: function (evt) {
                debugger;
                //Criando referência ao objeto panel
                var objPanel = this.getView().byId("panelForm")

                //Destruir todo o conteúdo do painel
                objPanel.destroyContent();

                //Criando os objetos do Formulário  
                var objItensForm = [];

                objItensForm.push(new Label({ text: "Pergunta 1", required: true }));
                objItensForm.push(new Input({ value: "Valor da pergunta 1" }));

                objItensForm.push(new Label({ text: "Pergunta 2", required: false }));
                objItensForm.push(new TextArea("textArea",{rows: 7} )); 

                var oForm = new SimpleForm({content: objItensForm});

                //Adicionar o formulário dentro do Panel
                objPanel.addContent(oForm);
            }
        });
    });
