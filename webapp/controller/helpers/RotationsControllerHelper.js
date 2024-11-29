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
    TableSelectDialog, ColumnListItem, Column
) {
    "use strict";

    var RotationsControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedRot: {},
            btnUpdateRot: {},
            btnDeleteRot: {},
            //!---CREATE---
            _oFgtRotationsCreate: {},
            inpCreateIdAsign: {},
            inpCreateCuenta: {},
            //!---UPDATE---
            _oFgtRotationsUpdate: {},
            inpUpdateIdRt: {},
            inpUpdateIdAsign: {},
            inpUpdateFechaIngreso: {},
            inpUpdateNoEmp: {},
            inpUpdateTipoUnif: {},
            inpUpdateFechaEgreso: {},
            inpUpdateCobroUnif: {},
            inpUpdateCantidad: {},
            inpUpdateCuenta: {},
            //!---TABLA---
            tableRot: {},
            selectedItemsRot: [],
            cBoxRot: {},
            sFieldRot: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFgtComponentsRot: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[2] // VB2_3Rot
                .getItems()[0];
            this.sharedData.tableRot = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[2] // VB2_3Rot
                .getItems()[0] // tableRot
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // cBoxRot
            this.sharedData.cBoxRot = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[2] // VB2_3Rot
                .getItems()[0] // tableRot
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // sFieldRot
            this.sharedData.sFieldRot = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[1] // VB2_2Rot
                .getItems()[0]
                .getItems()[0]; // btnCreateRot
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[1] // VB2_2Rot
                .getItems()[0]
                .getItems()[1]; // btnUpdateRot
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateRot = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[1] // VB2_2Rot
                .getItems()[0]
                .getItems()[2]; // btnDeleteRot
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteRot = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[0] // VB2_1Rot
                .getItems()[1]
                .getItems()[0]; // bDownloadRot
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[0] // VB2_1Rot
                .getItems()[1]
                .getItems()[1]; // bDownSelectedRot
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedRot = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[0] // VB2_1Rot
                .getItems()[1]
                .getItems()[2]; // bDownloadTemplateRot
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[12] // Main->RotationsView.fragment.xml
                .getItems()[0] // VB2_1Rot
                .getItems()[1]
                .getItems()[3]; // bUploadRot
            oComponent.setEnabled(write)

            this.enableMainBtnsRot([]);
        },

        //!---CREATE---
        setFgtCreateRot: function (oFragment) {
            this.sharedData._oFgtRotationsCreate = oFragment;

            var oComponent = this.sharedData._oFgtRotationsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateIdAsign
            this.sharedData.inpCreateIdAsign = oComponent;

            oComponent = this.sharedData._oFgtRotationsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpCreateCuenta
            this.sharedData.inpCreateCuenta = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateRot: function (oFragment) {
            this.sharedData._oFgtRotationsUpdate = oFragment;

            var oComponent = this.sharedData._oFgtRotationsUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateIdRt
            this.sharedData.inpUpdateIdRt = oComponent;
            this.sharedData.inpUpdateIdRt.setValue(
                this.sharedData.selectedItemsRot[0].IdRt
            );

            oComponent = this.sharedData._oFgtRotationsUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateIdAsign
            this.sharedData.inpUpdateIdAsign = oComponent;
            this.sharedData.inpUpdateIdAsign.setValue(
                this.sharedData.selectedItemsRot[0].IdAsign
            );

            oComponent = this.sharedData._oFgtRotationsUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateFechaIngreso
            this.sharedData.inpUpdateFechaIngreso = oComponent;
            this.sharedData.inpUpdateFechaIngreso.setValue(
                this.sharedData.selectedItemsRot[0].FechaIngreso
            );

            oComponent = this.sharedData._oFgtRotationsUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateNoEmp
            this.sharedData.inpUpdateNoEmp = oComponent;
            this.sharedData.inpUpdateNoEmp.setValue(
                this.sharedData.selectedItemsRot[0].NoEmp
            );

            oComponent = this.sharedData._oFgtRotationsUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateTipoUnif
            this.sharedData.inpUpdateTipoUnif = oComponent;
            this.sharedData.inpUpdateTipoUnif.setValue(
                this.sharedData.selectedItemsRot[0].TipoUnif
            );

            oComponent = this.sharedData._oFgtRotationsUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateFechaEgreso
            this.sharedData.inpUpdateFechaEgreso = oComponent;
            this.sharedData.inpUpdateFechaEgreso.setValue(
                this.sharedData.selectedItemsRot[0].FechaEgreso
            );

            oComponent = this.sharedData._oFgtRotationsUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateCobroUnif
            this.sharedData.inpUpdateCobroUnif = oComponent;
            this.sharedData.inpUpdateCobroUnif.setValue(
                this.sharedData.selectedItemsRot[0].CobroUnif
            );

            oComponent = this.sharedData._oFgtRotationsUpdate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateCantidad
            this.sharedData.inpUpdateCantidad = oComponent;
            this.sharedData.inpUpdateCantidad.setValue(
                this.sharedData.selectedItemsRot[0].Cantidad
            );

            oComponent = this.sharedData._oFgtRotationsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // Input
                .mAggregations
                .fields[0]; // inpUpdateCuenta
            this.sharedData.inpUpdateCuenta = oComponent;
            console.log(oComponent)
            this.sharedData.inpUpdateCuenta.setValue(
                this.sharedData.selectedItemsRot[0].Cuenta
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVRot: async function () {
            var results = await MainControllerHelper.getSetOData("RotTempSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdRt: results[i].IdRt,
                        IdAsign: results[i].IdAsign,
                        FechaIngreso: formatter.oDateFormat.format(
                            formatter.formatDateFromTimestamp(results[i].FechaIngreso)
                        ),
                        NoEmp: results[i].NoEmp,
                        TipoUnif: results[i].TipoUnif,
                        FechaEgreso: formatter.oDateFormat.format(
                            formatter.formatDateFromTimestamp(results[i].FechaEgreso)
                        ),
                        CobroUnif: results[i].CobroUnif,
                        Cantidad: results[i].Cantidad,
                        Cuenta: results[i].Cuenta,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Rotaciones.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVRot: function () {
            var results = this.sharedData.selectedItemsRot;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdRt: results[i].IdRt,
                        IdAsign: results[i].IdAsign,
                        FechaIngreso: results[i].FechaIngreso,
                        NoEmp: results[i].NoEmp,
                        TipoUnif: results[i].TipoUnif,
                        FechaEgreso: results[i].FechaEgreso,
                        CobroUnif: results[i].CobroUnif,
                        Cantidad: results[i].Cantidad,
                        Cuenta: results[i].Cuenta,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Rotaciones.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVRot: function () {
            var columns = [
                {
                    IdRt: "",
                    IdAsign: "",
                    FechaIngreso: "",
                    NoEmp: "",
                    TipoUnif: "",
                    FechaEgreso: "",
                    CobroUnif: "",
                    Cantidad: "",
                    Cuenta: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Rotaciones.csv");
        },

        uploadCSVRot: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Rotaciones");
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
                        
                        MainControllerHelper.postMultipleOData("ROT_TEMP", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Rotaciones agregadas exitosamente!');
                                that.handleResetBtnConfirmRot();
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
        // Función para seleccionar items de la Tabla Asignacion
        handleValueHelpIdAsign: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("AsignacionSet");
            oData.forEach(item => {
                item.FechaAsign = formatter.formatDateFromTimestamp(item.FechaAsign);
            });

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new TableSelectDialog({
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
                            text: "ID Documento"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "ID Talla Inventario"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Encargado"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Nombre"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Función"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "División"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Unidad Organizativa"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "N° Empleado"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Tipo Uniforme"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Talla General"
                        }),
                    }),
                    new Column({
                        header: new Text({
                            text: "Fecha Asignación"
                        }),
                    }),
                ],
                items: { // Path de los items para la tabla
                    path: "/results", // Raíz del JSONModel
                    template: new ColumnListItem({
                        cells: [ // Celdas con sus textos
                            new Text({
                                text: "{IdAsign}"
                            }),
                            new Text({
                                text: "{IdDocEv}"
                            }),
                            new Text({
                                text: "{IdTaInv}"
                            }),
                            new Text({
                                text: "{Encargado}"
                            }),
                            new Text({
                                text: "{Nombre}"
                            }),
                            new Text({
                                text: "{Funcion}"
                            }),
                            new Text({
                                text: "{Division}"
                            }),
                            new Text({
                                text: "{UnidadOrg}"
                            }),
                            new Text({
                                text: "{NoEmp}"
                            }),
                            new Text({
                                text: "{TipoUnif}"
                            }),
                            new Text({
                                text: "{TallaGral}"
                            }),
                            new Text({
                                text: "{ path: 'FechaAsign', type: 'sap.ui.model.type.Date', formatOptions: {UTC: true, pattern: 'dd.MM.yyyy' } }"
                            })
                        ]
                    })
                },
                search: function () {
                    that.handleSearchFieldIdAsign(dialog, oJsonModel)
                },
                confirm: function (oEvent) { // Función con evento para Confirmar selección
                    that.handleCloseIdAsign(oEvent)
                },
            })

            dialog._oSearchField.setPlaceholder("Busque por N° Empleado, Tipo Uniforme o Talla General");

            // Asignar el modelo al SelectDialog
            dialog.setModel(oJsonModel);

            // Abrir el díalogo
            dialog.open();
        },

        // Función al Confirmar selección del item de la lista TallasInv
        handleCloseIdAsign: function (oEvent) {
            var that = this,
                aContexts = oEvent.getParameter("selectedContexts"); // Parámetro del item seleccionado

            if (aContexts && aContexts.length) {
                // Formato completo para obtener el campo específico seleccionado
                var oIdAsign = aContexts.map(function (oContext) { return oContext.getObject().IdAsign; }).join(", ");
                // Set del valor obtenido al input específico
                that.sharedData.inpCreateIdAsign.setValue(oIdAsign);
                // Mensaje del valor obtenido
                MessageToast.show("Eligió el ID " + oIdAsign);
            }
        },

        // Función para buscar por filtro
        handleSearchFieldIdAsign: async function (oDialog, oJsonModel) {
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();

            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Referencia directa al array results
            oJsonModel = oJsonModel.getData().results;

            // Filtrar los datos basados en la búsqueda
            var filteredData = oJsonModel.filter(function (item) {
                return regex.test(item.NoEmp) || regex.test(item.TipoUnif) || regex.test(item.TallaGral);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //?-----------------------DELETE-----------------------
        // Función para eliminar masivamente registros seleccionados
        onDeleteDialogRot: function () {
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
                        that.sharedData.selectedItemsRot.forEach(item => {
                            toInAllDel.push({ B1: item.IdRt })
                        });
                        MainControllerHelper.postMultipleOData("ROT_TEMP", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Rotacion(es) eliminada(s) éxitosamente!');
                                that.handleResetBtnConfirmRot();
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
        onChangeRot: function () {
            return this.sharedData.cBoxRot.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldRot: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("RotTempSet");
            filteredData.forEach(item => {
                item.FechaIngreso = formatter.formatDateFromTimestamp(item.FechaIngreso);
                item.FechaEgreso = formatter.formatDateFromTimestamp(item.FechaEgreso);
            });

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeRot();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldRot.getValue();
            if (comboBoxValue) {
                // Se hace un filtro del OData nuevo, junto retornando
                // el regex con el valor del ComboBox elegido por el usuario
                if (comboBoxValue == "FechaIngreso") {
                    var regex = new RegExp(searchFieldValue);

                    filteredData = filteredData.filter(function (item) {
                        // Filtra por la fecha formateada temporalmente por dd.MM.yyyy
                        return regex.test(
                            formatter.oDateFormat.format(item.FechaIngreso)
                        );
                    });
                } else if (comboBoxValue == "FechaEgreso") {
                    var regex = new RegExp(searchFieldValue);

                    filteredData = filteredData.filter(function (item) {
                        // Filtra por la fecha formateada temporalmente por dd.MM.yyyy
                        return regex.test(
                            formatter.oDateFormat.format(item.FechaEgreso)
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

            var oTable = this.sharedData.tableRot // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmRot: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("RotTempSet"); // Orden ascendente o descendente
            aData.forEach(item => {
                item.FechaIngreso = formatter.formatDateFromTimestamp(item.FechaIngreso);
                item.FechaEgreso = formatter.formatDateFromTimestamp(item.FechaEgreso);
            });

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

            var oTable = this.sharedData.tableRot;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------FILTER-----------------------
        // Función para filtrar datos de las tablas por columna
        handleFilterDialogConfirmRot: async function (oEvent) {
            var mParams = oEvent.getParameters(),  // Obtener los parámetros del diálogo de filtro
                aData = await MainControllerHelper.getSetOData("RotTempSet"),  // Obtener los datos del JSON original
                filteredData = aData;  // Clonar el array original para filtrar
            filteredData.forEach(item => {
                item.FechaIngreso = formatter.formatDateFromTimestamp(item.FechaIngreso);
                item.FechaEgreso = formatter.formatDateFromTimestamp(item.FechaEgreso);
            });

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

            var oTable = this.sharedData.tableRot; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmRot: async function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldRot.setValue("");
            this.handleSearchFieldRot();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsRot = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsRot([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemRot: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableRot.getItems();

                that.sharedData.selectedItemsRot = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdRt: item.getCells()[0].getText(),
                        IdAsign: item.getCells()[1].getText(),
                        FechaIngreso: item.getCells()[2].getText(),
                        NoEmp: item.getCells()[3].getText(),
                        TipoUnif: item.getCells()[4].getText(),
                        FechaEgreso: item.getCells()[5].getText(),
                        CobroUnif: item.getCells()[6].getText(),
                        Cantidad: item.getCells()[7].getText(),
                        Cuenta: item.getCells()[8].getText(),
                    };
                    that.sharedData.selectedItemsRot.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsRot = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdRt: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    IdAsign: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    FechaIngreso: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    NoEmp: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    TipoUnif: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                    FechaEgreso: oEvent.getParameter("listItem").mAggregations.cells[5].mProperties.text,
                    CobroUnif: oEvent.getParameter("listItem").mAggregations.cells[6].mProperties.text,
                    Cantidad: oEvent.getParameter("listItem").mAggregations.cells[7].mProperties.text,
                    Cuenta: oEvent.getParameter("listItem").mAggregations.cells[8].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsRot.some(function (item) {
                    return item.IdRt === oItem.IdRt;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsRot = that.sharedData.selectedItemsRot
                        .filter(function (item) {
                            return item.IdRt !== oItem.IdRt;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsRot.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsRot(that.sharedData.selectedItemsRot.length);
            console.log(that.sharedData.selectedItemsRot);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsRot: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedRot.setEnabled(read);
                this.sharedData.btnUpdateRot.setEnabled(write);
                this.sharedData.btnDeleteRot.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedRot.setEnabled(read);
                this.sharedData.btnUpdateRot.setEnabled(false);
                this.sharedData.btnDeleteRot.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedRot.setEnabled(false);
                this.sharedData.btnUpdateRot.setEnabled(false);
                this.sharedData.btnDeleteRot.setEnabled(false);
            }
        },
    };

    return RotationsControllerHelper;
});