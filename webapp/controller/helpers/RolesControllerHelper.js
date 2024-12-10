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
    'sap/m/FlexBox',
    'sap/m/SelectDialog',
    'sap/m/StandardListItem',
], function (
    //?-----------------------OTROS-----------------------
    MainControllerHelper,
    //?-----------------------SAP/UI-----------------------
    JSONModel, FileUploader,
    //?-----------------------SAP/M-----------------------
    Button, ButtonType, Dialog, MessageToast, Text, FlexBox,
    SelectDialog, StandardListItem
) {
    "use strict";

    var RolesControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedRol: {},
            btnUpdateRol: {},
            btnDeleteRol: {},
            //!---CREATE---
            _oFgtRolesCreate: {},
            inpCreateRol: {},
            inpCreateDescripcion: {},
            //!---UPDATE---
            _oFgtRolesUpdate: {},
            inpUpdateRol: {},
            inpUpdateDescripcion: {},
            //!---TABLA---
            tableRol: {},
            selectedItemsRol: [],
            cBoxRol: {},
            sFieldRol: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsRol: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[2] // VB2_3Rol
                .getItems()[0];
            this.sharedData.tableRol = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[2] // VB2_3Rol
                .getItems()[0] // tableRol
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchRol
            this.sharedData.cBoxRol = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[2] // VB2_3Rol
                .getItems()[0] // tableRol
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldRol
            this.sharedData.sFieldRol = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[1] // VB2_2Rol
                .getItems()[0]
                .getItems()[0]; // btnCreateRol
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[1] // VB2_2Rol
                .getItems()[0]
                .getItems()[1]; // btnUpdateRol
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateRol = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[1] // VB2_2Rol
                .getItems()[0]
                .getItems()[2]; // deleteButtonRol
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteRol = oComponent;
            
            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[0] // VB2_1Rol
                .getItems()[1]
                .getItems()[0]; // btnDownloadRol
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[0] // VB2_1Rol
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedRol
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedRol = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[0] // VB2_1Rol
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateRol
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[15] // Main->RolesView.fragment.xml
                .getItems()[0] // VB2_1Rol
                .getItems()[1]
                .getItems()[3]; // btnUploadRol
            oComponent.setEnabled(write)

            this.enableMainBtnsRol([]);
        },

        //!---CREATE---
        setFgtCreateRol: function (oFragment) {
            this.sharedData._oFgtRolesCreate = oFragment;

            var oComponent = this.sharedData._oFgtRolesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateRol
            this.sharedData.inpCreateRol = oComponent;

            oComponent = this.sharedData._oFgtRolesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpCreateDescripcion
            this.sharedData.inpCreateDescripcion = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateRol: function (oFragment) {
            this.sharedData._oFgtRolesUpdate = oFragment;

            var oComponent = this.sharedData._oFgtRolesUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpUpdateRol
            this.sharedData.inpUpdateRol = oComponent;
            this.sharedData.inpUpdateRol.setValue(
                this.sharedData.selectedItemsRol[0].Rol
            );

            oComponent = this.sharedData._oFgtRolesUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpUpdateDescripcion
            this.sharedData.inpUpdateDescripcion = oComponent;
            this.sharedData.inpUpdateDescripcion.setValue(
                this.sharedData.selectedItemsRol[0].Descripcion
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVRol: async function () {
            var results = await MainControllerHelper.getSetOData("RolesSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        Rol: results[i].Rol,
                        Descripcion: results[i].Descripcion,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Roles.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVRol: function () {
            var results = this.sharedData.selectedItemsRol;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        Rol: results[i].Rol,
                        Descripcion: results[i].Descripcion,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Roles.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVRol: function () {
            var columns = [
                {
                    Rol: "",
                    Descripcion: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Roles.csv");
        },

        // Función para subir CSV
        uploadCSVRol: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Roles");
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

                        MainControllerHelper.postMultipleOData("ROLES", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Roles agregados exitosamente!');
                                that.handleResetBtnConfirmRol();
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
        onDeleteDialogRol: function () {
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
                        that.sharedData.selectedItemsRol.forEach(item => {
                            toInAllDel.push({ B1: item.Rol })
                        });
                        MainControllerHelper.postMultipleOData("ROLES", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Rol(es) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmRol();
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
        onChangeRol: function () {
            return this.sharedData.cBoxRol.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldRol: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("RolesSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeRol();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldRol.getValue();
            if (comboBoxValue) {
                // Crear una expresión regular que ignore mayúsculas/minúsculas 
                // y que busque coincidencias parciales del valor del SearchField
                var regex = new RegExp(searchFieldValue, "i");

                // Se hace un filtro del OData nuevo, junto retornando
                // el regex con el valor del ComboBox elegido por el Rolario
                filteredData = filteredData.filter(function (item) {
                    return regex.test(item[comboBoxValue]);
                });
            }

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: filteredData });

            var oTable = this.sharedData.tableRol // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmRol: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("RolesSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tableRol;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmRol: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldRol.setValue("");
            this.handleSearchFieldRol();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsRol = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsRol([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemRol: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableRol.getItems();

                that.sharedData.selectedItemsRol = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        Rol: item.getCells()[0].getText(),
                        Descripcion: item.getCells()[1].getText(),
                    };
                    that.sharedData.selectedItemsRol.push(oItem);
                });
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsRol = []; // Limpiar el array de items seleccionados
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    Rol: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Descripcion: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsRol.some(function (item) {
                    return item.Rol === oItem.Rol;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsRol = that.sharedData.selectedItemsRol
                        .filter(function (item) {
                            return item.Rol !== oItem.Rol;
                        });
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsRol.push(oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsRol(that.sharedData.selectedItemsRol.length);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsRol: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedRol.setEnabled(read);
                this.sharedData.btnUpdateRol.setEnabled(write);
                this.sharedData.btnDeleteRol.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedRol.setEnabled(read);
                this.sharedData.btnUpdateRol.setEnabled(false);
                this.sharedData.btnDeleteRol.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedRol.setEnabled(false);
                this.sharedData.btnUpdateRol.setEnabled(false);
                this.sharedData.btnDeleteRol.setEnabled(false);
            }
        },
    };

    return RolesControllerHelper;
});