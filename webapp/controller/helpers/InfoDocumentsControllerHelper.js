sap.ui.define([
    //?-----------------------OTROS-----------------------
    "zuniformes/controller/helpers/MainControllerHelper", // Importar la clase Utility
    "zuniformes/auxiliar/formatter",
    //?-----------------------SAP/UI-----------------------
    'sap/ui/model/json/JSONModel',
    //?-----------------------SAP/M-----------------------
    'sap/m/MessageToast',
], function (
    //?-----------------------OTROS-----------------------
    MainControllerHelper,
    formatter,
    //?-----------------------SAP/UI-----------------------
    JSONModel,
    //?-----------------------SAP/M-----------------------
    MessageToast
) {
    "use strict";

    var InfoDocumentsControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedDoc: {},
            btnUpdateDoc: {},
            btnDeleteDoc: {},
            //!---CREATE---
            _oFgtDocumentsCreate: {},
            inpCreateIdDocEv: null,
            inpCreateNombre: null,
            inpCreateTipo: {},
            fUploaderCreateDoc: {},
            fileCreateDoc: {},
            dPickerCreateFechaCreacion: {},
            inpCreateCreadoPor: {},
            inpCreateTamArchivo: {},
            inpCreateUrlAlmacenado: {},
            cBoxCreateEstado: {},
            //!---UPDATE---
            _oFgtDocumentsUpdate: {},
            inpUpdateIdDocEv: {},
            inpUpdateNombre: {},
            inpUpdateTipo: {},
            inpUpdateFechaCreacion: {},
            inpUpdateCreadoPor: {},
            inpUpdateTamArchivo: {},
            inpUpdateUrlAlmacenado: {},
            inpUpdateIdObjeto: {},
            cBoxUpdateEstado: {},
            //!---TABLA---
            tableDoc: {},
            selectedItemsDoc: [],
            cBoxDoc: {},
            sFieldDoc: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFgtComponentsDoc: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;
                
            var oComponent = MainControllerHelper.getSharedData()._aFragments[10] // Main->DocumentsView.fragment.xml
                .getItems()[2] // VB2_3Doc
                .getItems()[0];
            this.sharedData.tableDoc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[10] // Main->DocumentsView.fragment.xml
                .getItems()[2] // VB2_3Doc
                .getItems()[0] // tableDoc
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][0]; // comboBoxSearchDoc
            this.sharedData.cBoxDoc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[10] // Main->DocumentsView.fragment.xml
                .getItems()[2] // VB2_3Doc
                .getItems()[0] // tableDoc
                .mAggregations
                .headerToolbar
                ._aAllCollections[0][1]; // searchFieldDoc
            this.sharedData.sFieldDoc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[10] // Main->DocumentsView.fragment.xml
                .getItems()[1] // VB2_2Doc
                .getItems()[0]
                .getItems()[0]; // createButtonDoc
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[10] // Main->DocumentsView.fragment.xml
                .getItems()[1] // VB2_2Doc
                .getItems()[0]
                .getItems()[1]; // updateButtonDoc
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateDoc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[10] // Main->DocumentsView.fragment.xml
                .getItems()[1] // VB2_2Doc
                .getItems()[0]
                .getItems()[2]; // deleteButtonDoc
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteDoc = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[10] // Main->DocumentsView.fragment.xml
                .getItems()[0] // VB2_1Doc
                .getItems()[1]
                .getItems()[0]; // btnDownloadDoc
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[10] // Main->DocumentsView.fragment.xml
                .getItems()[0] // VB2_1Doc
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedDoc
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedDoc = oComponent;

            this.enableMainBtnsDoc([]);
        },

        //!---CREATE---
        setFgtCreateDoc: function (oFragment) {
            this.sharedData._oFgtDocumentsCreate = oFragment;

            var oComponent = this.sharedData._oFgtDocumentsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FileUploader
                .mAggregations
                .fields[0]; // fUploaderCreateDoc
            this.sharedData.fUploaderCreateDoc = oComponent;

            oComponent = this.sharedData._oFgtDocumentsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateTipo
            this.sharedData.inpCreateTipo = oComponent;

            oComponent = this.sharedData._oFgtDocumentsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // dPickerCreateFechaCreacion
            this.sharedData.dPickerCreateFechaCreacion = oComponent;

            oComponent = this.sharedData._oFgtDocumentsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // inpCreateCreadoPor
            this.sharedData.inpCreateCreadoPor = oComponent;
            this.sharedData.inpCreateCreadoPor.setValue(
                MainControllerHelper.getUserId()
            );

            oComponent = this.sharedData._oFgtDocumentsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // Input
                .mAggregations
                .fields[0]; // inpCreateTamArchivo
            this.sharedData.inpCreateTamArchivo = oComponent;

            oComponent = this.sharedData._oFgtDocumentsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // Input
                .mAggregations
                .fields[0]; // inpCreateUrlAlmacenado
            this.sharedData.inpCreateUrlAlmacenado = oComponent;


            oComponent = this.sharedData._oFgtDocumentsCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5] // ComboBox
                .mAggregations
                .fields[0]; // cBoxCreateEstado
            this.sharedData.cBoxCreateEstado = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateDoc: function (oFragment) {
            this.sharedData._oFgtDocumentsUpdate = oFragment;

            var oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateIdDocEv
            this.sharedData.inpUpdateIdDocEv = oComponent;
            this.sharedData.inpUpdateIdDocEv.setValue(
                this.sharedData.selectedItemsDoc[0].IdDocEv
            );

            oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateNombre
            this.sharedData.inpUpdateNombre = oComponent;
            this.sharedData.inpUpdateNombre.setValue(
                this.sharedData.selectedItemsDoc[0].Nombre
            );

            oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateTipo
            this.sharedData.inpUpdateTipo = oComponent;
            this.sharedData.inpUpdateTipo.setValue(
                this.sharedData.selectedItemsDoc[0].Tipo
            );

            oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateFechaCreacion
            this.sharedData.inpUpdateFechaCreacion = oComponent;
            this.sharedData.inpUpdateFechaCreacion.setValue(
                this.sharedData.selectedItemsDoc[0].FechaCreacion
            );

            oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateCreadoPor
            this.sharedData.inpUpdateCreadoPor = oComponent;
            this.sharedData.inpUpdateCreadoPor.setValue(
                this.sharedData.selectedItemsDoc[0].CreadoPor
            );

            oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateTamArchivo
            this.sharedData.inpUpdateTamArchivo = oComponent;
            this.sharedData.inpUpdateTamArchivo.setValue(
                this.sharedData.selectedItemsDoc[0].TamArchivo
            );

            oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateUrlAlmacenado
            this.sharedData.inpUpdateUrlAlmacenado = oComponent;
            this.sharedData.inpUpdateUrlAlmacenado.setValue(
                this.sharedData.selectedItemsDoc[0].UrlAlmacenado
            );

            oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateIdObjeto
            this.sharedData.inpUpdateIdObjeto = oComponent;
            this.sharedData.inpUpdateIdObjeto.setValue(
                this.sharedData.selectedItemsDoc[0].IdObjeto
            );

            oComponent = this.sharedData._oFgtDocumentsUpdate // UpdateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // ComboBox
                .mAggregations
                .fields[0]; // cBoxUpdateEstado
            this.sharedData.cBoxUpdateEstado = oComponent;
            this.sharedData.cBoxUpdateEstado.setSelectedKey(
                this.sharedData.selectedItemsDoc[0].Estado
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVDoc: async function () {
            var results = await MainControllerHelper.getSetOData("DocEvidenciaSet");
            results.forEach(item => {
                item.FechaCreacion = formatter.formatDateFromTimestamp(item.FechaCreacion);
            });
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdDocEv: results[i].IdDocEv,
                        Nombre: results[i].Nombre,
                        Tipo: results[i].Tipo,
                        FechaCreacion: results[i].FechaCreacion,
                        CreadoPor: results[i].CreadoPor,
                        TamArchivo: results[i].TamArchivo,
                        UrlAlmacenado: results[i].UrlAlmacenado,
                        IdObjeto: results[i].IdObjeto,
                        Estado: results[i].Estado,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "InfoDocumentos.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVDoc: function () {
            var results = this.sharedData.selectedItemsDoc;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdDocEv: results[i].IdDocEv,
                        Nombre: results[i].Nombre,
                        Tipo: results[i].Tipo,
                        FechaCreacion: results[i].FechaCreacion,
                        CreadoPor: results[i].CreadoPor,
                        TamArchivo: results[i].TamArchivo,
                        UrlAlmacenado: results[i].UrlAlmacenado,
                        IdObjeto: results[i].IdObjeto,
                        Estado: results[i].Estado,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "InfoDocumentos.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        //?-----------------------CREATE-----------------------
        setCreateComponentsValues: function (oEvent) {
            var oFileUploader = oEvent.getSource(),
                sFileName = oEvent.getParameter("newValue");

            // Verificar la extensión del archivo
            if (sFileName && !sFileName.endsWith(".pdf") && !sFileName.endsWith(".docx")) {
                oFileUploader.setValue("");
                return;
            } else {
                // File subido al FileUploader dentro de un array FileList
                var oFile = oEvent.getParameter("files")[0]
                // Set al componente inpCreateNombre
                this.sharedData.inpCreateNombre = oFile.name;
                // Set al componente inpCreateTipo
                if (sFileName.endsWith(".pdf")) {
                    this.sharedData.inpCreateTipo.setValue("pdf");
                } else {
                    this.sharedData.inpCreateTipo.setValue("docx");
                }
                // Set al componente inpCreateTamArchivo
                this.sharedData.inpCreateTamArchivo.setValue(oFile.size);
                // Set al componente fileCreateDoc
                this.sharedData.fileCreateDoc = oFile;
            }
        },

        // Función que retorna la key del ComboBox
        onChangeCreateEstado: function () {
            return this.sharedData.cBoxCreateEstado.getSelectedKey();
        },

        //?-----------------------UPDATE-----------------------
        // Función que retorna la key del ComboBox
        onChangeUpdateEstado: function () {
            return this.sharedData.cBoxUpdateEstado.getSelectedKey();
        },

        //?-----------------------COMBOBOX-----------------------
        // Función que retorna la key del ComboBox
        onChangeDoc: function () {
            return this.sharedData.cBoxDoc.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldDoc: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("DocEvidenciaSet");
            filteredData.forEach(item => {
                item.FechaCreacion = formatter.formatDateFromTimestamp(item.FechaCreacion);
            });

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeDoc();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldDoc.getValue();
            if (comboBoxValue) {
                if (comboBoxValue == "FechaCreacion") {
                    var regex = new RegExp(searchFieldValue);
                
                    filteredData = filteredData.filter(function (item) {
                        // Filtra por la fecha formateada temporalmente por dd.MM.yyyy
                        return regex.test(
                            formatter.oDateFormat.format(item.FechaCreacion)
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

            var oTable = this.sharedData.tableDoc // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmDoc: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("DocEvidenciaSet"); // Orden ascendente o descendente
            aData.forEach(item => {
                item.FechaCreacion = formatter.formatDateFromTimestamp(item.FechaCreacion);
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

            var oTable = this.sharedData.tableDoc;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------FILTER-----------------------
        // Función para filtrar datos de las tablas por columna
        handleFilterDialogConfirmDoc: async function (oEvent) {
            var mParams = oEvent.getParameters(),  // Obtener los parámetros del diálogo de filtro
                aData = await MainControllerHelper.getSetOData("DocEvidenciaSet"),  // Obtener los datos del JSON original
                filteredData = aData;  // Clonar el array original para filtrar
            filteredData.forEach(item => {
                item.FechaCreacion = formatter.formatDateFromTimestamp(item.FechaCreacion);
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

            var oTable = this.sharedData.tableDoc; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmDoc: function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldDoc.setValue("");
            this.handleSearchFieldDoc();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsDoc = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsDoc([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemDoc: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableDoc.getItems();

                that.sharedData.selectedItemsDoc = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdDocEv: item.getCells()[0].getText(),
                        Nombre: item.getCells()[1].getText(),
                        Tipo: item.getCells()[2].getText(),
                        FechaCreacion: item.getCells()[3].getText(),
                        CreadoPor: item.getCells()[4].getText(),
                        TamArchivo: item.getCells()[5].getText(),
                        UrlAlmacenado: item.getCells()[6].getText(),
                        IdObjeto: item.getCells()[7].getText(),
                        Estado: item.getCells()[8].getText(),
                    };
                    that.sharedData.selectedItemsDoc.push(oItem);
                });
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsDoc = []; // Limpiar el array de items seleccionados
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdDocEv: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Nombre: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Tipo: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    FechaCreacion: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    CreadoPor: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                    TamArchivo: oEvent.getParameter("listItem").mAggregations.cells[5].mProperties.text,
                    UrlAlmacenado: oEvent.getParameter("listItem").mAggregations.cells[6].mProperties.text,
                    IdObjeto: oEvent.getParameter("listItem").mAggregations.cells[7].mProperties.text,
                    Estado: oEvent.getParameter("listItem").mAggregations.cells[8].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsDoc.some(function (item) {
                    return item.IdDocEv === oItem.IdDocEv;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsDoc = that.sharedData.selectedItemsDoc
                        .filter(function (item) {
                            return item.IdDocEv !== oItem.IdDocEv;
                        });
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsDoc.push(oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsDoc(that.sharedData.selectedItemsDoc.length);
        },

        // Función para habilitar los botónes Update y Delete
        enableMainBtnsDoc: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedDoc.setEnabled(read);
                this.sharedData.btnUpdateDoc.setEnabled(write);
                this.sharedData.btnDeleteDoc.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedDoc.setEnabled(read);
                this.sharedData.btnUpdateDoc.setEnabled(false);
                this.sharedData.btnDeleteDoc.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedDoc.setEnabled(false);
                this.sharedData.btnUpdateDoc.setEnabled(false);
                this.sharedData.btnDeleteDoc.setEnabled(false);
            }
        },
    };

    return InfoDocumentsControllerHelper;
});