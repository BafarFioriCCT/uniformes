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

    var UsersControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedUsu: {},
            btnDeleteUsu: {},
            //!---CREATE---
            _oFgtUsersCreate: {},
            inpCreateNoEmp: {},
            inpCreateRol: {},
            inpCreateNombre: {},
            //!---TABLA---
            tableUsu: {},
            selectedItemsUsu: [],
            cBoxUsu: {},
            sFieldUsu: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsUsu: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[2] // VB2_3Usu
                .getItems()[0];
            this.sharedData.tableUsu = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[2] // VB2_3Usu
                .getItems()[0] // tableUsu
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchUsu
            this.sharedData.cBoxUsu = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[2] // VB2_3Usu
                .getItems()[0] // tableUsu
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldUsu
            this.sharedData.sFieldUsu = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[1] // VB2_2Usu
                .getItems()[0]
                .getItems()[0]; // createButtonUsu
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[1] // VB2_2Usu
                .getItems()[0]
                .getItems()[1]; // deleteButtonUsu
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteUsu = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[0] // VB2_1Usu
                .getItems()[1]
                .getItems()[0]; // btnDownloadUsu
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[0] // VB2_1Usu
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedUsu
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedUsu = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[0] // VB2_1Usu
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateUsu
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[14] // Main->UsersView.fragment.xml
                .getItems()[0] // VB2_1Usu
                .getItems()[1]
                .getItems()[3]; // btnUploadUsu
            oComponent.setEnabled(write)

            this.enableMainBtnsUsu([]);
        },

        //!---CREATE---
        setFgtCreateUsu: function (oFragment) {
            this.sharedData._oFgtUsersCreate = oFragment;

            var oComponent = this.sharedData._oFgtUsersCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpCreateNoEmp
            this.sharedData.inpCreateNoEmp = oComponent;

            oComponent = this.sharedData._oFgtUsersCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpCreateRol
            this.sharedData.inpCreateRol = oComponent;

            oComponent = this.sharedData._oFgtUsersCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // inpCreateNombre
            this.sharedData.inpCreateNombre = oComponent;
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVUsu: async function () {
            var results = await MainControllerHelper.getSetOData("UsuariosSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        NoEmp: results[i].NoEmp,
                        Rol: results[i].Rol,
                        Nombre: results[i].Nombre,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Usuarios.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVUsu: function () {
            var results = this.sharedData.selectedItemsUsu;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        NoEmp: results[i].NoEmp,
                        Rol: results[i].Rol,
                        Nombre: results[i].Nombre,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Usuarios.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVUsu: function () {
            var columns = [
                {
                    NoEmp: "",
                    Rol: "",
                    Nombre: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Usuarios.csv");
        },

        // Función para subir CSV
        uploadCSVUsu: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Usuarios");
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

                        MainControllerHelper.postMultipleOData("USUARIOS", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Usuarios agregados exitosamente!');
                                that.handleResetBtnConfirmUsu();
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

        //?-----------------------DELETE-----------------------
        // Función para eliminar masivamente registros seleccionados
        onDeleteDialogUsu: function () {
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
                        that.sharedData.selectedItemsUsu.forEach(item => {
                            toInAllDel.push({ B1: item.NoEmp })
                        });
                        MainControllerHelper.postMultipleOData("USUARIOS", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Usuario(s) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmUsu();
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
        onChangeUsu: function () {
            return this.sharedData.cBoxUsu.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldUsu: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("UsuariosSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeUsu();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldUsu.getValue();
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

            var oTable = this.sharedData.tableUsu // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmUsu: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("UsuariosSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tableUsu;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmUsu: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldUsu.setValue("");
            this.handleSearchFieldUsu();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsUsu = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsUsu([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemUsu: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableUsu.getItems();

                that.sharedData.selectedItemsUsu = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        NoEmp: item.getCells()[0].getText(),
                        Rol: item.getCells()[1].getText(),
                        Nombre: item.getCells()[2].getText(),
                    };
                    that.sharedData.selectedItemsUsu.push(oItem);
                });
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsUsu = []; // Limpiar el array de items seleccionados
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    NoEmp: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Rol: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Nombre: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsUsu.some(function (item) {
                    return item.NoEmp === oItem.NoEmp;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsUsu = that.sharedData.selectedItemsUsu
                        .filter(function (item) {
                            return item.NoEmp !== oItem.NoEmp;
                        });
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsUsu.push(oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsUsu(that.sharedData.selectedItemsUsu.length);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsUsu: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            this.sharedData.bDownSelectedUsu.setEnabled(length > 0 && read);
            this.sharedData.btnDeleteUsu.setEnabled(length > 0 && write);
        },
    };

    return UsersControllerHelper;
});