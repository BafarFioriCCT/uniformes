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

    var AspControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedAsp: {},
            btnDeleteAsp: {},
            //!---CREATE---
            _oFgtAspCreate: {},
            navConCreate: {},
            tableOpe: {},
            cBoxOpe: {},
            sFieldOpe: {},
            tablePaq: {},
            cBoxPaq: {},
            sFieldPaq: {},
            selectedItemsAspOpe: [],
            selectedItemsAspPaq: [],
            //!---TABLA---
            tableAsp: {},
            selectedItemsAsp: [],
            cBoxAsp: {},
            sFieldAsp: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsAsp: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;
                
            var oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[2] // VB2_3Asp
                .getItems()[0];
            this.sharedData.tableAsp = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[2] // VB2_3Asp
                .getItems()[0] // tableAsp
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchAsp
            this.sharedData.cBoxAsp = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[2] // VB2_3Asp
                .getItems()[0] // tableAsp
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldAsp
            this.sharedData.sFieldAsp = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[1] // VB2_2Asp
                .getItems()[0]
                .getItems()[0]; // createButtonAsp
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[1] // VB2_2Asp
                .getItems()[0]
                .getItems()[1]; // deleteButtonAsp
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteAsp = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[0] // VB2_1Asp
                .getItems()[1]
                .getItems()[0]; // btnDownloadAsp
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[0] // VB2_1Asp
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedAsp
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedAsp = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[0] // VB2_1Asp
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateAsp
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[3] // Main->AspView.fragment.xml
                .getItems()[0] // VB2_1Asp
                .getItems()[1]
                .getItems()[3]; // btnUploadAsp
            oComponent.setEnabled(write)

            this.enableMainBtnsAsp([]);
        },

        //!---CREATE---
        setFtgCreateAsp: function (_oFgtAspCreate) {
            this.sharedData._oFgtAspCreate = _oFgtAspCreate;

            this.sharedData.navConCreate = this.sharedData._oFgtAspCreate.getItems()[0]; //NavContainer

            this.sharedData.tableOpe = this.sharedData.navConCreate
                .mAggregations
                .pages[0] //P1
                .mAggregations
                .content[1]; //tableOpe
            this.sharedData.cBoxOpe = this.sharedData.tableOpe
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchOpe
            this.sharedData.sFieldOpe = this.sharedData.tableOpe
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldOpe

            this.sharedData.tablePaq = this.sharedData.navConCreate
                .mAggregations
                .pages[1] //P2
                .mAggregations
                .content[1]; //tablePaq
            this.sharedData.cBoxPaq = this.sharedData.tablePaq
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchPaq
            this.sharedData.sFieldPaq = this.sharedData.tablePaq
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldPaq
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVAsp: async function () {
            var results = await MainControllerHelper.getSetOData("AsigPaqOpSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdApo: results[i].IdApo,
                        Funcion: results[i].Funcion,
                        DenomFunc: results[i].DenomFunc,
                        OpFuncion: results[i].OpFuncion,
                        TipoUnif: results[i].TipoUnif
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "AsignacionesPaqOp.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVAsp: function () {
            var results = this.sharedData.selectedItemsAsp;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdApo: results[i].IdApo,
                        Funcion: results[i].Funcion,
                        DenomFunc: results[i].DenomFunc,
                        OpFuncion: results[i].OpFuncion,
                        TipoUnif: results[i].TipoUnif
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "AsignacionesPaqOp.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVAsp: function () {
            var columns = [
                {
                    IdApo: "",
                    Funcion: "",
                    DenomFunc: "",
                    OpFuncion: "",
                    TipoUnif: ""
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "AsignacionesPaqOp.csv");
        },

        // Función para subir CSV
        uploadCSVAsp: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "AsigPaqOp");
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

                        MainControllerHelper.postMultipleOData("AS_PAOP", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Asignacion(es) agregado(s) exitosamente!');
                                that.handleResetBtnConfirmAsp();
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
        // Función para abrir díalogo del NavBar
        onCreateDialogAsp: function (oComboBoxModelSearch) {
            var that = this;

            that.setODataCreateTables();

            // Abrir un componente nuevo, agrega una capa más en nuestro fragmento
            // Por lo cuál es necesario destruirlo al cerrarlo
            // Para evitar duplicados
            var dialog = new Dialog({
                title: 'Agregar nueva asignación',
                type: 'Message',
                contentWidth: '100%',
                contentHeight: '80%',
                // El contenido será el subfragmento cargado al abrir este Dialog
                content: [
                    that.sharedData._oFgtAspCreate
                ],
                beginButton: new Button({
                    text: 'Agregar',
                    enabled: false,
                    press: function () {
                        var oToInAll = [];
                        // Iterar todos los operadores seleccionados
                        that.sharedData.selectedItemsAspOpe.forEach(elementOpe => {
                            oToInAll.push({
                                // Ingresar el único paquete seleccionado
                                B1: that.sharedData.selectedItemsAspPaq[0].Funcion,
                                B2: elementOpe.OpFuncion,
                            })
                        });

                        MainControllerHelper.postMultipleOData("AS_PAOP", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Asignaciones agregadas exitosamente!');
                                that.handleResetBtnConfirmAsp();
                            })
                            .catch(() => {
                                // Aquí hubo un error, puedes manejar el error
                                MessageToast.show("Error al guardar el registro");
                            });

                        dialog.close();
                        dialog.destroy();
                    }
                }),
                // Cerrar y destruir el Dialog
                endButton: new Button({
                    text: 'Cancelar',
                    press: function () {
                        // Se limpian las selecciones hechas anteriormente en las tablas
                        that.sharedData.selectedItemsAspOpe = [];
                        that.sharedData.selectedItemsAspPaq = [];

                        dialog.close();
                        dialog.destroy();
                    }
                }),
            });

            // Agregar el modelo Create para los ComboBox
            dialog.setModel(oComboBoxModelSearch, "oComboBoxModelSearch");

            // Evento para cambiar el Enabled del beginButton
            var oBeginButton = dialog.getBeginButton();
            that.enableCreateBeginBtnAsp(oBeginButton);

            // Abrir el díalogo
            dialog.open();
        },

        // Función para habilitar con attachSelectionChange el BeginButton
        enableCreateBeginBtnAsp: function (oBeginButton) {
            var that = this;
            // Detectar el evento 'selectionChange' en la segunda tabla
            that.sharedData.tablePaq.attachSelectionChange(function () {
                // Obtener la selección
                var aSelectedItems = that.sharedData.tablePaq.getSelectedItems();

                // Habilitar el botón si solo hay un ítem seleccionado
                if (aSelectedItems.length === 1) {
                    oBeginButton.setEnabled(true);
                } else {
                    oBeginButton.setEnabled(false);
                }
            });
        },

        // Función para setear las tablas correspondientes, ya que son diferentes a las View
        setODataCreateTables: async function () {
            var aDataOpe = await MainControllerHelper.getSetOData("PaqOpSet"),
                aDataPaq = await MainControllerHelper.getSetOData("PaqueteSet"),
                filteredDataPaq = aDataPaq;  // Clonar el array original para filtrar

            // Aplicar el filtro a los datos
            filteredDataPaq = filteredDataPaq.filter(function (item) {
                return item["Hijos"] === "SI";  // Filtrar información por una columna
            });

            var oModelOpe = new JSONModel();
            oModelOpe.setData({ PaqOpSet: aDataOpe });
            var oModelPaq = new JSONModel();
            oModelPaq.setData({ PaqueteSet: filteredDataPaq });

            this.sharedData.tableOpe.setModel(oModelOpe, "oDataModel");
            this.sharedData.tableOpe.bindItems({
                path: "oDataModel>/PaqOpSet",
                template: this.sharedData.tableOpe.getBindingInfo("items").template  // Mantener el template original
            });

            this.sharedData.tablePaq.setModel(oModelPaq, "oDataModel");
            this.sharedData.tablePaq.bindItems({
                path: "oDataModel>/PaqueteSet",
                template: this.sharedData.tablePaq.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //!---NAVBAR---
        // Función para manejar el NavBar
        handleNavAsp: function (evt) {
            var navCon = this.sharedData._oFgtAspCreate.getItems()[0]; //NavContainer
            var target = evt.getSource().data("target");  // Obtiene el ID de la página destino desde el botón
            if (target) {
                // Encuentra la página objetivo dentro de navCon
                var pages = navCon.mAggregations.pages;

                // Navega a la página objetivo con una transición de deslizamiento
                pages.forEach(page => {
                    // Obtener todo el ID del objeto, dado que sólo el ID real es de dos carácteres,
                    // Lo que hará es hacer un substring desde el caracter final menos dos posiciones
                    // hasta el final del string completo, verificando si es igual al target del evento seleccionado
                    if (page.getId().substring(page.getId().length - 2, page.getId().length) == target) {
                        navCon.to(page, "slide");
                    }
                })
            }
        },

        //!---OPERADOR---
        // Función para seleccionar items de la tabla Operador
        onSelectedItemAspOpe: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems();

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                var aItems = that.sharedData.tableOpe.getItems();

                that.sharedData.selectedItemsAspOpe = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        OpFuncion: item.getCells()[0].getText(),
                        TipoUnif: item.getCells()[1].getText(),
                        Paquete: item.getCells()[2].getText(),
                        Descripcion: item.getCells()[3].getText(),
                    };
                    that.sharedData.selectedItemsAspOpe.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsAspOpe = []; // Limpiar el array de items seleccionados

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
                var bItemExists = that.sharedData.selectedItemsAspOpe.some(function (item) {
                    return item.OpFuncion === oItem.OpFuncion;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsAspOpe = that.sharedData.selectedItemsAspOpe
                        .filter(function (item) {
                            return item.OpFuncion !== oItem.OpFuncion;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsAspOpe.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            var btnP2 = this.sharedData._oFgtAspCreate.getItems()[1] //VBox
                .mAggregations.items[0].mAggregations.items[1]; // btnP2
            btnP2.setEnabled(that.sharedData.selectedItemsAspOpe.length > 0);

            console.log(that.sharedData.selectedItemsAspOpe);
        },

        // Función del ComboBox de la tabla tableOpe
        onChangeAspOpe: function () {
            return this.sharedData.cBoxOpe.getSelectedKey();
        },

        // Función para buscar por filtro y ComboBox
        handleSearchFieldAspOpe: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("PaqOpSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeAspOpe();
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

        //!---PAQUETE---
        // Función para seleccionar items de la tabla Paquete
        onSelectedItemAspPaq: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems();

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                var aItems = that.sharedData.tablePaq.getItems();

                that.sharedData.selectedItemsAspPaq = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        Funcion: item.getCells()[0].getText(),
                        Hijos: item.getCells()[1].getText(),
                        Uniforme: item.getCells()[2].getText(),
                        TipoUniforme: item.getCells()[3].getText(),
                        Sociedad: item.getCells()[4].getText(),
                        DenomFunc: item.getCells()[5].getText(),
                        NomPaquete: item.getCells()[6].getText(),
                        Descripcion: item.getCells()[7].getText(),
                    };
                    that.sharedData.selectedItemsAspPaq.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsAspPaq = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    Funcion: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Hijos: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Uniforme: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    TipoUniforme: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    Sociedad: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                    DenomFunc: oEvent.getParameter("listItem").mAggregations.cells[5].mProperties.text,
                    NomPaquete: oEvent.getParameter("listItem").mAggregations.cells[6].mProperties.text,
                    Descripcion: oEvent.getParameter("listItem").mAggregations.cells[7].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsAspPaq.some(function (item) {
                    return item.Funcion === oItem.Funcion;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsAspPaq = that.sharedData.selectedItemsAspPaq
                        .filter(function (item) {
                            return item.Funcion !== oItem.Funcion;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsAspPaq.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            console.log(that.sharedData.selectedItemsAspPaq);
        },

        // Función del ComboBox de la tabla tablePaq
        onChangeAspPaq: function () {
            return this.sharedData.cBoxPaq.getSelectedKey();
        },

        // Función para buscar por filtro y ComboBox
        handleSearchFieldAspPaq: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("PaqueteSet");
            // Aplicar el filtro por defecto que sería sólo Hijos = SI
            filteredData = filteredData.filter(function (item) {
                return item["Hijos"] === "SI";  // Filtrar información por una columna
            });

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeAspPaq();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldPaq.getValue();
            if (comboBoxValue) {
                // Crear una expresión regular que ignore mayúsculas/minúsculas 
                // y que busque coincidencias parciales del valor del SearchField
                var regex = new RegExp(searchFieldValue, "i");

                // Se hace un filtro del OData nuevo, junto retornando
                // el regex con el valor del ComboBox elegido por el usuario
                filteredData = filteredData.filter(function (item) {
                    item["Hijos"] === "SI"
                    return regex.test(item[comboBoxValue]);
                });
            }

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: filteredData });

            var oTable = this.sharedData.tablePaq // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------DELETE-----------------------
        // Función para eliminar masivamente registros seleccionados
        onDeleteDialogAsp: function () {
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
                        that.sharedData.selectedItemsAsp.forEach(elementAsp => {
                            toInAllDel.push({
                                // Ingresar el único paquete seleccionado
                                B1: elementAsp.IdApo,
                                B2: elementAsp.Funcion,
                                B3: elementAsp.OpFuncion,
                            })
                        })

                        MainControllerHelper.postMultipleOData("AS_PAOP", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Asignación(es) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmAsp();
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
        onChangeAsp: function () {
            return this.sharedData.cBoxAsp.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldAsp: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("AsigPaqOpSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeAsp();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldAsp.getValue();
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

            var oTable = this.sharedData.tableAsp // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmAsp: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("AsigPaqOpSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tableAsp;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmAsp: async function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldAsp.setValue("");
            this.handleSearchFieldAsp();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsAsp = [];
            this.sharedData.selectedItemsAspOpe = [];
            this.sharedData.selectedItemsAspPaq = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsAsp([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemAsp: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableAsp.getItems();

                that.sharedData.selectedItemsAsp = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdApo: item.getCells()[0].getText(),
                        Funcion: item.getCells()[1].getText(),
                        DenomFunc: item.getCells()[2].getText(),
                        OpFuncion: item.getCells()[3].getText(),
                        TipoUnif: item.getCells()[4].getText(),
                    };
                    that.sharedData.selectedItemsAsp.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsAsp = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdApo: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Funcion: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    DenomFunc: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    OpFuncion: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    TipoUnif: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsAsp.some(function (item) {
                    return item.IdApo === oItem.IdApo;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsAsp = that.sharedData.selectedItemsAsp
                        .filter(function (item) {
                            return item.IdApo !== oItem.IdApo;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsAsp.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsAsp(that.sharedData.selectedItemsAsp.length);
            console.log(that.sharedData.selectedItemsAsp);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsAsp: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;
                
            this.sharedData.bDownSelectedAsp.setEnabled(length > 0 && read);
            this.sharedData.btnDeleteAsp.setEnabled(length > 0 && write);
        },
    };

    return AspControllerHelper;
});