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
    'sap/m/StandardListItem'
], function (
    //?-----------------------OTROS-----------------------
    MainControllerHelper,
    formatter,
    //?-----------------------SAP/UI-----------------------
    JSONModel, FileUploader,
    //?-----------------------SAP/M-----------------------
    Button, ButtonType, Dialog, MessageToast,
    Text, FlexBox, SelectDialog, StandardListItem
) {
    "use strict";

    var InventoryControllerHelper = {
        sharedData: {
            //!---PERMISOS---
            read: false,
            write: false,
            //!---BOTONES---
            bDownSelectedInv: {},
            btnUpdateStock: {},
            btnUpdateInv: {},
            btnDeleteInv: {},
            //!---STOCK---
            _oFgtInventoryStock: {},
            //!---CREATE---
            _oFgtInventoryCreate: {},
            inpCreateFuncion: {},
            inpCreateDivision: {},
            inpCreateArticulo: {},
            inpCreateTallaGral: {},
            inpCreateColor: {},
            inpCreateTipo: {},
            inpCreateLogo: {},
            inpCreateVidaUtil: {},
            inpCreateTalla1: {},
            inpCreatePrecio1: {},
            inpCreateTalla2: {},
            inpCreatePrecio2: {},
            inpCreateTalla3: {},
            inpCreatePrecio3: {},
            inpCreateProveedor: {},
            dPickCreateFechaEntr: {},
            inpCreateCantEntr: {},
            //!---UPDATE---
            _oFgtInventoryUpdate: {},
            inpUpdateIdInv: {},
            inpUpdateFuncion: {},
            inpUpdateDivision: {},
            inpUpdateArticulo: {},
            inpUpdateTallaGral: {},
            inpUpdateColor: {},
            inpUpdateTipo: {},
            inpUpdateLogo: {},
            inpUpdateVidaUtil: {},
            inpUpdateTalla1: {},
            inpUpdatePrecio1: {},
            inpUpdateTalla2: {},
            inpUpdatePrecio2: {},
            inpUpdateTalla3: {},
            inpUpdatePrecio3: {},
            inpUpdateProveedor: {},
            dPickUpdateFechaEntr: {},
            inpUpdateCantEntr: {},
            //!---TABLA---
            tableInv: {},
            selectedItemsInv: [],
            cBoxInv: {},
            sFieldInv: {},
        },

        getSharedData: function () {
            return this.sharedData;
        },

        //?-----------------------SETs COMPONENTES-----------------------
        setPermissions: function (oReadB, oWriteB) {
            this.sharedData.read = oReadB;
            this.sharedData.write = oWriteB;
        },

        setFtgComponentsInv: function () {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            var oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[3] // VB2_4Inv
                .getItems()[0]
                .mAggregations
                .content[0] // tableInv
            this.sharedData.tableInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[2] // VB2_3Inv
                .getItems()[0]
                .mAggregations
                .items[0]; // comboBoxInv
            this.sharedData.cBoxInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[2] // VB2_3Inv
                .getItems()[0]
                .mAggregations
                .items[1]; // searchFieldInv
            this.sharedData.sFieldInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[1] // VB2_2Inv
                .getItems()[0]
                .getItems()[0]; // stockButtonInv
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateStock = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[1] // VB2_2Inv
                .getItems()[0]
                .getItems()[1]; // createButtonInv
            oComponent.setEnabled(write)

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[1] // VB2_2Inv
                .getItems()[0]
                .getItems()[2]; // updateButtonInv
            oComponent.setEnabled(write)
            this.sharedData.btnUpdateInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[1] // VB2_2Inv
                .getItems()[0]
                .getItems()[3]; // deleteButtonInv
            oComponent.setEnabled(write)
            this.sharedData.btnDeleteInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[0] // VB2_1Inv
                .getItems()[1]
                .getItems()[0]; // btnDownloadInv
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[0] // VB2_1Inv
                .getItems()[1]
                .getItems()[1]; // btnDownloadSelectedInv
            oComponent.setEnabled(read)
            this.sharedData.bDownSelectedInv = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[0] // VB2_1Inv
                .getItems()[1]
                .getItems()[2]; // btnDownloadTemplateInv
            oComponent.setEnabled(read)

            oComponent = MainControllerHelper.getSharedData()._aFragments[4] // Main->InventoryView.fragment.xml
                .getItems()[0] // VB2_1Inv
                .getItems()[1]
                .getItems()[3]; // btnUploadInv
            oComponent.setEnabled(write)
            
            this.enableMainBtnsInv([]);
        },

        //!---STOCK---
        setFgtStockInv: function (oFragment) {
            this.sharedData._oFgtInventoryStock = oFragment;

            var oComponent = this.sharedData._oFgtInventoryStock
                .mAggregations
                .items[0]
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // Input
                .mAggregations
                .fields[0]; // inpStockIdInv
            this.sharedData.inpStockIdInv = oComponent;
            this.sharedData.inpStockIdInv.setValue(this.sharedData.selectedItemsInv[0].IdInv);

            oComponent = this.sharedData._oFgtInventoryStock // StockForm.fragment.xml
                .mAggregations
                .items[0]
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // Input
                .mAggregations
                .fields[0]; // inpStockArticulo
            this.sharedData.inpStockArticulo = oComponent;
            this.sharedData.inpStockArticulo.setValue(this.sharedData.selectedItemsInv[0].Articulo);

            oComponent = this.sharedData._oFgtInventoryStock // StockForm.fragment.xml
                .mAggregations
                .items[0]
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2] // Input
                .mAggregations
                .fields[0]; // inpStockCantEnt
            this.sharedData.inpStockCantEnt = oComponent;
        },

        //!---CREATE---
        setFgtCreateInv: function (oFragment) {
            this.sharedData._oFgtInventoryCreate = oFragment;

            var oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateFuncion
            this.sharedData.inpCreateFuncion = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreateDivision
            this.sharedData.inpCreateDivision = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1]
                .mAggregations
                .fields[0]; // inpCreateArticulo
            this.sharedData.inpCreateArticulo = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2]
                .mAggregations
                .fields[0]; // inpCreateTallaGral
            this.sharedData.inpCreateTallaGral = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3]
                .mAggregations
                .fields[0]; // inpCreateColor
            this.sharedData.inpCreateColor = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateTipo
            this.sharedData.inpCreateTipo = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreateLogo
            this.sharedData.inpCreateLogo = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5]
                .mAggregations
                .fields[0]; // inpCreateVidaUtil
            this.sharedData.inpCreateVidaUtil = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[6] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateTalla1
            this.sharedData.inpCreateTalla1 = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[6] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreatePrecio1
            this.sharedData.inpCreatePrecio1 = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[7] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateTalla2
            this.sharedData.inpCreateTalla2 = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[7] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreatePrecio2
            this.sharedData.inpCreatePrecio2 = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[8] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpCreateTalla3
            this.sharedData.inpCreateTalla3 = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[8] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreatePrecio3
            this.sharedData.inpCreatePrecio3 = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[9]
                .mAggregations
                .fields[0]; // inpCreateProveedor
            this.sharedData.inpCreateProveedor = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[10] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // dPickCreateFechaEntr
            this.sharedData.dPickCreateFechaEntr = oComponent;

            oComponent = this.sharedData._oFgtInventoryCreate // CreateForm.fragment.xml
                .getItems()[0] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[10] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpCreateCantEntr
            this.sharedData.inpCreateCantEntr = oComponent;
        },

        //!---UPDATE---
        setFgtUpdateInv: function (oFragment) {
            this.sharedData._oFgtInventoryUpdate = oFragment;

            var oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[0]
                .mAggregations
                .fields[0]; // inpUpdateIdInv
            this.sharedData.inpUpdateIdInv = oComponent;
            this.sharedData.inpUpdateIdInv.setValue(
                this.sharedData.selectedItemsInv[0].IdInv
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateFuncion
            this.sharedData.inpUpdateFuncion = oComponent;
            this.sharedData.inpUpdateFuncion.setValue(
                this.sharedData.selectedItemsInv[0].Funcion
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[1] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateDivision
            this.sharedData.inpUpdateDivision = oComponent;
            this.sharedData.inpUpdateDivision.setValue(
                this.sharedData.selectedItemsInv[0].Division
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[2]
                .mAggregations
                .fields[0]; // inpUpdateArticulo
            this.sharedData.inpUpdateArticulo = oComponent;
            this.sharedData.inpUpdateArticulo.setValue(
                this.sharedData.selectedItemsInv[0].Articulo
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[3]
                .mAggregations
                .fields[0]; // inpUpdateTallaGral
            this.sharedData.inpUpdateTallaGral = oComponent;
            this.sharedData.inpUpdateTallaGral.setValue(
                this.sharedData.selectedItemsInv[0].TallaGral
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[4]
                .mAggregations
                .fields[0]; // inpUpdateColor
            this.sharedData.inpUpdateColor = oComponent;
            this.sharedData.inpUpdateColor.setValue(
                this.sharedData.selectedItemsInv[0].Color
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateTipo
            this.sharedData.inpUpdateTipo = oComponent;
            this.sharedData.inpUpdateTipo.setValue(
                this.sharedData.selectedItemsInv[0].Tipo
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[5] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateLogo
            this.sharedData.inpUpdateLogo = oComponent;
            this.sharedData.inpUpdateLogo.setValue(
                this.sharedData.selectedItemsInv[0].Logo
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[6]
                .mAggregations
                .fields[0]; // inpUpdateVidaUtil
            this.sharedData.inpUpdateVidaUtil = oComponent;
            this.sharedData.inpUpdateVidaUtil.setValue(
                this.sharedData.selectedItemsInv[0].VidaUtil
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[7] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateTalla1
            this.sharedData.inpUpdateTalla1 = oComponent;
            this.sharedData.inpUpdateTalla1.setValue(
                this.sharedData.selectedItemsInv[0].Talla1
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[7] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdatePrecio1
            this.sharedData.inpUpdatePrecio1 = oComponent;
            this.sharedData.inpUpdatePrecio1.setValue(
                this.sharedData.selectedItemsInv[0].Precio1
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[8] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateTalla2
            this.sharedData.inpUpdateTalla2 = oComponent;
            this.sharedData.inpUpdateTalla2.setValue(
                this.sharedData.selectedItemsInv[0].Talla2
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[8] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdatePrecio2
            this.sharedData.inpUpdatePrecio2 = oComponent;
            this.sharedData.inpUpdatePrecio2.setValue(
                this.sharedData.selectedItemsInv[0].Precio2
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[9] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // inpUpdateTalla3
            this.sharedData.inpUpdateTalla3 = oComponent;
            this.sharedData.inpUpdateTalla3.setValue(
                this.sharedData.selectedItemsInv[0].Talla3
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[9] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdatePrecio3
            this.sharedData.inpUpdatePrecio3 = oComponent;
            this.sharedData.inpUpdatePrecio3.setValue(
                this.sharedData.selectedItemsInv[0].Precio3
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[10]
                .mAggregations
                .fields[0]; // inpUpdateProveedor
            this.sharedData.inpUpdateProveedor = oComponent;
            this.sharedData.inpUpdateProveedor.setValue(
                this.sharedData.selectedItemsInv[0].Proveedor
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[11] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[0]; // dPickUpdateFechaEntr
            this.sharedData.dPickUpdateFechaEntr = oComponent;
            this.sharedData.dPickUpdateFechaEntr.setValue(
                this.sharedData.selectedItemsInv[0].FechaEntrada
            );

            oComponent = this.sharedData._oFgtInventoryUpdate // UpdateForm.fragment.xml
                .getItems()[1] // Form
                .mAggregations
                .formContainers[0]
                .mAggregations
                .formElements[11] // FlexBox
                .mAggregations
                .fields[0]
                .mAggregations
                .items[1]; // inpUpdateCantEntr
            this.sharedData.inpUpdateCantEntr = oComponent;
            this.sharedData.inpUpdateCantEntr.setValue(
                this.sharedData.selectedItemsInv[0].CantEnt
            );
        },

        //?-----------------------CSV-----------------------
        // Función para descargar todos los registros en CSV
        downloadAllCSVInv: async function () {
            var results = await MainControllerHelper.getSetOData("InventarioSet");
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdInv: results[i].IdInv,
                        Funcion: results[i].Funcion,
                        Division: results[i].Division,
                        Articulo: results[i].Articulo,
                        TallaGral: results[i].TallaGral,
                        Color: results[i].Color,
                        Tipo: results[i].Tipo,
                        Logo: results[i].Logo,
                        VidaUtil: results[i].VidaUtil,
                        Talla1: results[i].Talla1,
                        Precio1: results[i].Precio1,
                        Talla2: results[i].Talla2,
                        Precio2: results[i].Precio2,
                        Talla3: results[i].Talla3,
                        Precio3: results[i].Precio3,
                        Proveedor: results[i].Proveedor,
                        FechaEntrada: formatter.oDateFormat.format(
                            formatter.formatDateFromTimestamp(results[i].FechaEntrada)
                        ),
                        CantEnt: results[i].CantEnt,
                        FechaSalida: formatter.oDateFormat.format(
                            formatter.formatDateFromTimestamp(results[i].FechaSalida)
                        ),
                        CantSal: results[i].CantSal,
                        CantTotal: results[i].CantTotal,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Inventario.csv");
            } else {
                MessageToast.show("Hubo un problema al obtener los datos");
            }
        },

        // Función para descargar los registros seleccionados en CSV
        downloadSelectedCSVInv: function () {
            var results = this.sharedData.selectedItemsInv;
            if (results != undefined && results.length > 0) {
                var data = [];
                for (var i = 0; i < results.length; i++) {
                    data.push({
                        IdInv: results[i].IdInv,
                        Funcion: results[i].Funcion,
                        Division: results[i].Division,
                        Articulo: results[i].Articulo,
                        TallaGral: results[i].TallaGral,
                        Color: results[i].Color,
                        Tipo: results[i].Tipo,
                        Logo: results[i].Logo,
                        VidaUtil: results[i].VidaUtil,
                        Talla1: results[i].Talla1,
                        Precio1: results[i].Precio1,
                        Talla2: results[i].Talla2,
                        Precio2: results[i].Precio2,
                        Talla3: results[i].Talla3,
                        Precio3: results[i].Precio3,
                        Proveedor: results[i].Proveedor,
                        FechaEntrada: results[i].FechaEntrada,
                        CantEnt: results[i].CantEnt,
                        FechaSalida: results[i].FechaSalida,
                        CantSal: results[i].CantSal,
                        CantTotal: results[i].CantTotal,
                    });
                }
                var csv = MainControllerHelper.convertToCSV(data);
                MainControllerHelper.downloadCSV(csv, "Inventario.csv");
            } else {
                MessageToast.show(
                    "Error en la descarga de datos, seleccione mínimo un dato."
                );
            }
        },

        // Función para descargar la plantilla CSV
        downloadTemplateCSVInv: function () {
            var columns = [
                {
                    IdInv: "",
                    Funcion: "",
                    Division: "",
                    Articulo: "",
                    TallaGral: "",
                    Color: "",
                    Tipo: "",
                    Logo: "",
                    VidaUtil: "",
                    Talla1: "",
                    Precio1: "",
                    Talla2: "",
                    Precio2: "",
                    Talla3: "",
                    Precio3: "",
                    Proveedor: "",
                    FechaEntrada: "",
                    CantEnt: "",
                    FechaSalida: "",
                    CantSal: "",
                    CantTotal: "",
                },
            ];
            var csv = MainControllerHelper.convertToCSV(columns);
            MainControllerHelper.downloadCSV(csv, "Inventario.csv");
        },

        // Función para subir archivo CSV
        uploadCSVInv: function () {
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
                                    MainControllerHelper.onFileUploaderChange(oEvent, "Inventario");
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

                        MainControllerHelper.postMultipleOData("INVENTARIO", "MOD", oToInAll)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Artículo(s) agregado(s) exitosamente!');
                                that.handleResetBtnConfirmInv();
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
        // Función para abrir SelectDialog con una List
        handleValueHelpPaqInv: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("PaqueteSet");

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar un paquete',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldPaq(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Funcion}", // Campo Col1 del modelo
                        description: "{NomPaquete}" // Campo Col2 del modelo
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        var sTitle = selectedItem.getTitle();
                        // Procesar la selección en el input
                        that.sharedData.inpCreateFuncion.setValue(sTitle);
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

        // Función para buscar por filtro y ComboBox
        handleSearchFieldPaq: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("PaqueteSet");

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();
            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.Funcion) || regex.test(item.NomPaquete);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        // Función para abrir SelectDialog con una List
        handleValueHelpCreateTaGral: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("TallasGrlSet");

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar una talla general',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldCreateTaGral(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Tipo}", // Campo Col1 del modelo
                        description: "{Talla}" // Campo Col2 del modelo
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        var sTitle = selectedItem.getDescription();
                        // Procesar la selección en el input
                        that.sharedData.inpCreateTallaGral.setValue(sTitle);
                        that.sharedData.inpCreateTipo.setEnabled(true);
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
        handleSearchFieldCreateTaGral: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("TallasGrlSet");

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();
            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.Tipo) || regex.test(item.Talla);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        // Función para abrir SelectDialog con una List
        handleValueHelpCreateTipo: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("TallasGrlSet");

            oData = oData.filter(function (item) {
                // Primero se filtra por lo que se eligió en TallaGral
                return item.Talla === that.sharedData.inpCreateTallaGral.getValue();
            });
            console.log(oData)

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar un tipo de ropa',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldCreateTipo(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Tipo}", // Campo Col1 del modelo
                        description: "{Talla}" // Campo Col2 del modelo
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        var sTitle = selectedItem.getTitle();
                        // Procesar la selección en el input
                        that.sharedData.inpCreateTipo.setValue(sTitle);
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
        handleSearchFieldCreateTipo: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("TallasGrlSet"),
                that = this;

            filteredData = filteredData.filter(function (item) {
                // Primero se filtra por lo que se eligió en TallaGral
                return item.Talla === that.sharedData.inpCreateTallaGral.getValue();
            });

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();
            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.Tipo) || regex.test(item.Talla);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //?-----------------------UPDATE-----------------------
        // Función para abrir SelectDialog con una List
        handleValueHelpUpdateTaGral: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("TallasGrlSet");

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar una talla general',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldUpdateTaGral(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Tipo}", // Campo Col1 del modelo
                        description: "{Talla}" // Campo Col2 del modelo
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        var sTitle = selectedItem.getDescription();
                        // Procesar la selección en el input
                        that.sharedData.inpUpdateTallaGral.setValue(sTitle);
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

        // Función para buscar por filtro y ComboBox
        handleSearchFieldUpdateTaGral: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("TallasGrlSet");

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();
            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.Tipo) || regex.test(item.Talla);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        // Función para abrir SelectDialog con una List
        handleValueHelpUpdateTipo: async function () {
            var that = this,
                oData = await MainControllerHelper.getSetOData("TallasGrlSet");

            oData = oData.filter(function (item) {
                // Primero se filtra por lo que se eligió en TallaGral
                return item.Talla === that.sharedData.inpUpdateTallaGral.getValue();
            });
            console.log(oData)

            // Crear un modelo JSON con los datos
            var oJsonModel = new JSONModel();
            oJsonModel.setData({ results: oData });

            var dialog = new SelectDialog({
                title: 'Seleccionar un tipo de ropa',
                contentHeight: '50%',
                search: function () {
                    that.handleSearchFieldUpdateTipo(dialog)
                },
                // El contenido será el subfragmento cargado al abrir este SelectDialog
                items: {
                    path: "/results", // Raíz del JSONModel
                    template: new StandardListItem({
                        title: "{Tipo}", // Campo Col1 del modelo
                        description: "{Talla}" // Campo Col2 del modelo
                    })
                },
                confirm: function (oEvent) {
                    var selectedItem = oEvent.getParameter("selectedItem");
                    if (selectedItem) {
                        var sTitle = selectedItem.getTitle();
                        // Procesar la selección en el input
                        that.sharedData.inpUpdateTipo.setValue(sTitle);
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
        handleSearchFieldUpdateTipo: async function (oDialog) {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("TallasGrlSet"),
                that = this;

            filteredData = filteredData.filter(function (item) {
                // Primero se filtra por lo que se eligió en TallaGral
                return item.Talla === that.sharedData.inpUpdateTallaGral.getValue();
            });

            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = oDialog._oSearchField.getValue();
            // Crear una expresión regular que ignore mayúsculas/minúsculas 
            // y que busque coincidencias parciales del valor del SearchField
            var regex = new RegExp(searchFieldValue, "i");

            // Filtrar los datos basados en la búsqueda
            filteredData = filteredData.filter(function (item) {
                return regex.test(item.Tipo) || regex.test(item.Talla);
            });

            // Crear un nuevo modelo con los datos filtrados
            var oFilteredModel = new JSONModel({ results: filteredData });

            // Actualizar el modelo del SelectDialog con los datos filtrados
            oDialog.setModel(oFilteredModel);
        },

        //?-----------------------DELETE-----------------------
        // Función para eliminar masivamente registros seleccionados
        onDeleteDialogInv: function () {
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
                        that.sharedData.selectedItemsInv.forEach(item => {
                            toInAllDel.push({ B1: item.IdInv })
                        });
                        MainControllerHelper.postMultipleOData("INVENTARIO", "DEL", toInAllDel)
                            .then(() => {
                                // Aquí la promesa fue exitosa, puedes manejar el resultado
                                // Mensaje de éxito, se cierra y se destruye el Dialog
                                MessageToast.show('Inventario(s) eliminado(s) éxitosamente!');
                                that.handleResetBtnConfirmInv();
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
        onChangeInv: function () {
            return this.sharedData.cBoxInv.getSelectedKey();
        },

        //?-----------------------SEARCHFIELD-----------------------
        // Función para buscar por filtro y ComboBox
        handleSearchFieldInv: async function () {
            // Obtener los datos del JSON original
            var filteredData = await MainControllerHelper.getSetOData("InventarioSet");
            filteredData.forEach(item => {
                item.FechaEntrada = formatter.formatDateFromTimestamp(item.FechaEntrada);
                item.FechaSalida = formatter.formatDateFromTimestamp(item.FechaSalida);
            });
            console.log(filteredData)

            // Obtiene el valor del ComboBox de esta página
            var comboBoxValue = this.onChangeInv();
            // Obtiene el valor del SearchField de esta página
            var searchFieldValue = this.sharedData.sFieldInv.getValue();
            if (comboBoxValue) {
                // Se hace un filtro del OData nuevo, junto retornando
                // el regex con el valor del ComboBox elegido por el usuario
                if (comboBoxValue == "FechaEntrada") {
                    var regex = new RegExp(searchFieldValue);

                    filteredData = filteredData.filter(function (item) {
                        // Filtra por la fecha formateada temporalmente por dd.MM.yyyy
                        return regex.test(
                            formatter.oDateFormat.format(item.FechaEntrada)
                        );
                    });
                } else if (comboBoxValue == "FechaSalida") {
                    var regex = new RegExp(searchFieldValue);

                    filteredData = filteredData.filter(function (item) {
                        // Filtra por la fecha formateada temporalmente por dd.MM.yyyy
                        return regex.test(
                            formatter.oDateFormat.format(item.FechaSalida)
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

            var oTable = this.sharedData.tableInv // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------SORT-----------------------
        // Función para ordenar datos de las tablas por columna
        handleSortDialogConfirmInv: async function (oEvent) {
            var mParams = oEvent.getParameters(),
                sKey = mParams.sortItem.getKey(), // La key seleccionada para ordenar
                bDescending = mParams.sortDescending,
                aData = await MainControllerHelper.getSetOData("InventarioSet"); // Orden ascendente o descendente
            aData.forEach(item => {
                item.FechaEntrada = formatter.formatDateFromTimestamp(item.FechaEntrada);
                item.FechaSalida = formatter.formatDateFromTimestamp(item.FechaSalida);
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

            var oTable = this.sharedData.tableInv;
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template
            });
        },

        //?-----------------------FILTER-----------------------
        // Función para filtrar datos de las tablas por columna
        handleFilterDialogConfirmInv: async function (oEvent) {
            var mParams = oEvent.getParameters(),  // Obtener los parámetros del diálogo de filtro
                aData = await MainControllerHelper.getSetOData("InventarioSet"),  // Obtener los datos del JSON original
                filteredData = aData;  // Clonar el array original para filtrar
            filteredData.forEach(item => {
                item.FechaEntrada = formatter.formatDateFromTimestamp(item.FechaEntrada);
                item.FechaSalida = formatter.formatDateFromTimestamp(item.FechaSalida);
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

            var oTable = this.sharedData.tableInv; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: oTable.getBindingInfo("items").template  // Mantener el template original
            });
        },

        //?-----------------------RESET-----------------------
        // Función para reiniciar la tabla originalmente
        handleResetBtnConfirmInv: async function () {
            // Set vacío al valor del SearchField para el filtro
            this.sharedData.sFieldInv.setValue("");
            this.handleSearchFieldInv();

            // Reinicia el arreglo de ToInAll
            MainControllerHelper.getSharedData().toInAll = [];
            // Reinicia los items seleccionados de la tabla
            this.sharedData.selectedItemsInv = [];
            // Reinicia los botones que dependen de los items seleccionados de la tabla
            this.enableMainBtnsInv([]);
        },

        //?-----------------------TABLE SELECT-----------------------
        // Función para seleccionar filas de la tabla
        onSelectedItemInv: function (oEvent) {
            var that = this,
                bSelectAll = oEvent.getParameter("selectAll"), // Detecta si el cambio fue desde el "select all"
                aSelectedItems = oEvent.getSource().getSelectedItems(); // Items actualmente seleccionados

            // Condición si se seleccionaron todos los checkboxs
            if (bSelectAll && aSelectedItems.length > 0) {
                // Items visibles de la tabla
                var aItems = that.sharedData.tableInv.getItems();

                that.sharedData.selectedItemsInv = []; // Limpiar el array de items seleccionados

                // Iterar cada item de la tabla e ingresarlos al array
                aItems.forEach(function (item) {
                    var oItem = {
                        IdInv: item.getCells()[0].getText(),
                        Funcion: item.getCells()[1].getText(),
                        Division: item.getCells()[2].getText(),
                        Articulo: item.getCells()[3].getText(),
                        TallaGral: item.getCells()[4].getText(),
                        Color: item.getCells()[5].getText(),
                        Tipo: item.getCells()[6].getText(),
                        Logo: item.getCells()[7].getText(),
                        VidaUtil: item.getCells()[8].getText(),
                        Talla1: item.getCells()[9].getText(),
                        Precio1: item.getCells()[10].getText(),
                        Talla2: item.getCells()[11].getText(),
                        Precio2: item.getCells()[12].getText(),
                        Talla3: item.getCells()[13].getText(),
                        Precio3: item.getCells()[14].getText(),
                        Proveedor: item.getCells()[15].getText(),
                        FechaEntrada: item.getCells()[16].getText(),
                        CantEnt: item.getCells()[17].getText(),
                        FechaSalida: item.getCells()[18].getText(),
                        CantSal: item.getCells()[19].getText(),
                        CantTotal: item.getCells()[20].getText(),
                    };
                    that.sharedData.selectedItemsInv.push(oItem);
                });

                console.log("-----------------------------------");
                console.log("Todos seleccionados");
                console.log("-----------------------------------");
                // Condición si se deseleccionaron todos los checkboxs
            } else if (!bSelectAll && aSelectedItems.length === 0) {
                that.sharedData.selectedItemsInv = []; // Limpiar el array de items seleccionados

                console.log("-----------------------------------");
                console.log("Todos deseleccionados");
                console.log("-----------------------------------");
                // Condición si se seleccionó o no individualmente un checkbox
            } else if (!bSelectAll) {
                // Handle individual row selection/deselection
                var oItem = {
                    IdInv: oEvent.getParameter("listItem").mAggregations.cells[0].mProperties.text,
                    Funcion: oEvent.getParameter("listItem").mAggregations.cells[1].mProperties.text,
                    Division: oEvent.getParameter("listItem").mAggregations.cells[2].mProperties.text,
                    Articulo: oEvent.getParameter("listItem").mAggregations.cells[3].mProperties.text,
                    TallaGral: oEvent.getParameter("listItem").mAggregations.cells[4].mProperties.text,
                    Color: oEvent.getParameter("listItem").mAggregations.cells[5].mProperties.text,
                    Tipo: oEvent.getParameter("listItem").mAggregations.cells[6].mProperties.text,
                    Logo: oEvent.getParameter("listItem").mAggregations.cells[7].mProperties.text,
                    VidaUtil: oEvent.getParameter("listItem").mAggregations.cells[8].mProperties.text,
                    Talla1: oEvent.getParameter("listItem").mAggregations.cells[9].mProperties.text,
                    Precio1: oEvent.getParameter("listItem").mAggregations.cells[10].mProperties.text,
                    Talla2: oEvent.getParameter("listItem").mAggregations.cells[11].mProperties.text,
                    Precio2: oEvent.getParameter("listItem").mAggregations.cells[12].mProperties.text,
                    Talla3: oEvent.getParameter("listItem").mAggregations.cells[13].mProperties.text,
                    Precio3: oEvent.getParameter("listItem").mAggregations.cells[14].mProperties.text,
                    Proveedor: oEvent.getParameter("listItem").mAggregations.cells[15].mProperties.text,
                    FechaEntrada: oEvent.getParameter("listItem").mAggregations.cells[16].mProperties.text,
                    CantEnt: oEvent.getParameter("listItem").mAggregations.cells[17].mProperties.text,
                    FechaSalida: oEvent.getParameter("listItem").mAggregations.cells[18].mProperties.text,
                    CantSal: oEvent.getParameter("listItem").mAggregations.cells[19].mProperties.text,
                    CantTotal: oEvent.getParameter("listItem").mAggregations.cells[20].mProperties.text,
                };

                // Verifica si el item ya está en el array
                var bItemExists = that.sharedData.selectedItemsInv.some(function (item) {
                    return item.Funcion === oItem.Funcion;
                });

                // Si el item está en el array, significa que fue deseleccionado, entonces lo eliminamos
                if (bItemExists) {
                    that.sharedData.selectedItemsInv = that.sharedData.selectedItemsInv
                        .filter(function (item) {
                            return item.Funcion !== oItem.Funcion;
                        });
                    console.log("Elemento deseleccionado:", oItem);
                } else {
                    // Si el item no está en el array, lo agregamos (selección individual)
                    that.sharedData.selectedItemsInv.push(oItem);
                    console.log("Elemento seleccionado:", oItem);
                }
            }
            // Actualiza el estado del botón en función del número de elementos seleccionados
            that.enableMainBtnsInv(that.sharedData.selectedItemsInv.length);
            console.log(that.sharedData.selectedItemsInv);
        },

        // Función para habilitar botones
        enableMainBtnsInv: function (length) {
            var read = this.sharedData.read,
                write = this.sharedData.write;

            if (length == 1) {
                this.sharedData.bDownSelectedInv.setEnabled(read);
                this.sharedData.btnUpdateStock.setEnabled(write);
                this.sharedData.btnUpdateInv.setEnabled(write);
                this.sharedData.btnDeleteInv.setEnabled(write);
            } else if (length > 1) {
                this.sharedData.bDownSelectedInv.setEnabled(read);
                this.sharedData.btnUpdateStock.setEnabled(false);
                this.sharedData.btnUpdateInv.setEnabled(false);
                this.sharedData.btnDeleteInv.setEnabled(write);
            } else {
                this.sharedData.bDownSelectedInv.setEnabled(false);
                this.sharedData.btnUpdateStock.setEnabled(false);
                this.sharedData.btnUpdateInv.setEnabled(false);
                this.sharedData.btnDeleteInv.setEnabled(false);
            }
        },
    };

    return InventoryControllerHelper;
});