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
    Button, ButtonType, Dialog, 
    MessageToast, Text, FlexBox,
    SelectDialog, StandardListItem,
    TableSelectDialog, ColumnListItem, Column
) {
    "use strict";

    var AspControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedTaInv: {},
            btnUpdateTaInv: {},
            btnDeleteTaInv: {},
            //!---CREATE---
            _oFgtInvSizesCreate: {},
            inpCreateIdInv: {},
            inpCreateArticulo: {},
            inpCreateIdTaGr: {},
            inpCreateTalla: {},
            inpCreateIdAsign: {},
            inpCreatePrecio: {},
            //!---UPDATE---
            _oFgtInvSizesUpdate: {},
            inpUpdateIdTaInv: {},
            inpUpdateIdInv: {},
            inpUpdateArticulo: {},
            inpUpdateIdTaGr: {},
            inpUpdateTalla: {},
            inpUpdateIdAsign: {},
            inpUpdatePrecio: {},
            //!---TABLA---
            tableTaInv: {},
            selectedItemsTaInv: [],
            cBoxTaInv: {},
            sFieldTaInv: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsTaInv: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[2] // VB2_3TaInv
                .getItems()[0];
            this.sharedData.tableTaInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[2] // VB2_3TaInv
                .getItems()[0] // tableTaInv
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchTaInv
            this.sharedData.cBoxTaInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[2] // VB2_3TaInv
                .getItems()[0] // tableTaInv
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldTaInv
            this.sharedData.sFieldTaInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[1] // VB2_2TaInv
                .getItems()[0]
                .getItems()[0]; // createButtonTaInv
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[1] // VB2_2TaInv
                .getItems()[0]
                .getItems()[1]; // updateButtonTaInv
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateTaInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[1] // VB2_2TaInv
                .getItems()[0]
                .getItems()[2]; // deleteButtonTaInv
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteTaInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[0] // VB2_1TaInv
                .getItems()[1]
                .getItems()[0]; // btnDownloadTaInv
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[0] // VB2_1TaInv
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedTaInv
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedTaInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[0] // VB2_1TaInv
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateTaInv
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[6] // Main->InvSizesView.fragment.xml
                .getItems()[0] // VB2_1TaInv
                .getItems()[1]
                .getItems()[3]; // btnUploadTaInv
            oComponent.setEnabled(write)

            this.enableMainBtnsTaInv([]);
        },

        //!---CREATE---
        setFgtCreateTaInv: function (oFragment) {
            this.sharedData._oFgtInvSizesCreate = oFragment;

            var oComponent = this.sharedData._oFgtInvSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateIdInv
            this.sharedData.inpCreateIdInv = oComponent;

            oComponent = this.sharedData._oFgtInvSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpCreateArticulo
            this.sharedData.inpCreateArticulo = oComponent;

            oComponent = this.sharedData._oFgtInvSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // inpCreateIdTaGr
            this.sharedData.inpCreateIdTaGr = oComponent;

            oComponent = this.sharedData._oFgtInvSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // Input
                .mAggregations
                .fields[0]; // inpCreateTalla
            this.sharedData.inpCreateTalla = oComponent;

            oComponent = this.sharedData._oFgtInvSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // Input
                .mAggregations
                .fields[0]; // inpCreateIdAsign
            this.sharedData.inpCreateIdAsign = oComponent;

            oComponent = this.sharedData._oFgtInvSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5] // Input
                .mAggregations
                .fields[0]; // inpCreatePrecio
            this.sharedData.inpCreatePrecio = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateTaInv: function (oFragment) {
            this.sharedData._oFgtInvSizesUpdate = oFragment;

            var oComponent = this.sharedData._oFgtInvSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpUpdateIdTaInv
            this.sharedData.inpUpdateIdTaInv = oComponent;
            this.sharedData.inpUpdateIdTaInv.setValue(
                this.sharedData.selectedItemsTaInv[0].IdTaInv
            );

            oComponent = this.sharedData._oFgtInvSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateHijos
            this.sharedData.inpUpdateIdInv = oComponent;
            this.sharedData.inpUpdateIdInv.setValue(
                this.sharedData.selectedItemsTaInv[0].IdInv
            );

            oComponent = this.sharedData._oFgtInvSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateArticulo
            this.sharedData.inpUpdateArticulo = oComponent;
            this.sharedData.inpUpdateArticulo.setValue(
                this.sharedData.selectedItemsTaInv[0].Articulo
            );

            oComponent = this.sharedData._oFgtInvSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateIdTaGr
            this.sharedData.inpUpdateIdTaGr = oComponent;
            this.sharedData.inpUpdateIdTaGr.setValue(
                this.sharedData.selectedItemsTaInv[0].IdTaGr
            );

            oComponent = this.sharedData._oFgtInvSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateTalla
            this.sharedData.inpUpdateTalla = oComponent;
            this.sharedData.inpUpdateTalla.setValue(
                this.sharedData.selectedItemsTaInv[0].Talla
            );

            oComponent = this.sharedData._oFgtInvSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // Input
                .mAggregations
                .fields[0]; // inpUpdateIdAsign
            this.sharedData.inpUpdateIdAsign = oComponent;
            this.sharedData.inpUpdateIdAsign.setValue(
                this.sharedData.selectedItemsTaInv[0].IdAsign
            );

            oComponent = this.sharedData._oFgtInvSizesUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // Input
                .mAggregations
                .fields[0]; // inpUpdatePrecio
            this.sharedData.inpUpdatePrecio = oComponent;
            this.sharedData.inpUpdatePrecio.setValue(
                this.sharedData.selectedItemsTaInv[0].Precio
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVTaInv: async function () {
            var results = await MainControllerHelper.getSetOData("TallasInvSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdTaInv: results[i].IdTaInv,
                        IdInv: results[i].IdInv,
                        Articulo: results[i].Articulo,
                        IdTaGr: results[i].IdTaGr,
                        Talla: results[i].Talla,
                        IdAsign: results[i].IdAsign,
                        Precio: results[i].Precio
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "TallasInventario.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVTaInv: function () {
            var results = this.sharedData.selectedItemsTaInv;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdTaInv: results[i].IdTaInv,
                        IdInv: results[i].IdInv,
                        Articulo: results[i].Articulo,
                        IdTaGr: results[i].IdTaGr,
                        Talla: results[i].Talla,
                        IdAsign: results[i].IdAsign,
                        Precio: results[i].Precio
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "TallasInventario.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVTaInv: function () {
            var columns = [
                {
                    IdTaInv: "",
                    IdInv: "",
                    Articulo: "",
                    IdTaGr: "",
                    Talla: "",
                    IdAsign: "",
                    Precio: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "TallasInventario.csv");
        },

        // Función para subir archivo CSV
        uploadCSVTaInv: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "TaInv");
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

                        MainControllerHelper.postMultipleOData("TALLAS_INV", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Talla(s) agregada(s) exitosamente!');
                                that.handleResetBtnConfirmTaInv();
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
        //!---INVENTARIO---
        // Función para seleccionar items de la lista Inventario
        handleValueHelpIdInv: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("InventarioSet");

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar un inventario',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldIdInv(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Articulo}",
                        description: "{IdInv}"
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        var sTitle = selectedItem.getTitle(),
                            sDesc = selectedItem.getDescription();
                        
                        // Procesar la selección en el input
                        that.sharedData.inpCreateIdInv.setValue(sDesc);
                        that.sharedData.inpCreateArticulo.setValue(sTitle);
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
        handleSearchFieldIdInv: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("InventarioSet");

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();
            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.IdInv) || regex.test(item.Articulo);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //!---TALLAS_GRAL---
        // Función para seleccionar items de la Tabla TallasGrl
        handleValueHelpIdTaGr: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("TallasGrlSet");

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
                    that.handleSearchFieldIdTaGr(dialog, oJsonModel)
                },
                confirm: function (oEvent) { // Función con evento para Confirmar selección
                    that.handleCloseIdTaGr(oEvent)
                },
            })

            dialog._oSearchField.setPlaceholder("Busque por ID, Talla o Tipo");

            // Asignar el modelo al SelectDialog
            dialog.setModel(oJsonModel);

            // Abrir el díalogo
            dialog.open();
        },

        // Función al Confirmar selección del item de la lista TallasInv
        handleCloseIdTaGr: function (oEvent) {
            var that = this,
                aContexts = oEvent.getParameter("selectedContexts"); // Parámetro del item seleccionado

            if (aContexts && aContexts.length) {
                // Formato completo para obtener el campo específico seleccionado
                var oIdTaGr = aContexts.map(function (oContext) { return oContext.getObject().IdTaGr; }).join(", ");
                var oTalla = aContexts.map(function (oContext) { return oContext.getObject().Talla; }).join(", ");
                // Set del valor obtenido al input específico
                that.sharedData.inpCreateIdTaGr.setValue(oIdTaGr);
                that.sharedData.inpCreateTalla.setValue(oTalla);
                // Mensaje del valor obtenido
                MessageToast.show("Eligió el ID " + oIdTaGr);
            }
        },

        // Función para buscar por filtro
        handleSearchFieldIdTaGr: async function (oDialog, oJsonModel) {
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

        //!---ASIGNACION---
        // Función para seleccionar items de la Tabla TallasInv
        handleValueHelpTaInv_IdAsign: async function () {
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
        onDeleteDialogTaInv: function () {
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

                        // Iterar todos los operadores seleccionados
                        that.sharedData.selectedItemsTaInv.forEach(element => {
                            toInAllDel.push({
                                // Ingresar el único item seleccionado
                                B1: element.IdTaInv,
                            })
                        })

                        MainControllerHelper.postMultipleOData("TALLAS_INV", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Talla(s) eliminada(s) éxitosamente!');
                                that.handleResetBtnConfirmTaInv();
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
        onChangeTaInv: function () {
            return this.sharedData.cBoxTaInv.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldTaInv: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("TallasInvSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeTaInv();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldTaInv.getValue();
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

            var oTable = this.sharedData.tableTaInv // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmTaInv: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("TallasInvSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tableTaInv;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------FILTER-----------------------
        // Función para filtrar datos de las tablas por columna
        handleFilterDialogConfirmTaInv: async function (oEvent) {
            var mParams = oEvent.getParameters(),  // Obtener los parámetros del diálogo de filtro
                aData = await MainControllerHelper.getSetOData("TallasInvSet"),  // Obtener los datos del JSON original
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

            var oTable = this.sharedData.tableTaInv; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmTaInv: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldTaInv.setValue("");
            this.handleSearchFieldTaInv();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsTaInv = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsTaInv([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemTaInv: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableTaInv.getItems();
                
                that.sharedData.selectedItemsTaInv = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdTaInv: item.getCells()[0].getText(),
                        IdInv: item.getCells()[1].getText(),
                        Articulo: item.getCells()[2].getText(),
                        IdTaGr: item.getCells()[3].getText(),
                        Talla: item.getCells()[4].getText(),
                        IdAsign: item.getCells()[5].getText(),
                        Precio: item.getCells()[6].getText(),
                    };
                    that.sharedData.selectedItemsTaInv.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsTaInv = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdTaInv: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    IdInv: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Articulo: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    IdTaGr: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    Talla: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                    IdAsign: oEvent.getParameter("listItem").mAggregations.cells[5].mProperties.text,
                    Precio: oEvent.getParameter("listItem").mAggregations.cells[6].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsTaInv.some(function (item) {
                    return item.IdTaInv === oItem.IdTaInv;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsTaInv = that.sharedData.selectedItemsTaInv
                        .filter(function (item) {
                            return item.IdTaInv !== oItem.IdTaInv;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsTaInv.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsTaInv(that.sharedData.selectedItemsTaInv.length);
            console.log(that.sharedData.selectedItemsTaInv);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsTaInv: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedTaInv.setEnabled(read);
                this.sharedData.btnUpdateTaInv.setEnabled(write);
                this.sharedData.btnDeleteTaInv.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedTaInv.setEnabled(read);
                this.sharedData.btnUpdateTaInv.setEnabled(false);
                this.sharedData.btnDeleteTaInv.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedTaInv.setEnabled(false);
                this.sharedData.btnUpdateTaInv.setEnabled(false);
                this.sharedData.btnDeleteTaInv.setEnabled(false);
            }
        },
    };

    return AspControllerHelper;
});