sap.ui.define([
    //?-----------------------OTROS-----------------------
    "zuniformes/controller/helpers/MainControllerHelper", // Importar la clase Utility
    "zuniformes/auxiliar/formatter",
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
    'sap/m/TableSelectDialog',
    'sap/m/ColumnListItem',
    'sap/m/Column'
], function (
    //?-----------------------OTROS-----------------------
    MainControllerHelper,
    formatter,
    //?-----------------------SAP/UI-----------------------
    JSONModel, FileUploader,
    //?-----------------------SAP/M-----------------------
    Button, ButtonType, Dialog, MessageToast, Text, FlexBox,
    SelectDialog, StandardListItem,
    TableSelectDialog, ColumnListItem, Column
) {
    "use strict";

    var AssignmentsControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedAsig: {},
            btnUpdateAsig: {},
            btnDeleteAsig: {},
            //!---CREATE---
            _oFgtAssigCreate: {},
            inpCreateIdDocEv: {},
            inpCreateEnc: {},
            inpCreateNoEmp: {},
            dPickCreateFechaAsign: {},
            inpCreateIdInv: {},
            inpCreateArticulo: {},
            inpCreateTipo: null,
            inpCreateTipoUnif: {},
            inpCreateIdTaGr: {},
            inpCreatePrecio: {},
            //!---UPDATE---
            _oFgtAssigUpdate: {},
            inpUpdateIdAsign: {},
            inpUpdateIdDocEv: {},
            inpUpdateEnc: {},
            inpUpdateFuncion: {},
            inpUpdateDivision: {},
            inpUpdateUnidadOrg: {},
            inpUpdateNoEmp: {},
            inpUpdateTipoUnif: {},
            inpUpdateTallaGral: {},
            dPickUpdateFechaAsign: {},
            //!---TABLA---
            tableAsig: {},
            selectedItemsAsig: [],
            cBoxAsig: {},
            sFieldAsig: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsAsig: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[2] // VB2_3Asig
                .getItems()[0];
            this.sharedData.tableAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[2] // VB2_3Asig
                .getItems()[0] // tableAsig
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // cBoxAsig
            this.sharedData.cBoxAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[2] // VB2_3Asig
                .getItems()[0] // tableAsig
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // sFieldAsig
            this.sharedData.sFieldAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[1] // VB2_2Asig
                .getItems()[0]
                .getItems()[0]; // btnCreateAsig
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[1] // VB2_2Asig
                .getItems()[0]
                .getItems()[1]; // btnUpdateAsig
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[1] // VB2_2Asig
                .getItems()[0]
                .getItems()[2]; // btnDeleteAsig
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[0] // VB2_1Asig
                .getItems()[1]
                .getItems()[0]; // bDownloadAsig
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[0] // VB2_1Asig
                .getItems()[1]
                .getItems()[1]; // bDownSelectedAsig
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[0] // VB2_1Asig
                .getItems()[1]
                .getItems()[2]; // bDownloadTemplateAsig
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[7] // Main->AssigmentsView.fragment.xml
                .getItems()[0] // VB2_1Asig
                .getItems()[1]
                .getItems()[3]; // bUploadAsig
            oComponent.setEnabled(write)

            this.enableMainBtnsAsig([]);
        },

        //!---CREATE---
        setFgtCreateAsig: function (oFragment) {
            this.sharedData._oFgtAssigCreate = oFragment;

            var oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0]
                .mAggregations
                .fields[0]; // inpCreateIdDocEv
            this.sharedData.inpCreateIdDocEv = oComponent;

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1]
                .mAggregations
                .fields[0]; // inpCreateEnc
            this.sharedData.inpCreateEnc = oComponent;

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2]
                .mAggregations
                .fields[0]; // inpCreateNoEmp
            this.sharedData.inpCreateNoEmp = oComponent;

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3]
                .mAggregations
                .fields[0]; // dPickCreateFechaAsign
            this.sharedData.dPickCreateFechaAsign = oComponent;

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5]
                .mAggregations
                .fields[0]; // inpCreateIdInv
            this.sharedData.inpCreateIdInv = oComponent;

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[6]
                .mAggregations
                .fields[0]; // inpCreateArticulo
            this.sharedData.inpCreateArticulo = oComponent;

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[7]
                .mAggregations
                .fields[0]; // inpCreateTipoUnif
            this.sharedData.inpCreateTipoUnif = oComponent;
            console.log(oComponent)

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[8]
                .mAggregations
                .fields[0]; // inpCreateIdTaGr
            this.sharedData.inpCreateIdTaGr = oComponent;

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[9]
                .mAggregations
                .fields[0]; // inpCreateTalla
            this.sharedData.inpCreateTalla = oComponent;

            oComponent = this.sharedData._oFgtAssigCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[10]
                .mAggregations
                .fields[0]; // inpCreatePrecio
            this.sharedData.inpCreatePrecio = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateAsig: function (oFragment) {
            this.sharedData._oFgtAssigUpdate = oFragment;

            var oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateIdAsign
            this.sharedData.inpUpdateIdAsign = oComponent;
            this.sharedData.inpUpdateIdAsign.setValue(
                this.sharedData.selectedItemsAsig[0].IdAsign
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateIdDocEv
            this.sharedData.inpUpdateIdDocEv = oComponent;
            this.sharedData.inpUpdateIdDocEv.setValue(
                this.sharedData.selectedItemsAsig[0].IdDocEv
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateEnc
            this.sharedData.inpUpdateEnc = oComponent;
            this.sharedData.inpUpdateEnc.setValue(
                this.sharedData.selectedItemsAsig[0].Encargado
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateFuncion
            this.sharedData.inpUpdateFuncion = oComponent;
            this.sharedData.inpUpdateFuncion.setValue(
                this.sharedData.selectedItemsAsig[0].Funcion
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateDivision
            this.sharedData.inpUpdateDivision = oComponent;
            this.sharedData.inpUpdateDivision.setValue(
                this.sharedData.selectedItemsAsig[0].Division
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateUnidadOrg
            this.sharedData.inpUpdateUnidadOrg = oComponent;
            this.sharedData.inpUpdateUnidadOrg.setValue(
                this.sharedData.selectedItemsAsig[0].UnidadOrg
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateNoEmp
            this.sharedData.inpUpdateNoEmp = oComponent;
            this.sharedData.inpUpdateNoEmp.setValue(
                this.sharedData.selectedItemsAsig[0].NoEmp
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateTipoUnif
            this.sharedData.inpUpdateTipoUnif = oComponent;
            this.sharedData.inpUpdateTipoUnif.setValue(
                this.sharedData.selectedItemsAsig[0].TipoUnif
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // Input
                .mAggregations
                .fields[0]; // inpUpdateTallaGral
            this.sharedData.inpUpdateTallaGral = oComponent;
            this.sharedData.inpUpdateTallaGral.setValue(
                this.sharedData.selectedItemsAsig[0].TallaGral
            );

            oComponent = this.sharedData._oFgtAssigUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5] // DatePicker
                .mAggregations
                .fields[0]; // dPickUpdateFechaAsign
            this.sharedData.dPickUpdateFechaAsign = oComponent;
            this.sharedData.dPickUpdateFechaAsign.setValue(
                this.sharedData.selectedItemsAsig[0].FechaAsign
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVAsig: async function () {
            var results = await MainControllerHelper.getSetOData("AsignacionSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdAsign: results[i].IdAsign,
                        IdDocEv: results[i].IdDocEv,
                        Encargado: results[i].Encargado,
                        Funcion: results[i].Funcion,
                        Division: results[i].Division,
                        UnidadOrg: results[i].UnidadOrg,
                        NoEmp: results[i].NoEmp,
                        TipoUnif: results[i].TipoUnif,
                        TallaGral: results[i].TallaGral,
                        FechaAsign: formatter.oDateFormat.format(
                            formatter.formatDateFromTimestamp(results[i].FechaAsign)
                        ),
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Asignaciones.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVAsig: function () {
            var results = this.sharedData.selectedItemsAsig;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdAsign: results[i].IdAsign,
                        IdDocEv: results[i].IdDocEv,
                        Encargado: results[i].Encargado,
                        Funcion: results[i].Funcion,
                        Division: results[i].Division,
                        UnidadOrg: results[i].UnidadOrg,
                        NoEmp: results[i].NoEmp,
                        TipoUnif: results[i].TipoUnif,
                        TallaGral: results[i].TallaGral,
                        FechaAsign: results[i].FechaAsign,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Asignaciones.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVAsig: function () {
            var columns = [
                {
                    IdAsign: "",
                    IdDocEv: "",
                    Encargado: "",
                    Funcion: "",
                    Division: "",
                    UnidadOrg: "",
                    NoEmp: "",
                    TipoUnif: "",
                    TallaGral: "",
                    FechaAsign: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Asignaciones.csv");
        },

        // Función para subir CSV
        uploadCSVAsig: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Asignaciones");
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

                        MainControllerHelper.postMultipleOData("ASIGNACION", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Asignacione(s) agregados exitosamente!');
                                that.handleResetBtnConfirmAsig();
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

        //?-----------------------CREATE-----------------------
        //!---DOC_EV---
        // Función para seleccionar items de la lista DocEvidencias
        handleValueHelpDocEv: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("DocEvidenciaSet");

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar un documento',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldDocEv(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Nombre}",
                        description: "{IdDocEv}"
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        var sTitle = selectedItem.getDescription();
                        // Procesar la selección en el input
                        that.sharedData.inpCreateIdDocEv.setValue(sTitle);
                    }
                    dialog.destroy();
                },
                cancel: function () {
                    dialog.destroy();
                }
            });

            // Asignar el modelo al SelectDialog
            dialog.setModel(oJsonModel);

            dialog.open();
        },

        // Función para buscar por filtro
        handleSearchFieldDocEv: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("DocEvidenciaSet");

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();
            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.IdDocEv) || regex.test(item.Nombre);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //!---ENCARGADOS---
        // Función para seleccionar items de la lista Encargados
        handleValueHelpEnc: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("EncargadosSet");

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar un encargado',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldEnc(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Rh}",
                        description: "{NoEmp}"
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        // Obtener el item seleccionado por su descripción
                        var sTitle = selectedItem.getDescription();
                        // Procesar la selección en el input
                        that.sharedData.inpCreateEnc.setValue(sTitle);
                    }
                    dialog.destroy();
                },
                cancel: function () {
                    dialog.destroy();
                }
            });

            // Asignar el modelo al SelectDialog
            dialog.setModel(oJsonModel);

            dialog.open();
        },

        // Función para buscar por filtro
        handleSearchFieldEnc: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("EncargadosSet");

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();

            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.NoEmp) || regex.test(item.Rh);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //!---ID_INV---
        // Función para seleccionar items de la Tabla Inventario
        handleValueHelpAsign_IdInv: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("InventarioSet");

            oData.forEach(item => {
                item.FechaEntrada = formatter.formatDateFromTimestamp(item.FechaEntrada);
            });

            oData = oData.filter(function (item) {
                return item.CantTotal !== 0; // Filtrar el inventario con cantidades existentes
            });

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new TableSelectDialog({
                title: "Inventario con cantidades en existencia",
                growing: true,
                growingThreshold: 15,
                columns: [ // Columnas con headers
                    new Column({
                        header: new Text({
                            text: "ID"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Función"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Artículo"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Talla Gral"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Tipo"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Talla 1"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Precio 1"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Proveedor"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Fecha Entrada"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Cantidad Total"
                        }),
                    }),
                ],
                items: { // Path de los items para la tabla
                    path: "/results", // Raíz del JSONModel
                    template: new ColumnListItem({
                        cells: [ // Celdas con sus textos
                            new Text({
                                text: "{IdInv}"
                            }),
                            new Text({
                                text: "{Funcion}"
                            }),
                            new Text({
                                text: "{Articulo}"
                            }),
                            new Text({
                                text: "{TallaGral}"
                            }),
                            new Text({
                                text: "{Tipo}"
                            }),
                            new Text({
                                text: "{Talla1}"
                            }),
                            new Text({
                                text: "{Precio1}"
                            }),
                            new Text({
                                text: "{Proveedor}"
                            }),
                            new Text({
                                text: "{ path: 'FechaEntrada', type: 'sap.ui.model.type.Date', formatOptions: {UTC: true, pattern: 'dd.MM.yyyy' } }"
                            }),
                            new Text({
                                text: "{CantTotal}"
                            }),
                        ]
                    })
                },
                search: function () {
                    that.handleSearchFieldIdInv(dialog, oJsonModel)
                },
                confirm: function (oEvent) { // Función con evento para Confirmar selección
                    that.handleCloseIdInv(oEvent)
                },
            })

            dialog._oSearchField.setPlaceholder("Busque por Función, Artículo o Tipo");

            // Asignar el modelo al SelectDialog
            dialog.setModel(oJsonModel);

            // Abrir el díalogo
            dialog.open();

            MessageToast.show("Recuerde actualizar el stock del inventario...");
        },

        // Función al Confirmar selección del item de la tabla Inventario
        handleCloseIdInv: function (oEvent) {
            var that = this,
                aContexts = oEvent.getParameter("selectedContexts"); // Parámetro del item seleccionado

            if (aContexts && aContexts.length) {
                // Formato completo para obtener el campo específico seleccionado
                var oIdInv = aContexts.map(function (oContext) { return oContext.getObject().IdInv; }).join(", ");
                // Set del valor obtenido al input específico
                that.sharedData.inpCreateIdInv.setValue(oIdInv);
                // Formato completo para obtener el campo específico seleccionado
                var oArticulo = aContexts.map(function (oContext) { return oContext.getObject().Articulo; }).join(", ");
                // Set del valor obtenido al input específico
                that.sharedData.inpCreateArticulo.setValue(oArticulo);

                that.sharedData.inpCreateTipo = aContexts.map(function (oContext) { return oContext.getObject().Tipo; }).join(", ");

                // Mensaje del valor obtenido
                MessageToast.show("Eligió el ID " + oIdInv);
            }
        },

        // Función para buscar por filtro
        handleSearchFieldIdInv: async function (oDialog, oJsonModel) {
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();

            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Referencia directa al array results
            oJsonModel = oJsonModel.getData().results;

            // Filtrar los datos basados en la búsqueda
            var filteredData = oJsonModel.filter(function (item) {
                return regex.test(item.Funcion) || regex.test(item.Articulo) || regex.test(item.Tipo);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //!---TIPO_UNIF---
        // Función para seleccionar o calcular el TipoUnif
        handleValueHelpTipoUnif: function () {
            var that = this;
            return new Promise((resolve) => { // Retornar una promesa
                if (this.sharedData.inpCreateIdInv.getValue().length > 0) { // Si se seleccionó un IdInv, proseguir
                    // Request específica para obtener el TipoUnif de PaqueteSet o PaqOpSet
                    var request = "AsignacionSet(IdAsign='1',IdDocEv='" + this.sharedData.inpCreateIdInv.getValue() + "')";

                    MainControllerHelper.getOData(request)
                        .then(async function (result) { // Then asíncrono
                            var valueTipoUnif = null;
                            console.log(result)

                            // Sí arroja el resultado una Funcion, proseguir
                            if (result.Funcion.length > 0 && result.TipoUnif.length == 0) { //PaqOpSet
                                // Datos OData de AsigPaqOpSet
                                var oDataAsp = await MainControllerHelper.getSetOData("AsigPaqOpSet");

                                // Filtrar los datos por la Funcion obtenida por la consulta GET
                                oDataAsp = oDataAsp.filter(item => item.Funcion === result.Funcion);

                                // Mapear únicamente los valores obtenidos en el OData
                                var oDataAspValues = oDataAsp.map(item => item.OpFuncion);

                                // Datos OData de PaqOpSet
                                var oDataPop = await MainControllerHelper.getSetOData("PaqOpSet");

                                // Filtrar los datos por el campo OpFuncion por los valores mapeados
                                oDataPop = oDataPop.filter(itemPop => oDataAspValues.includes(itemPop.OpFuncion));

                                var oJsonModel = new JSONModel(); // Modelo JSON para la Tabla
                                oJsonModel.setData({ results: oDataPop }); // Set del modelo JSON y datos

                                var dialog = new TableSelectDialog({
                                    growing: true,
                                    growingThreshold: 15,
                                    search: function () { // Función para búsqueda pasando el Dialog y el modelo JSON
                                        that.handleSearchFieldTipoUnif(dialog, oJsonModel)
                                    },
                                    columns: [ // Columnas con headers
                                        new Column({ header: new Text({ text: "Operador Función" }) }),
                                        new Column({ header: new Text({ text: "Tipo Uniforme" }) }),
                                        new Column({ header: new Text({ text: "Paquete" }) }),
                                        new Column({ header: new Text({ text: "Descripción" }) }),
                                    ],
                                    items: { // Path de los items para la tabla
                                        path: "/results", // Raíz del modelo JSON
                                        template: new ColumnListItem({
                                            cells: [ // Celdas con sus textos
                                                new Text({ text: "{OpFuncion}" }),
                                                new Text({ text: "{TipoUnif}" }),
                                                new Text({ text: "{Paquete}" }),
                                                new Text({ text: "{Descripcion}" }),
                                            ]
                                        })
                                    },
                                    confirm: function (oEvent) {
                                        var aContexts = oEvent.getParameter("selectedContexts"); // Parámetro del item seleccionado

                                        if (aContexts && aContexts.length) {
                                            // Formato completo para obtener el campo específico seleccionado
                                            valueTipoUnif = aContexts.map(oContext => oContext.getObject().TipoUnif).join(", ");
                                            // Mensaje del valor obtenido
                                            MessageToast.show("Eligió el tipo de uniforme " + valueTipoUnif);
                                            resolve(valueTipoUnif); // Resolver la promesa con el valor final
                                        }
                                    },
                                });

                                dialog.setModel(oJsonModel); // Set del modelo JSON al Dialog

                                dialog.open(); // Abrir Dialog
                            }
                            // Si arrojó directamente el TipoUnif la consulta, proseguir -> PaqueteSet
                            if (result.Funcion == 0 && result.TipoUnif.length > 0) {
                                valueTipoUnif = result.TipoUnif; // Valor referido del TipoUnif encontrado
                                // Mensaje del valor encontrado
                                MessageToast.show("Tipo de uniforme encontrado: " + valueTipoUnif);
                                resolve(valueTipoUnif); // Resolver directamente si no hay diálogo
                            }
                        });
                } else {
                    MessageToast.show("Seleccione un ID Inventario");
                    resolve(null); // Resolver con null si no hay valor en el Input
                }
            });
        },

        // Función para buscar por filtro
        handleSearchFieldTipoUnif: async function (oDialog, oJsonModel) {
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();

            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Referencia directa al array results
            oJsonModel = oJsonModel.getData().results;

            // Filtrar los datos basados en la búsqueda
            var filteredData = oJsonModel.filter(function (item) {
                return regex.test(item.TipoUnif) || regex.test(item.Paquete);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //!---TALLA_GRL---
        // Función para seleccionar items de la Tabla Inventario
        handleValueHelpTaGral: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("TallasGrlSet");

            oData = oData.filter(function (item) {
                return item.Tipo == that.sharedData.inpCreateTipo; // Filtrar las tallas por el tipo de ropa del inventario
            });

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new TableSelectDialog({
                growing: true,
                growingThreshold: 20,
                columns: [ // Columnas con headers
                    new Column({
                        header: new Text({
                            text: "ID"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Talla"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Tipo"
                        }),
                    }),
                ],
                items: { // Path de los items para la tabla
                    path: "/results", // Raíz del JSONModel
                    template: new ColumnListItem({
                        cells: [ // Celdas con sus textos
                            new Text({
                                text: "{IdTaGr}"
                            }),
                            new Text({
                                text: "{Talla}"
                            }),
                            new Text({
                                text: "{Tipo}"
                            }),
                        ]
                    })
                },
                search: function () {
                    that.handleSearchFieldTaGral(dialog, oJsonModel)
                },
                confirm: function (oEvent) { // Función con evento para Confirmar selección
                    that.handleCloseTaGral(oEvent)
                },
            })

            dialog._oSearchField.setPlaceholder("Busque por ID, Talla o Tipo");

            // Asignar el modelo al SelectDialog
            dialog.setModel(oJsonModel);

            // Abrir el díalogo
            dialog.open();

            MessageToast.show("Mostrando tallas del tipo de ropa elegido: " + that.sharedData.inpCreateTipo)
        },

        // Función al Confirmar selección del item de la tabla Inventario
        handleCloseTaGral: function (oEvent) {
            var that = this,
                aContexts = oEvent.getParameter("selectedContexts"); // Parámetro del item seleccionado

            if (aContexts && aContexts.length) {
                // Formato completo para obtener el campo específico seleccionado
                var oIdTaGr = aContexts.map(function (oContext) { return oContext.getObject().IdTaGr; }).join(", ");
                // Set del valor obtenido al input específico
                that.sharedData.inpCreateIdTaGr.setValue(oIdTaGr);
                // Formato completo para obtener el campo específico seleccionado
                var oTalla = aContexts.map(function (oContext) { return oContext.getObject().Talla; }).join(", ");
                // Set del valor obtenido al input específico
                that.sharedData.inpCreateTalla.setValue(oTalla);
                // Mensaje del valor obtenido
                MessageToast.show("Eligió el ID " + oIdTaGr);
            }
        },

        // Función para buscar por filtro
        handleSearchFieldTaGral: async function (oDialog, oJsonModel) {
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();

            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Referencia directa al array results
            oJsonModel = oJsonModel.getData().results;

            // Filtrar los datos basados en la búsqueda
            var filteredData = oJsonModel.filter(function (item) {
                return regex.test(item.IdTaGr) || regex.test(item.Talla) || regex.test(item.Tipo);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //?-----------------------DELETE-----------------------
        // Función para eliminar masivamente registros seleccionados
        onDeleteDialogAsig: function () {
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
                        that.sharedData.selectedItemsAsig.forEach(item => {
                            toInAllDel.push({ B1: item.IdAsign, B2: item.IdDocEv })
                        });
                        MainControllerHelper.postMultipleOData("ASIGNACION", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Asignacion(es) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmAsig();
                            }).catch(() => {
                                // Aquí hubo un error
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
        onChangeAsig: function () {
            return this.sharedData.cBoxAsig.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldAsig: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("AsignacionSet");
            filteredData.forEach(item => {
                item.FechaAsign = formatter.formatDateFromTimestamp(item.FechaAsign);
            });

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeAsig();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldAsig.getValue();
            if (comboBoxValue) {
                if (comboBoxValue == "FechaAsign") {
                    var regex = new RegExp(searchFieldValue);
                
                    filteredData = filteredData.filter(function (item) {
                        // Filtra por la fecha formateada temporalmente por dd.MM.yyyy
                        return regex.test(
                            formatter.oDateFormat.format(item.FechaAsign)
                        );
                    });
                } else {
                    // Crear una expresión regular que ignore mayúsculas/minúsculas 
                    // y que busque coincidencias parciales del valor del SearchField
                    var regex = new RegExp(searchFieldValue, "i");

                    filteredData = filteredData.filter(function (item) {
                        return regex.test(item[comboBoxValue]);
                    });
                }
            }

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: filteredData });

            var oTable = this.sharedData.tableAsig // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmAsig: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("AsignacionSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tableAsig;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmAsig: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldAsig.setValue("");
            this.handleSearchFieldAsig();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsAsig = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsAsig([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemAsig: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableAsig.getItems();

                that.sharedData.selectedItemsAsig = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdAsign: item.getCells()[0].getText(),
                        IdDocEv: item.getCells()[1].getText(),
                        Encargado: item.getCells()[2].getText(),
                        Funcion: item.getCells()[3].getText(),
                        Division: item.getCells()[4].getText(),
                        UnidadOrg: item.getCells()[5].getText(),
                        NoEmp: item.getCells()[6].getText(),
                        TipoUnif: item.getCells()[7].getText(),
                        TallaGral: item.getCells()[8].getText(),
                        FechaAsign: item.getCells()[9].getText(),
                    };
                    that.sharedData.selectedItemsAsig.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsAsig = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdAsign: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    IdDocEv: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Encargado: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    Funcion: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    Division: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                    UnidadOrg: oEvent.getParameter("listItem").mAggregations.cells[5].mProperties.text,
                    NoEmp: oEvent.getParameter("listItem").mAggregations.cells[6].mProperties.text,
                    TipoUnif: oEvent.getParameter("listItem").mAggregations.cells[7].mProperties.text,
                    TallaGral: oEvent.getParameter("listItem").mAggregations.cells[8].mProperties.text,
                    FechaAsign: oEvent.getParameter("listItem").mAggregations.cells[9].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsAsig.some(function (item) {
                    return item.IdAsign === oItem.IdAsign;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsAsig = that.sharedData.selectedItemsAsig
                        .filter(function (item) {
                            return item.IdAsign !== oItem.IdAsign;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsAsig.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsAsig(that.sharedData.selectedItemsAsig.length);
            console.log(that.sharedData.selectedItemsAsig);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsAsig: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedAsig.setEnabled(read);
                this.sharedData.btnUpdateAsig.setEnabled(write);
                this.sharedData.btnDeleteAsig.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedAsig.setEnabled(read);
                this.sharedData.btnUpdateAsig.setEnabled(false);
                this.sharedData.btnDeleteAsig.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedAsig.setEnabled(false);
                this.sharedData.btnUpdateAsig.setEnabled(false);
                this.sharedData.btnDeleteAsig.setEnabled(false);
            }
        },
    };

    return AssignmentsControllerHelper;
});