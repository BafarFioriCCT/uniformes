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

    var OperatorControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedOpe: {},
            btnUpdateOpe: {},
            btnDeleteOpe: {},
            //!---CREATE---
            _oFgtOperatorCreate: {},
            inpCreateTipoUniforme: {},
            inpCreatePaquete: {},
            inpCreateDescripcion: {},
            //!---UPDATE---
            _oFgtOperatorUpdate: {},
            inpUpdateOpFuncion: {},
            inpUpdateTipoUniforme: {},
            inpUpdatePaquete: {},
            inpUpdateDescripcion: {},
            //!---TABLA---
            tableOpe: {},
            selectedItemsOpe: [],
            cBoxOpe: {},
            sFieldOpe: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsOpe: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[2] // VB2_3Ope
                .getItems()[0];
            this.sharedData.tableOpe = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[2] // VB2_3Ope
                .getItems()[0] // tableOpe
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchOpe
            this.sharedData.cBoxOpe = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[2] // VB2_3Ope
                .getItems()[0] // tableOpe
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldOpe
            this.sharedData.sFieldOpe = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[1] // VB2_2Ope
                .getItems()[0]
                .getItems()[0]; // createButtonOpe
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[1] // VB2_2Ope
                .getItems()[0]
                .getItems()[1]; // updateButtonOpe
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateOpe = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[1] // VB2_2Ope
                .getItems()[0]
                .getItems()[2]; // deleteButtonOpe
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteOpe = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[0] // VB2_1Ope
                .getItems()[1]
                .getItems()[0]; // btnDownloadOpe
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[0] // VB2_1Ope
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedOpe
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedOpe = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[0] // VB2_1Ope
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateOpe
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[2] // Main->OperatorView.fragment.xml
                .getItems()[0] // VB2_1Ope
                .getItems()[1]
                .getItems()[3]; // btnUploadOpe
            oComponent.setEnabled(write)

            this.enableMainBtnsOpe([]);
        },

        //!---CREATE---
        setFgtCreateOpe: function (oFragment) {
            this.sharedData._oFgtOperatorCreate = oFragment;

            var oComponent = this.sharedData._oFgtOperatorCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateTipoUniforme
            this.sharedData.inpCreateTipoUniforme = oComponent;

            oComponent = this.sharedData._oFgtOperatorCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpCreatePaquete
            this.sharedData.inpCreatePaquete = oComponent;

            oComponent = this.sharedData._oFgtOperatorCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // TextArea
                .mAggregations
                .fields[0]; // inpCreateDescripcion
            this.sharedData.inpCreateDescripcion = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateOpe: function (oFragment) {
            this.sharedData._oFgtOperatorUpdate = oFragment;

            var oComponent = this.sharedData._oFgtOperatorUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpUpdateOpFuncion
            this.sharedData.inpUpdateOpFuncion = oComponent;
            this.sharedData.inpUpdateOpFuncion.setValue(
                this.sharedData.selectedItemsOpe[0].OpFuncion
            );

            oComponent = this.sharedData._oFgtOperatorUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpUpdateTipoUniforme
            this.sharedData.inpUpdateTipoUniforme = oComponent;
            this.sharedData.inpUpdateTipoUniforme.setValue(
                this.sharedData.selectedItemsOpe[0].TipoUnif
            );

            oComponent = this.sharedData._oFgtOperatorUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // inpUpdatePaquete
            this.sharedData.inpUpdatePaquete = oComponent;
            this.sharedData.inpUpdatePaquete.setValue(
                this.sharedData.selectedItemsOpe[0].Paquete
            );

            oComponent = this.sharedData._oFgtOperatorUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // TextArea
                .mAggregations
                .fields[0]; // inpUpdateDescripcion
            this.sharedData.inpUpdateDescripcion = oComponent;
            this.sharedData.inpUpdateDescripcion.setValue(
                this.sharedData.selectedItemsOpe[0].Descripcion
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVOpe: async function () {
            var results = await MainControllerHelper.getSetOData("PaqOpSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        OpFuncion: results[i].OpFuncion,
                        TipoUnif: results[i].TipoUnif,
                        Paquete: results[i].Paquete,
                        Descripcion: results[i].Descripcion
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Operadores.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVOpe: function () {
            var results = this.sharedData.selectedItemsOpe;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        OpFuncion: results[i].OpFuncion,
                        TipoUnif: results[i].TipoUnif,
                        Paquete: results[i].Paquete,
                        Descripcion: results[i].Descripcion
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Operadores.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVOpe: function () {
            var columns = [
                {
                    OpFuncion: "",
                    TipoUnif: "",
                    Paquete: "",
                    Descripcion: ""
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Operadores.csv");
        },

        // Función para subir CSV
        uploadCSVOpe: function () {
            var that = this;

            var dialog = new Dialog({
                title: "Subir archivo CSV",
                contentWidth: "100px",
                contentHeight: "80px",
                resizable: true,
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Operadores");
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

                        MainControllerHelper.postMultipleOData("OPERADOR", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Operadore(s) agregados exitosamente!');

                                that.handleResetBtnConfirmOpe();
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
        onDeleteDialogOpe: function () {
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
                        that.sharedData.selectedItemsOpe.forEach(item => {
                            toInAllDel.push({ B1: item.OpFuncion })
                        });
                        MainControllerHelper.postMultipleOData("OPERADOR", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Operador(s) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmOpe();
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
        onChangeOpe: function () {
            return this.sharedData.cBoxOpe.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldOpe: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("PaqOpSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeOpe();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldOpe.getValue();
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

            var oTable = this.sharedData.tableOpe // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmOpe: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("PaqOpSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tableOpe;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmOpe: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldOpe.setValue("");
            this.handleSearchFieldOpe();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsOpe = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsOpe([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemOpe: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableOpe.getItems();

                that.sharedData.selectedItemsOpe = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        OpFuncion: item.getCells()[0].getText(),
                        TipoUnif: item.getCells()[1].getText(),
                        Paquete: item.getCells()[2].getText(),
                        Descripcion: item.getCells()[3].getText(),
                    };
                    that.sharedData.selectedItemsOpe.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsOpe = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    OpFuncion: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    TipoUnif: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Paquete: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    Descripcion: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsOpe.some(function (item) {
                    return item.OpFuncion === oItem.OpFuncion;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsOpe = that.sharedData.selectedItemsOpe
                        .filter(function (item) {
                            return item.OpFuncion !== oItem.OpFuncion;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsOpe.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsOpe(that.sharedData.selectedItemsOpe.length);
            console.log(that.sharedData.selectedItemsOpe);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsOpe: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedOpe.setEnabled(read);
                this.sharedData.btnUpdateOpe.setEnabled(write);
                this.sharedData.btnDeleteOpe.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedOpe.setEnabled(read);
                this.sharedData.btnUpdateOpe.setEnabled(false);
                this.sharedData.btnDeleteOpe.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedOpe.setEnabled(false);
                this.sharedData.btnUpdateOpe.setEnabled(false);
                this.sharedData.btnDeleteOpe.setEnabled(false);
            }
        },
    };

    return OperatorControllerHelper;
});