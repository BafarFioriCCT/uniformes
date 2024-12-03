sap.ui.define([
    //?-----------------------OTROS-----------------------
    "zuniformes/controller/helpers/MainControllerHelper", // Importar la clase Utility
    "zuniformes/controller/helpers/GraphHelper",
    //?-----------------------SAP/UI-----------------------
    'sap/ui/model/json/JSONModel',
    //?-----------------------SAP/M-----------------------
    'sap/m/MessageToast',
    'sap/m/StandardListItem',
    'sap/m/Dialog',
    'sap/m/Button',
    'sap/m/Link',
], function (
    //?-----------------------OTROS-----------------------
    MainControllerHelper,
    GraphHelper,
    //?-----------------------SAP/UI-----------------------
    JSONModel,
    //?-----------------------SAP/M-----------------------
    MessageToast, StandardListItem, Dialog, Button, Link,
) {
    "use strict";

    var DocumentsControllerHelper = {
        sharedData: {
            //!---BOTONES---
            bDownSelectedListDoc: {},
            bPreviewSelectedListDoc: {},
            //!---LIST---
            modelListDoc: {},
            listDoc: {},
            selectedItemsListDoc: [],
            sFieldListDoc: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setFgtComponentsDoc: function (OGraphFiles) {
            var oComponent = MainControllerHelper.getSharedData()._aFragments[11] // Main->DocumentsView.fragment.xml
                .getItems()[1] // VB2_2ListDoc
                .getItems()[0];
            this.sharedData.listDoc = oComponent;
            this.sharedData.modelListDoc = OGraphFiles;
            // Set del modelo para ListDoc
            this.sharedData.listDoc.setModel(OGraphFiles, "ModelListDoc");
            // Binding de los items para ListDoc
            this.sharedData.listDoc.bindItems({
                path: "ModelListDoc>/DocumentsSet",
                template: new StandardListItem({
                    title: "{ModelListDoc>name}", // Campo name del modelo
                    description: "{ModelListDoc>id}" // Campo id del modelo
                })
            });

            oComponent = MainControllerHelper.getSharedData()._aFragments[11] // Main->DocumentsView.fragment.xml
                .getItems()[1] // VB2_2ListDoc
                .getItems()[0] // tableDoc
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // searchFieldListDoc
            this.sharedData.sFieldListDoc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[11] // Main->DocumentsView.fragment.xml
                .getItems()[0] // VB2_1ListDoc
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedListDoc
            this.sharedData.bDownSelectedListDoc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[11] // Main->DocumentsView.fragment.xml
                .getItems()[0] // VB2_1ListDoc
                .getItems()[1]
                .getItems()[2]; // bPreviewSelectedListDoc
            this.sharedData.bPreviewSelectedListDoc = oComponent;
        },

        //?-----------------------FILES-----------------------
        // Función para descargar todos los archivos del repositorio de OneDrive
        downloadAllFilesListDoc: async function () {
            var oData = this.sharedData.modelListDoc.getData();

            for (const file of oData.DocumentsSet) {
                await GraphHelper.downloadFile(file.name);
            }

            MessageToast.show("Descargando archivos...");
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedFilesListDoc: async function () {
            var results = this.sharedData.selectedItemsListDoc;

            if (results != undefined && results.length > 0) {
                for (const file of results) {
                    await GraphHelper.downloadFile(file.Nombre);
                }
                MessageToast.show("Descargando archivos...");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        previewSelectedListDoc: async function () {
            var that = this;
            var link = window.location.href = await GraphHelper.previewFile(
                that.sharedData.selectedItemsListDoc[0].Nombre
            )
            
            if (link) {
                window.location.replace(link, "_blank");
            }
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro
        onSearchListDoc: function () {
            // Obtener los datos originales del modelo JSON
            var oData = this.sharedData.modelListDoc.getData();

            // Obtener el valor del SearchField para el filtro
            var searchFieldValue = this.sharedData.sFieldListDoc.getValue();

            // Crear una expresión regular para buscar coincidencias parciales, ignorando mayúsculas/minúsculas
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los elementos del conjunto de datos
            var filteredData = oData.DocumentsSet.filter(function (item) {
                return regex.test(item.id) || regex.test(item.name);
            });

            // Crear un nuevo modelo JSON con los datos filtrados
            var oFilteredModel = new JSONModel({ DocumentsSet: filteredData });

            // Configurar el nuevo modelo filtrado en la lista
            this.sharedData.listDoc.setModel(oFilteredModel, "ModelListDoc");

            // Reaplicar el binding de los elementos para que refleje el nuevo modelo
            this.sharedData.listDoc.bindItems({
                path: "ModelListDoc>/DocumentsSet",
                template: this.sharedData.listDoc.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmListDoc: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldListDoc.setValue("");
            this.onSearchListDoc();

            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsListDoc = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsListDoc(
                this.sharedData.selectedItemsListDoc.length
            );
        },

        //?-----------------------LIST SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemListDoc: function (oEvent) {
            var that = this,
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            if (aSelectedItems) {
                // Manejo individual de selección o deselección
                var oItem = {
                    Id: oEvent.getParameter("listItem").mProperties.description,
                    Nombre: oEvent.getParameter("listItem").mProperties.title,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsListDoc.some(function (item) {
                    return item.Id === oItem.Id;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsListDoc = that.sharedData.selectedItemsListDoc
                        .filter(function (item) {
                            return item.Id !== oItem.Id;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsListDoc.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsListDoc(
                that.sharedData.selectedItemsListDoc.length
            );
            console.log(that.sharedData.selectedItemsListDoc);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsListDoc: function (length) {
            if (length == 1) {
                this.sharedData.bDownSelectedListDoc.setEnabled(true);
                this.sharedData.bPreviewSelectedListDoc.setEnabled(true);
            } else if (length > 1) {
                this.sharedData.bDownSelectedListDoc.setEnabled(true);
                this.sharedData.bPreviewSelectedListDoc.setEnabled(false);
            } else {
                this.sharedData.bDownSelectedListDoc.setEnabled(false);
                this.sharedData.bPreviewSelectedListDoc.setEnabled(false);
            }
        },
    };

    return DocumentsControllerHelper;
});