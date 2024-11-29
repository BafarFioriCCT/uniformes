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

    var PackageControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedPaq: {},
            btnUpdatePaq: {},
            btnDeletePaq: {},
            //!---CREATE---
            _oFgtPackageCreate: {},
            inpCreateFuncion: {},
            cBoxCreateHijos: {},
            cBoxCreateUniforme: {},
            inpCreateTipoUniforme: {},
            cBoxCreateSociedad: {},
            inpCreateDenomFuncion: {},
            inpCreateNomPaquete: {},
            inpCreateDescripcion: {},
            //!---UPDATE---
            _oFgtPackageUpdate: {},
            inpUpdateFuncion: {},
            inpUpdateHijos: {},
            cBoxUpdateUniforme: {},
            inpUpdateTipoUniforme: {},
            cBoxUpdateSociedad: {},
            inpUpdateDenomFuncion: {},
            inpUpdateNomPaquete: {},
            inpUpdateDescripcion: {},
            //!---TABLA---
            tablePaq: {},
            selectedItemsPaq: [],
            cBoxPaq: {},
            sFieldPaq: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsPaq: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[2] // VB2_3Paq
                .getItems()[0];
            this.sharedData.tablePaq = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[2] // VB2_3Paq
                .getItems()[0] // tablePaq
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchPaq
            this.sharedData.cBoxPaq = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[2] // VB2_3Paq
                .getItems()[0] // tablePaq
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldPaq
            this.sharedData.sFieldPaq = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[1] // VB2_2Paq
                .getItems()[0]
                .getItems()[0]; // createButtonPaq
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[1] // VB2_2Paq
                .getItems()[0]
                .getItems()[1]; // updateButtonPaq
            oComponent.setEnabled(write)
            this.sharedData.btnUpdatePaq = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[1] // VB2_2Paq
                .getItems()[0]
                .getItems()[2]; // deleteButtonPaq
            oComponent.setEnabled(write)
            this.sharedData.btnDeletePaq = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[0] // VB2_1Paq
                .getItems()[1]
                .getItems()[0]; // btnDownloadPaq
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[0] // VB2_1Paq
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedPaq
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedPaq = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[0] // VB2_1Paq
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplatePaq
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[1] // Main->PackageView.fragment.xml
                .getItems()[0] // VB2_1Paq
                .getItems()[1]
                .getItems()[3]; // btnUploadPaq
            oComponent.setEnabled(write)

            this.enableMainBtnsPaq([]);
        },

        //!---CREATE---
        setFgtCreatePaq: function (oFragment) {
            this.sharedData._oFgtPackageCreate = oFragment;

            var oComponent = this.sharedData._oFgtPackageCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // createFuncion
            this.sharedData.inpCreateFuncion = oComponent;

            oComponent = this.sharedData._oFgtPackageCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // cbCreateHijos
            this.sharedData.cBoxCreateHijos = oComponent;

            oComponent = this.sharedData._oFgtPackageCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // cbCreateUniforme
            this.sharedData.cBoxCreateUniforme = oComponent;

            oComponent = this.sharedData._oFgtPackageCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // inpCreateTipoUniforme
            this.sharedData.inpCreateTipoUniforme = oComponent;

            oComponent = this.sharedData._oFgtPackageCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // ComboBox
                .mAggregations
                .fields[0]; // cbCreateSociedad
            this.sharedData.cBoxCreateSociedad = oComponent;

            oComponent = this.sharedData._oFgtPackageCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // Input
                .mAggregations
                .fields[0]; // createDenomFuncion
            this.sharedData.inpCreateDenomFuncion = oComponent;

            oComponent = this.sharedData._oFgtPackageCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5] // Input
                .mAggregations
                .fields[0]; // inpCreateNomPaquete
            this.sharedData.inpCreateNomPaquete = oComponent;

            oComponent = this.sharedData._oFgtPackageCreate// CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[6] // TextArea
                .mAggregations
                .fields[0]; // inpCreateDescripcion
            this.sharedData.inpCreateDescripcion = oComponent;
        },

        //!---UPDATE---
        setFgtUpdatePaq: function (oFragment) {
            this.sharedData._oFgtPackageUpdate = oFragment;

            var oComponent = this.sharedData._oFgtPackageUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // updateFuncion
            this.sharedData.inpUpdateFuncion = oComponent;
            this.sharedData.inpUpdateFuncion.setValue(
                this.sharedData.selectedItemsPaq[0].Funcion
            );

            oComponent = this.sharedData._oFgtPackageUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateHijos
            this.sharedData.inpUpdateHijos = oComponent;
            this.sharedData.inpUpdateHijos.setValue(
                this.sharedData.selectedItemsPaq[0].Hijos
            );

            oComponent = this.sharedData._oFgtPackageUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // cBoxUpdateUniforme
            this.sharedData.cBoxUpdateUniforme = oComponent;
            this.sharedData.cBoxUpdateUniforme.setSelectedKey(
                this.sharedData.selectedItemsPaq[0].Uniforme
            );

            oComponent = this.sharedData._oFgtPackageUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // inpUpdateTipoUniforme
            this.sharedData.inpUpdateTipoUniforme = oComponent;
            if (this.sharedData.selectedItemsPaq[0].Hijos == 'SI') {
                this.sharedData.inpUpdateTipoUniforme.setEnabled(false);
            } else {
                this.sharedData.inpUpdateTipoUniforme.setValue(
                    this.sharedData.selectedItemsPaq[0].TipoUniforme
                );
            }

            oComponent = this.sharedData._oFgtPackageUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // ComboBox
                .mAggregations
                .fields[0]; // cBoxUpdateSociedad
            this.sharedData.cBoxUpdateSociedad = oComponent;
            this.sharedData.cBoxUpdateSociedad.setSelectedKey(
                this.sharedData.selectedItemsPaq[0].Sociedad
            );

            oComponent = this.sharedData._oFgtPackageUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // Input
                .mAggregations
                .fields[0]; // inpUpdateDenomFuncion
            this.sharedData.inpUpdateDenomFuncion = oComponent;
            this.sharedData.inpUpdateDenomFuncion.setValue(
                this.sharedData.selectedItemsPaq[0].DenomFunc
            );

            oComponent = this.sharedData._oFgtPackageUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5] // Input
                .mAggregations
                .fields[0]; // inpUpdateNomPaquete
            this.sharedData.inpUpdateNomPaquete = oComponent;
            this.sharedData.inpUpdateNomPaquete.setValue(
                this.sharedData.selectedItemsPaq[0].NomPaquete
            );

            oComponent = this.sharedData._oFgtPackageUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[6] // TextArea
                .mAggregations
                .fields[0]; // inpUpdateDescripcion
            this.sharedData.inpUpdateDescripcion = oComponent;
            this.sharedData.inpUpdateDescripcion.setValue(
                this.sharedData.selectedItemsPaq[0].Descripcion
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVPaq: async function () {
            var results = await MainControllerHelper.getSetOData("PaqueteSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        Funcion: results[i].Funcion,
                        Hijos: results[i].Hijos,
                        Uniforme: results[i].Uniforme,
                        TipoUniforme: results[i].TipoUniforme,
                        Sociedad: results[i].Sociedad,
                        DenomFunc: results[i].DenomFunc,
                        NomPaquete: results[i].NomPaquete,
                        Descripcion: results[i].Descripcion
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Paquetes.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVPaq: function () {
            var results = this.sharedData.selectedItemsPaq;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        Funcion: results[i].Funcion,
                        Hijos: results[i].Hijos,
                        Uniforme: results[i].Uniforme,
                        TipoUniforme: results[i].TipoUniforme,
                        Sociedad: results[i].Sociedad,
                        DenomFunc: results[i].DenomFunc,
                        NomPaquete: results[i].NomPaquete,
                        Descripcion: results[i].Descripcion
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Paquetes.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVPaq: function () {
            var columns = [
                {
                    Funcion: "",
                    Hijos: "",
                    Uniforme: "",
                    TipoUniforme: "",
                    Sociedad: "",
                    DenomFunc: "",
                    NomPaquete: "",
                    Descripcion: ""
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Paquetes.csv");
        },

        // Función para subir CSV
        uploadCSVPaq: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Paquetes");
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

                        MainControllerHelper.postMultipleOData("PAQUETE", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('¡Paquete(s) agregados exitosamente!');
                                that.handleResetBtnConfirmPaq();
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
        // Función que retorna la key del ComboBox
        onChangeCreateHijos: function () {
            // El Input TipoUnif se habilitará o no dependiendo
            // del key seleccionado del ComboBox de Hijos
            this.sharedData.inpCreateTipoUniforme.setEnabled(
                this.sharedData.cBoxCreateHijos.getSelectedKey() == 'NO'
            )
            // Vacíar el input
            if (this.sharedData.cBoxCreateHijos.getSelectedKey() == 'SI') {
                this.sharedData.inpCreateTipoUniforme.setValue('');
            }
            return this.sharedData.cBoxCreateHijos.getSelectedKey();
        },

        // Función que retorna la key del ComboBox
        onChangeCreateUniforme: function () {
            return this.sharedData.cBoxCreateUniforme.getSelectedKey();
        },

        // Función que retorna la key del ComboBox
        onChangeCreateSociedad: function () {
            return this.sharedData.cBoxCreateSociedad.getSelectedKey();
        },

        //?-----------------------UPDATE-----------------------
        // Función que retorna la key del ComboBox
        onChangeUpdateUniforme: function () {
            return this.sharedData.cBoxUpdateUniforme.getSelectedKey();
        },

        // Función que retorna la key del ComboBox
        onChangeUpdateSociedad: function () {
            return this.sharedData.cBoxUpdateSociedad.getSelectedKey();
        },

        //?-----------------------DELETE-----------------------
        // Función para eliminar masivamente registros seleccionados
        onDeleteDialogPaq: function () {
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
                        that.sharedData.selectedItemsPaq.forEach(item => {
                            toInAllDel.push({ B1: item.Funcion })
                        });
                        MainControllerHelper.postMultipleOData("PAQUETE", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Paquete(s) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmPaq();
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
        onChangePaq: function () {
            return this.sharedData.cBoxPaq.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldPaq: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("PaqueteSet");

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangePaq();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldPaq.getValue();
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

            var oTable = this.sharedData.tablePaq // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmPaq: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("PaqueteSet"); // Orden ascendente o descendente

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

            var oTable = this.sharedData.tablePaq;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------FILTER-----------------------
        // Función para filtrar datos de las tablas por columna
        handleFilterDialogConfirmPaq: async function (oEvent) {
            var mParams = oEvent.getParameters(),  // Obtener los parámetros del diálogo de filtro
                aData = await MainControllerHelper.getSetOData("PaqueteSet"),  // Obtener los datos del JSON original
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

            var oTable = this.sharedData.tablePaq; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmPaq: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldPaq.setValue("");
            this.handleSearchFieldPaq();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsPaq = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsPaq([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemPaq: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tablePaq.getItems();

                that.sharedData.selectedItemsPaq = []; // Limpiar el array de items seleccionados

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
                    that.sharedData.selectedItemsPaq.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsPaq = []; // Limpiar el array de items seleccionados

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
                var bItemExists = that.sharedData.selectedItemsPaq.some(function (item) {
                    return item.Funcion === oItem.Funcion;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsPaq = that.sharedData.selectedItemsPaq
                        .filter(function (item) {
                            return item.Funcion !== oItem.Funcion;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsPaq.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsPaq(that.sharedData.selectedItemsPaq.length);
            console.log(that.sharedData.selectedItemsPaq);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsPaq: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedPaq.setEnabled(read);
                this.sharedData.btnUpdatePaq.setEnabled(write);
                this.sharedData.btnDeletePaq.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedPaq.setEnabled(read);
                this.sharedData.btnUpdatePaq.setEnabled(false);
                this.sharedData.btnDeletePaq.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedPaq.setEnabled(false);
                this.sharedData.btnUpdatePaq.setEnabled(false);
                this.sharedData.btnDeletePaq.setEnabled(false);
            }
        },
    };

    return PackageControllerHelper;
});