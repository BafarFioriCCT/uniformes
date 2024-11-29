sap.ui.define([
    //?-----------------------OTROS-----------------------
    "zuniformes/controller/helpers/MainControllerHelper", // Importar la clase Utility
    //?-----------------------SAP/UI-----------------------
    'sap/ui/model/json/JSONModel',
    'sap/ui/unified/FileUploader',
    //?-----------------------SAP/M-----------------------
    'sap/m/Button',
    'sap/m/ButtonType',
    'sap/m/Dialog',
    'sap/m/MessageToast',
    'sap/m/Text',
    'sap/m/FlexBox'
], function (
    //?-----------------------OTROS-----------------------
    MainControllerHelper,
    //?-----------------------SAP/UI-----------------------
    JSONModel, FileUploader,
    //?-----------------------SAP/M-----------------------
    Button, ButtonType, Dialog, MessageToast, Text, FlexBox
) {
    "use strict";

    var GralSizesControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedTaGral: {},
            btnUpdateTaGral: {},
            btnDeleteTaGral: {},
            //!---CREATE---
            _oFgtGralSizesCreate: {},
            inpCreateTalla: {},
            inpCreateTipo: {},
            //!---UPDATE---
            _oFgtGralSizesUpdate: {},
            inpUpdateIdTaGr: {},
            inpUpdateTalla: {},
            inpUpdateTipo: {},
            //!---TABLA---
            tableTaGral: {},
            selectedItemsTaGral: [],
            cBoxTaGral: {},
            sFieldTaGral: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsTaGral: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[2] // VB2_3TaGral
                .getItems()[0];
            this.sharedData.tableTaGral = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[2] // VB2_3TaGral
                .getItems()[0] // tableTaGral
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchTaGral
            this.sharedData.cBoxTaGral = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[2] // VB2_3TaGral
                .getItems()[0] // tableTaGral
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldTaGral
            this.sharedData.sFieldTaGral = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[1] // VB2_2TaGral
                .getItems()[0]
                .getItems()[0]; // createButtonTaGral
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[1] // VB2_2TaGral
                .getItems()[0]
                .getItems()[1]; // updateButtonTaGral
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateTaGral = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[1] // VB2_2TaGral
                .getItems()[0]
                .getItems()[2]; // deleteButtonTaGral
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteTaGral = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[0] // VB2_1TaGral
                .getItems()[1]
                .getItems()[0]; // btnDownloadTaGral
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[0] // VB2_1TaGral
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedTaGral
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedTaGral = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[0] // VB2_1TaGral
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateTaGral
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[5] // Main->GralSizes.fragment.xml
                .getItems()[0] // VB2_1TaGral
                .getItems()[1]
                .getItems()[3]; // btnUploadTaGral
            oComponent.setEnabled(write)

            this.enableMainBtnsTaGral([]);
        },

        //!---CREATE---
        setFgtCreateTaGral: function (oFragment) {
            this.sharedData._oFgtGralSizesCreate = oFragment;

            var oComponent = this.sharedData._oFgtGralSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateTalla
            this.sharedData.inpCreateTalla = oComponent;

            oComponent = this.sharedData._oFgtGralSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpCreateTipo
            this.sharedData.inpCreateTipo = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateTaGral: function (oFragment) {
            this.sharedData._oFgtGralSizesUpdate = oFragment;

            var oComponent = this.sharedData._oFgtGralSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpUpdateIdTaGr
            this.sharedData.inpUpdateIdTaGr = oComponent;
            this.sharedData.inpUpdateIdTaGr.setValue(
                this.sharedData.selectedItemsTaGral[0].IdTaGr
            );

            oComponent = this.sharedData._oFgtGralSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpUpdateTalla
            this.sharedData.inpUpdateTalla = oComponent;
            this.sharedData.inpUpdateTalla.setValue(
                this.sharedData.selectedItemsTaGral[0].Talla
            );

            oComponent = this.sharedData._oFgtGralSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // inpUpdateTipo
            this.sharedData.inpUpdateTipo = oComponent;
            this.sharedData.inpUpdateTipo.setValue(
                this.sharedData.selectedItemsTaGral[0].Tipo
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVTaGral: async function () {
            var results = await MainControllerHelper.getSetOData("TallasGrlSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdTaGr: results[i].IdTaGr,
                        Talla: results[i].Talla,
                        Tipo: results[i].Tipo,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "TallasGral.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVTaGral: function () {
            var results = this.sharedData.selectedItemsTaGral;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdTaGr: results[i].IdTaGr,
                        Talla: results[i].Talla,
                        Tipo: results[i].Tipo,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "TallasGral.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVTaGral: function () {
            var columns = [
                {
                    IdTaGr: "",
                    Talla: "",
                    Tipo: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "TallasGral.csv");
        },

        // Función para subir archivo CSV
        uploadCSVTaGral: function () {
            var that = this;

            var dialog = new Dialog({
                title: "Subir archivo CSV",
                contentWidth: "100px",
                contentHeight: "80px",
                content: [
                    new FlexBox({
                        alignItems: "Center",
                        justifyContent: "Center",
                        wrap: "Wrap",
                        items: [
                            new FileUploader({
                                id: "fileUploader",
                                placeholder: "Elija un archivo",
                                change: function (oEvent) {
                                    MainControllerHelper.onFileUploaderChange(oEvent, "TaGral");
                                }.bind(that), // Pasamos el evento junto con los parámetros
                                fileType: ["csv"],
                                mimeType: ["text/csv"],
                                uploadOnChange: false
                            })
                        ]
                    })
                ],
                beginButton: new Button({
                    text: 'Subir archivo',
                    press: function () {
                        var oToInAll = MainControllerHelper.sharedData.toInAll;

                        MainControllerHelper.postMultipleOData("TALLAS_GRL", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Talla(s) agregada(s) exitosamente!');
                                that.handleResetBtnConfirmTaGral();
                            })
                            .catch(() => {
                                // Aquí hubo un error, puedes manejar el error
                                MessageToast.show("Error al guardar el registro");
                            });

                        dialog.close();
                        dialog.destroy();
                    }
                }),
                endButton: new Button({
                    text: "Cancelar",
                    press: function () {
                        dialog.close();
                    },
                }),
                afterClose: function () {
                    dialog.destroy();
                },
            });

            dialog.open();
        },

        //?-----------------------DELETE-----------------------
        // Función para eliminar masivamente registros seleccionados
        onDeleteDialogTaGral: function () {
            var that = this;
            var dialog = new Dialog({
                title: 'Eliminar registro(s)',
                type: 'Message',
                content: new Text({ text: '¿Estás seguro de eliminar dicho(s) registro(s)?' }),
                beginButton: new Button({
                    type: ButtonType.Reject,
                    text: 'Eliminar',
                    press: function () {
                        var toInAllDel = [];
                        that.sharedData.selectedItemsTaGral.forEach(item => {
                            toInAllDel.push({ B1: item.IdTaGr })
                        });
                        MainControllerHelper.postMultipleOData("TALLAS_GRL", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Talla(s) eliminada(s) éxitosamente!');
                                that.handleResetBtnConfirmTaGral();
                            }).catch(() => {
                                // Aquí hubo un error, puedes manejar el error
                                MessageToast.show("Error al eliminar el registro");
                            });
                        dialog.close();
                    }
                }),
                endButton: new Button({
                    text: 'Cancelar',
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();
        },

        //?-----------------------COMBOBOX-----------------------
        // Función que retorna la key del ComboBox
        onChangeTaGral: function () {
            return this.sharedData.cBoxTaGral.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldTaGral: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("TallasGrlSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeTaGral();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldTaGral.getValue();
            if (comboBoxValue) {
                // Crear una expresión regular que ignore mayúsculas/minúsculas 
                // y que busque coincidencias parciales del valor del SearchField
                var regex = new RegExp(searchFieldValue, "i");

                // Se hace un filtro del OData nuevo, junto retornando
                // el regex con el valor del ComboBox elegido por el usuario
                filteredData = filteredData.filter(function (item) {
                    return regex.test(item[comboBoxValue]);
                });
            }

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: filteredData });

            var oTable = this.sharedData.tableTaGral // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmTaGral: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("TallasGrlSet"); // Orden ascendente o descendente

            // Función para ordenar los datos
            aData.sort(function (a, b) {
                var vA = a[sKey],
                    vB = b[sKey];

                if (vA < vB) {
                    return bDescending ? 1 : -1;
                }
                if (vA > vB) {
                    return bDescending ? -1 : 1;
                }
                return 0;
            });

            // Crear un nuevo JSONModel con los datos ordenados
            var oModel = new JSONModel();
            oModel.setData({ results: aData });

            var oTable = this.sharedData.tableTaGral;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------FILTER-----------------------
        // Función para filtrar datos de las tablas por columna
        handleFilterDialogConfirmTaGral: async function (oEvent) {
            var mParams = oEvent.getParameters(),  // Obtener los parámetros del diálogo de filtro
                aData = await MainControllerHelper.getSetOData("TallasGrlSet"),  // Obtener los datos del JSON original
                filteredData = aData;  // Clonar el array original para filtrar

            // Recorrer las opciones de filtro seleccionadas
            mParams.filterItems.forEach(function (filterItem) {
                var sKey = filterItem.getKey().split("___")[0],  // Obtener el nombre de la columna
                    sValue = filterItem.getKey().split("___")[1];  // Obtener el valor a filtrar

                // Aplicar el filtro a los datos
                filteredData = filteredData.filter(function (item) {
                    return item[sKey] === sValue;  // Verificar que el valor del campo coincida con la opción seleccionada
                });
            });

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: filteredData });

            var oTable = this.sharedData.tableTaGral; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmTaGral: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldTaGral.setValue("");
            this.handleSearchFieldTaGral();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsTaGral = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsTaGral([]);
        },


        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemTaGral: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableTaGral.getItems();

                that.sharedData.selectedItemsTaGral = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdTaGr: item.getCells()[0].getText(),
                        Talla: item.getCells()[1].getText(),
                        Tipo: item.getCells()[2].getText(),
                    };
                    that.sharedData.selectedItemsTaGral.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsTaGral = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdTaGr: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Talla: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Tipo: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsTaGral.some(function (item) {
                    return item.IdTaGr === oItem.IdTaGr;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsTaGral = that.sharedData.selectedItemsTaGral
                        .filter(function (item) {
                            return item.IdTaGr !== oItem.IdTaGr;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsTaGral.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsTaGral(that.sharedData.selectedItemsTaGral.length);
            console.log(that.sharedData.selectedItemsTaGral);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsTaGral: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedTaGral.setEnabled(read);
                this.sharedData.btnUpdateTaGral.setEnabled(write);
                this.sharedData.btnDeleteTaGral.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedTaGral.setEnabled(read);
                this.sharedData.btnUpdateTaGral.setEnabled(false);
                this.sharedData.btnDeleteTaGral.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedTaGral.setEnabled(false);
                this.sharedData.btnUpdateTaGral.setEnabled(false);
                this.sharedData.btnDeleteTaGral.setEnabled(false);
            }
        },
    };

    return GralSizesControllerHelper;
});