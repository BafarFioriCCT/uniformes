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

    var AssigSizesControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedTaAsig: {},
            btnDeleteTaAsig: {},
            //!---CREATE---
            _oFgtAssigSizesCreate: {},
            inpCreateIdAsign: {},
            //!---TABLA---
            tableTaAsig: {},
            selectedItemsTaAsig: [],
            cBoxTaAsig: {},
            sFieldTaSig: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsTaAsig: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[2] // VB2_3TaAsig
                .getItems()[0];
            this.sharedData.tableTaAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[2] // VB2_3TaAsig
                .getItems()[0] // tableTaAsig
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // cBoxTaAsig
            this.sharedData.cBoxTaAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[2] // VB2_3TaAsig
                .getItems()[0] // tableTaAsig
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // sFieldTaSig
            this.sharedData.sFieldTaSig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[1] // VB2_2TaAsig
                .getItems()[0]
                .getItems()[0]; // createButtonTaAsig
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[1] // VB2_2TaAsig
                .getItems()[0]
                .getItems()[1]; // deleteButtonTaAsig
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteTaAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[0] // VB2_1TaAsig
                .getItems()[1]
                .getItems()[0]; // btnDownloadTaAsig
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[0] // VB2_1TaAsig
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedTaAsig
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedTaAsig = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[0] // VB2_1TaAsig
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateTaAsig
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[8] // Main->AssigSizesView.fragment.xml
                .getItems()[0] // VB2_1TaAsig
                .getItems()[1]
                .getItems()[3]; // btnUploadTaAsig
            oComponent.setEnabled(write)

            this.enableMainBtnsTaAsig([]);
        },

        //!---CREATE---
        setFgtCreateTaAsig: function (oFragment) {
            this.sharedData._oFgtAssigSizesCreate = oFragment;

            var oComponent = this.sharedData._oFgtAssigSizesCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateIdAsign
            this.sharedData.inpCreateIdAsign = oComponent;
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVTaAsig: async function () {
            var results = await MainControllerHelper.getSetOData("TallasAsigSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdTaAs: results[i].IdTaAs,
                        IdAsign: results[i].IdAsign,
                        Division: results[i].Division,
                        NoEmp: results[i].NoEmp,
                        NombreEmp: results[i].NombreEmp,
                        Uniforme: results[i].Uniforme,
                        Pantalon: results[i].Pantalon,
                        Playera: results[i].Playera,
                        Calzado: results[i].Calzado,
                        Chamarra: results[i].Chamarra,
                        Mandil: results[i].Mandil,
                        Bata: results[i].Bata,
                        Faja: results[i].Faja,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "TallasAsign.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVTaAsig: function () {
            var results = this.sharedData.selectedItemsTaAsig;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdTaAs: results[i].IdTaAs,
                        IdAsign: results[i].IdAsign,
                        Division: results[i].Division,
                        NoEmp: results[i].NoEmp,
                        NombreEmp: results[i].NombreEmp,
                        Uniforme: results[i].Uniforme,
                        Pantalon: results[i].Pantalon,
                        Playera: results[i].Playera,
                        Calzado: results[i].Calzado,
                        Chamarra: results[i].Chamarra,
                        Mandil: results[i].Mandil,
                        Bata: results[i].Bata,
                        Faja: results[i].Faja,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "TallasAsign.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVTaAsig: function () {
            var columns = [
                {
                    IdTaAs: "",
                    IdAsign: "",
                    Division: "",
                    NoEmp: "",
                    NombreEmp: "",
                    Uniforme: "",
                    Pantalon: "",
                    Playera: "",
                    Calzado: "",
                    Chamarra: "",
                    Mandil: "",
                    Bata: "",
                    Faja: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "TallasAsign.csv");
        },

        // Función para subir CSV
        uploadCSVTaAsig: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "TallasAsig");
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

                        MainControllerHelper.postMultipleOData("TALLAS_ASI", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Tallas(s) agregada(s) exitosamente!');
                                that.handleResetBtnConfirmTaAsig();
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
        onDeleteDialogTaAsig: function () {
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
                        that.sharedData.selectedItemsTaAsig.forEach(item => {
                            toInAllDel.push({ B1: item.IdTaAs })
                        });
                        MainControllerHelper.postMultipleOData("TALLAS_ASI", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Talla(s) eliminada(s) éxitosamente!');
                                that.handleResetBtnConfirmTaAsig();
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
        onChangeTaAsig: function () {
            return this.sharedData.cBoxTaAsig.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldTaAsig: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("TallasAsigSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeTaAsig();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldTaSig.getValue();
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

            var oTable = this.sharedData.tableTaAsig // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmTaAsig: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("TallasAsigSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tableTaAsig;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------FILTER-----------------------
        // Función para filtrar datos de las tablas por columna
        handleFilterDialogConfirmTaAsig: async function (oEvent) {
            var mParams = oEvent.getParameters(),  // Obtener los parámetros del diálogo de filtro
                aData = await MainControllerHelper.getSetOData("TallasAsigSet"),  // Obtener los datos del JSON original
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

            var oTable = this.sharedData.tableTaAsig; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmTaAsig: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldTaSig.setValue("");
            this.handleSearchFieldTaAsig();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsTaAsig = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsTaAsig([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemTaAsig: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableTaAsig.getItems();

                that.sharedData.selectedItemsTaAsig = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdTaAs: item.getCells()[0].getText(),
                        IdAsign: item.getCells()[1].getText(),
                        Division: item.getCells()[2].getText(),
                        NoEmp: item.getCells()[3].getText(),
                        NombreEmp: item.getCells()[4].getText(),
                        Uniforme: item.getCells()[5].getText(),
                        Pantalon: item.getCells()[6].getText(),
                        Playera: item.getCells()[7].getText(),
                        Calzado: item.getCells()[8].getText(),
                        Chamarra: item.getCells()[9].getText(),
                        Mandil: item.getCells()[10].getText(),
                        Bata: item.getCells()[11].getText(),
                        Faja: item.getCells()[12].getText(),
                    };
                    that.sharedData.selectedItemsTaAsig.push(oItem);
                });
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsTaAsig = []; // Limpiar el array de items seleccionados
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdTaAs: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    IdAsign: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Division: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    NoEmp: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    NombreEmp: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                    Uniforme: oEvent.getParameter("listItem").mAggregations.cells[5].mProperties.text,
                    Pantalon: oEvent.getParameter("listItem").mAggregations.cells[6].mProperties.text,
                    Playera: oEvent.getParameter("listItem").mAggregations.cells[7].mProperties.text,
                    Calzado: oEvent.getParameter("listItem").mAggregations.cells[8].mProperties.text,
                    Chamarra: oEvent.getParameter("listItem").mAggregations.cells[9].mProperties.text,
                    Mandil: oEvent.getParameter("listItem").mAggregations.cells[10].mProperties.text,
                    Bata: oEvent.getParameter("listItem").mAggregations.cells[11].mProperties.text,
                    Faja: oEvent.getParameter("listItem").mAggregations.cells[12].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsTaAsig.some(function (item) {
                    return item.IdTaAs === oItem.IdTaAs;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsTaAsig = that.sharedData.selectedItemsTaAsig
                        .filter(function (item) {
                            return item.IdTaAs !== oItem.IdTaAs;
                        });
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsTaAsig.push(oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsTaAsig(that.sharedData.selectedItemsTaAsig.length);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsTaAsig: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            this.sharedData.bDownSelectedTaAsig.setEnabled(length > 0 && read);
            this.sharedData.btnDeleteTaAsig.setEnabled(length > 0 && write);
        },
    };

    return AssigSizesControllerHelper;
});