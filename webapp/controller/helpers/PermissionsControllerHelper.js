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

    var PermissionsControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedPer: {},
            btnDeletePer: {},
            //!---CREATE---
            _oFgtPermissionsCreate: {},
            inpCreateRol: {},
            cBoxCreatePer: {},
            cBoxCreateCat: {},
            //!---TABLA---
            tablePer: {},
            selectedItemsPer: [],
            cBoxPer: {},
            sFieldPer: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsPer: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[2] // VB2_3Per
                .getItems()[0];
            this.sharedData.tablePer = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[2] // VB2_3Per
                .getItems()[0] // tablePer
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchPer
            this.sharedData.cBoxPer = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[2] // VB2_3Per
                .getItems()[0] // tablePer
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldPer
            this.sharedData.sFieldPer = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[1] // VB2_2Per
                .getItems()[0]
                .getItems()[0]; // createButtonPer
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[1] // VB2_2Per
                .getItems()[0]
                .getItems()[1]; // deleteButtonPer
            oComponent.setEnabled(write)
            this.sharedData.btnDeletePer = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[0] // VB2_1Per
                .getItems()[1]
                .getItems()[0]; // btnDownloadPer
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[0] // VB2_1Per
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedPer
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedPer = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[0] // VB2_1Per
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplatePer
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[16] // Main->PermissionsView.fragment.xml
                .getItems()[0] // VB2_1Per
                .getItems()[1]
                .getItems()[3]; // btnUploadPer
            oComponent.setEnabled(write)

            this.enableMainBtnsPer([]);
        },

        //!---CREATE---
        setFgtCreatePer: function (oFragment) {
            this.sharedData._oFgtPermissionsCreate = oFragment;

            var oComponent = oFragment // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateRol
            this.sharedData.inpCreateRol = oComponent;

            oComponent = oFragment // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // cBoxCreatePer
            this.sharedData.cBoxCreatePer = oComponent;

            oComponent = oFragment // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // cBoxCreateCat
            this.sharedData.cBoxCreateCat = oComponent;
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVPer: async function () {
            var results = await MainControllerHelper.getSetOData("PermisosSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdPer: results[i].IdPer,
                        Rol: results[i].Rol,
                        Permiso: results[i].Permiso,
                        Catalogo: results[i].Catalogo,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Permisos.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVPer: function () {
            var results = this.sharedData.selectedItemsPer;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdPer: results[i].IdPer,
                        Rol: results[i].Rol,
                        Permiso: results[i].Permiso,
                        Catalogo: results[i].Catalogo,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Permisos.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVPer: function () {
            var columns = [
                {
                    IdPer: "",
                    Rol: "",
                    Permiso: "",
                    Catalogo: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Permisos.csv");
        },

        // Función para subir CSV
        uploadCSVPer: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Permisos");
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

                        MainControllerHelper.postMultipleOData("PERMISOS", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Permisos agregados exitosamente!');
                                that.handleResetBtnConfirmPer();
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
        //!---ROLES---
        // Función para seleccionar items de la lista Roles
        handleValueHelpRol: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("RolesSet");

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar un rol',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldRol(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Rol}",
                        description: "{Descripcion}"
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        // Obtener el item seleccionado por su descripción
                        var sTitle = selectedItem.getTitle();
                        // Procesar la selección en el input
                        that.sharedData.inpCreateRol.setValue(sTitle);
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
        handleSearchFieldRol: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("RolesSet");

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();

            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.NoEmp) || regex.test(item.Descripcion);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        // Función que retorna la key del ComboBox
        onChangeCreatePer: function () {
            return this.sharedData.cBoxCreatePer.getSelectedKey();
        },

        // Función que retorna la key del ComboBox
        onChangeCreateCat: function () {
            return this.sharedData.cBoxCreateCat.getSelectedKey();
        },

        //?-----------------------DELETE-----------------------
        // Función para eliminar masivamente registros seleccionados
        onDeleteDialogPer: function () {
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
                        that.sharedData.selectedItemsPer.forEach(item => {
                            toInAllDel.push({ B1: item.IdPer })
                        });
                        MainControllerHelper.postMultipleOData("PERMISOS", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Permiso(s) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmPer();
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
        onChangePer: function () {
            return this.sharedData.cBoxPer.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldPer: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("PermisosSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangePer();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldPer.getValue();
            if (comboBoxValue) {
                // Crear una expresión regular que ignore mayúsculas/minúsculas 
                // y que busque coincidencias parciales del valor del SearchField
                var regex = new RegExp(searchFieldValue, "i");

                // Se hace un filtro del OData nuevo, junto retornando
                // el regex con el valor del ComboBox elegido por el Perario
                filteredData = filteredData.filter(function (item) {
                    return regex.test(item[comboBoxValue]);
                });
            }

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: filteredData });

            var oTable = this.sharedData.tablePer // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmPer: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("PermisosSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tablePer;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------FILTER-----------------------
        // Función para filtrar datos de las tablas por columna
        handleFilterDialogConfirmPer: async function (oEvent) {
            var mParams = oEvent.getParameters(),  // Obtener los parámetros del diálogo de filtro
                aData = await MainControllerHelper.getSetOData("PermisosSet"),  // Obtener los datos del JSON original
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

            var oTable = this.sharedData.tablePer; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmPer: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldPer.setValue("");
            this.handleSearchFieldPer();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsPer = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsPer([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemPer: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tablePer.getItems();

                that.sharedData.selectedItemsPer = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdPer: item.getCells()[0].getText(),
                        Rol: item.getCells()[1].getText(),
                        Permiso: item.getCells()[2].getText(),
                        Catalogo: item.getCells()[3].getText(),
                    };
                    that.sharedData.selectedItemsPer.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsPer = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdPer: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Rol: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Permiso: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    Catalogo: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsPer.some(function (item) {
                    return item.IdPer === oItem.IdPer;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsPer = that.sharedData.selectedItemsPer
                        .filter(function (item) {
                            return item.IdPer !== oItem.IdPer;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsPer.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsPer(that.sharedData.selectedItemsPer.length);
            console.log(that.sharedData.selectedItemsPer);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsPer: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            this.sharedData.bDownSelectedPer.setEnabled(length > 0 && read);
            this.sharedData.btnDeletePer.setEnabled(length > 0 && write);
        },
    };

    return PermissionsControllerHelper;
});