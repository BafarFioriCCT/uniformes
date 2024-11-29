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

    var InChargeControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedEnc: {},
            btnUpdateEnc: {},
            btnDeleteEnc: {},
            //!---CREATE---
            _oFgtInChargeCreate: {},
            inpCreateNoEmp: {},
            inpCreateCiudad1: {},
            inpCreateDivision1: {},
            inpCreateCiudad2: {},
            inpCreateDivision2: {},
            inpCreateCiudad3: {},
            inpCreateDivision3: {},
            //!---UPDATE---
            _oFgtInChargeUpdate: {},
            inpUpdateNoEmp: {},
            inpUpdateRh: {},
            inpUpdateCiudad1: {},
            inpUpdateDivision1: {},
            inpUpdateCiudad2: {},
            inpUpdateDivision2: {},
            inpUpdateCiudad3: {},
            inpUpdateDivision3: {},
            //!---TABLA---
            tableEnc: {},
            selectedItemsEnc: [],
            cBoxEnc: {},
            sFieldEnc: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFgtComponentsEnc: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;
                
            var oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[2] // VB2_3Enc
                .getItems()[0];
            this.sharedData.tableEnc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[2] // VB2_3Enc
                .getItems()[0] // tableEnc
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchEnc
            this.sharedData.cBoxEnc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[2] // VB2_3Enc
                .getItems()[0] // tableEnc
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldEnc
            this.sharedData.sFieldEnc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[1] // VB2_2Enc
                .getItems()[0]
                .getItems()[0]; // createButtonEnc
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[1] // VB2_2Enc
                .getItems()[0]
                .getItems()[1]; // updateButtonEnc
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateEnc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[1] // VB2_2Enc
                .getItems()[0]
                .getItems()[2]; // deleteButtonEnc
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteEnc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[0] // VB2_1Enc
                .getItems()[1]
                .getItems()[0]; // btnDownloadEnc
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[0] // VB2_1Enc
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedEnc
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedEnc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[0] // VB2_1Enc
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateEnc
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[9] // Main->InChargeView.fragment.xml
                .getItems()[0] // VB2_1Enc
                .getItems()[1]
                .getItems()[3]; // btnUploadEnc
            oComponent.setEnabled(write)

            this.enableMainBtnsEnc([]);
        },

        //!---CREATE---
        setFgtCreateEnc: function (oFragment) {
            this.sharedData._oFgtInChargeCreate = oFragment;

            var oComponent = this.sharedData._oFgtInChargeCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateNoEmp
            this.sharedData.inpCreateNoEmp = oComponent;

            oComponent = this.sharedData._oFgtInChargeCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateCiudad1
            this.sharedData.inpCreateCiudad1 = oComponent;

            oComponent = this.sharedData._oFgtInChargeCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreateDivision1
            this.sharedData.inpCreateDivision1 = oComponent;

            oComponent = this.sharedData._oFgtInChargeCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateCiudad2
            this.sharedData.inpCreateCiudad2 = oComponent;

            oComponent = this.sharedData._oFgtInChargeCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreateDivision2
            this.sharedData.inpCreateDivision2 = oComponent;

            oComponent = this.sharedData._oFgtInChargeCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateCiudad3
            this.sharedData.inpCreateCiudad3 = oComponent;

            oComponent = this.sharedData._oFgtInChargeCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreateDivision3
            this.sharedData.inpCreateDivision3 = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateEnc: function (oFragment) {
            this.sharedData._oFgtInChargeUpdate = oFragment;

            var oComponent = this.sharedData._oFgtInChargeUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpUpdateNoEmp
            this.sharedData.inpUpdateNoEmp = oComponent;
            this.sharedData.inpUpdateNoEmp.setValue(
                this.sharedData.selectedItemsEnc[0].NoEmp
            );

            oComponent = this.sharedData._oFgtInChargeUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpUpdateRh
            this.sharedData.inpUpdateRh = oComponent;
            this.sharedData.inpUpdateRh.setValue(
                this.sharedData.selectedItemsEnc[0].Rh
            );

            oComponent = this.sharedData._oFgtInChargeUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateCiudad1
            this.sharedData.inpUpdateCiudad1 = oComponent;
            this.sharedData.inpUpdateCiudad1.setValue(
                this.sharedData.selectedItemsEnc[0].Ciudad1
            );

            oComponent = this.sharedData._oFgtInChargeUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateDivision1
            this.sharedData.inpUpdateDivision1 = oComponent;
            this.sharedData.inpUpdateDivision1.setValue(
                this.sharedData.selectedItemsEnc[0].Division1
            );

            oComponent = this.sharedData._oFgtInChargeUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateCiudad2
            this.sharedData.inpUpdateCiudad2 = oComponent;
            this.sharedData.inpUpdateCiudad2.setValue(
                this.sharedData.selectedItemsEnc[0].Ciudad2
            );

            oComponent = this.sharedData._oFgtInChargeUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateDivision2
            this.sharedData.inpUpdateDivision2 = oComponent;
            this.sharedData.inpUpdateDivision2.setValue(
                this.sharedData.selectedItemsEnc[0].Division2
            );

            oComponent = this.sharedData._oFgtInChargeUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateCiudad3
            this.sharedData.inpUpdateCiudad3 = oComponent;
            this.sharedData.inpUpdateCiudad3.setValue(
                this.sharedData.selectedItemsEnc[0].Ciudad3
            );

            oComponent = this.sharedData._oFgtInChargeUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateDivision3
            this.sharedData.inpUpdateDivision3 = oComponent;
            this.sharedData.inpUpdateDivision3.setValue(
                this.sharedData.selectedItemsEnc[0].Division3
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVEnc: async function () {
            var results = await MainControllerHelper.getSetOData("EncargadosSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        NoEmp: results[i].NoEmp,
                        Rh: results[i].Rh,
                        Ciudad1: results[i].Ciudad1,
                        Division1: results[i].Division1,
                        Ciudad2: results[i].Ciudad2,
                        Division2: results[i].Division2,
                        Ciudad3: results[i].Ciudad3,
                        Division3: results[i].Division3,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Encargados.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVEnc: function () {
            var results = this.sharedData.selectedItemsEnc;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        NoEmp: results[i].NoEmp,
                        Rh: results[i].Rh,
                        Ciudad1: results[i].Ciudad1,
                        Division1: results[i].Division1,
                        Ciudad2: results[i].Ciudad2,
                        Division2: results[i].Division2,
                        Ciudad3: results[i].Ciudad3,
                        Division3: results[i].Division3,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Encargados.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVEnc: function () {
            var columns = [
                {
                    NoEmp: "",
                    Rh: "",
                    Ciudad1: "",
                    Division1: "",
                    Ciudad2: "",
                    Division2: "",
                    Ciudad3: "",
                    Division3: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Encargados.csv");
        },

        // Función para subir archivo CSV
        uploadCSVEnc: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Encargados");
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

                        MainControllerHelper.postMultipleOData("ENCARGADOS", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Encargados agregados exitosamente!');
                                that.handleResetBtnConfirmEnc();
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
        onDeleteDialogEnc: function () {
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
                        that.sharedData.selectedItemsEnc.forEach(item => {
                            toInAllDel.push({ B1: item.NoEmp })
                        });
                        MainControllerHelper.postMultipleOData("ENCARGADOS", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Encargado(s) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmEnc();
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
        onChangeEnc: function () {
            return this.sharedData.cBoxEnc.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldEnc: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("EncargadosSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeEnc();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldEnc.getValue();
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

            var oTable = this.sharedData.tableEnc // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmEnc: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("EncargadosSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tableEnc;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmEnc: async function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldEnc.setValue("");
            this.handleSearchFieldEnc();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsEnc = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsEnc([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemEnc: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableEnc.getItems();
                
                that.sharedData.selectedItemsEnc = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        NoEmp: item.getCells()[0].getText(),
                        Rh: item.getCells()[1].getText(),
                        Ciudad1: item.getCells()[2].getText(),
                        Division1: item.getCells()[3].getText(),
                        Ciudad2: item.getCells()[4].getText(),
                        Division2: item.getCells()[5].getText(),
                        Ciudad3: item.getCells()[6].getText(),
                        Division3: item.getCells()[7].getText(),
                    };
                    that.sharedData.selectedItemsEnc.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsEnc = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    NoEmp: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Rh: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Ciudad1: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    Division1: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    Ciudad2: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                    Division2: oEvent.getParameter("listItem").mAggregations.cells[5].mProperties.text,
                    Ciudad3: oEvent.getParameter("listItem").mAggregations.cells[6].mProperties.text,
                    Division3: oEvent.getParameter("listItem").mAggregations.cells[7].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsEnc.some(function (item) {
                    return item.NoEmp === oItem.NoEmp;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsEnc = that.sharedData.selectedItemsEnc
                        .filter(function (item) {
                            return item.NoEmp !== oItem.NoEmp;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsEnc.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsEnc(that.sharedData.selectedItemsEnc.length);
            console.log(that.sharedData.selectedItemsEnc);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsEnc: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedEnc.setEnabled(read);
                this.sharedData.btnUpdateEnc.setEnabled(write);
                this.sharedData.btnDeleteEnc.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedEnc.setEnabled(read);
                this.sharedData.btnUpdateEnc.setEnabled(false);
                this.sharedData.btnDeleteEnc.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedEnc.setEnabled(false);
                this.sharedData.btnUpdateEnc.setEnabled(false);
                this.sharedData.btnDeleteEnc.setEnabled(false);
            }
        },
    };

    return InChargeControllerHelper;
});