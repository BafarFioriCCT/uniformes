sap.ui.define([
    //?-----------------------OTROS-----------------------
    "zuniformes/controller/helpers/MainControllerHelper", // Importar la clase Utility
    //?-----------------------SAP/UI-----------------------
    'sap/ui/model/json/JSONModel',
    //?-----------------------SAP/M-----------------------
    'sap/m/Text',
    'sap/m/ColumnListItem',
], function (
    //?-----------------------OTROS-----------------------
    MainControllerHelper,
    //?-----------------------SAP/UI-----------------------
    JSONModel,
    //?-----------------------SAP/M-----------------------
    Text, ColumnListItem
) {
    "use strict";

    var ChargeRotationsControllerHelper = {
        //!---TABLA---
        tableCostUnif: {},
        dataCostUnif: [
            {
                Zona: "RETAIL",
                Precio: "$3.536,00MXN",
                DiasPenal: "0-90 DÍAS",
                PorcCobro: "30% TOPE CON LEY. Depende el porcentaje según al porcentaje que reste de las recepciones."
            },
            {
                Zona: "DPC",
                Precio: "$3.602,00MXN",
                DiasPenal: "0-90 DÍAS",
                PorcCobro: "30% TOPE CON LEY. Depende el porcentaje según al porcentaje que reste de las recepciones."
            }
        ],
        tableRetail: {},
        dataRetail: [
            {
                Articulo: "Playera",
                Talla: "CH-XL",
                Precio: "$138,00MXN",
            },
            {
                Articulo: "Playera",
                Talla: "2XL-3XL",
                Precio: "$163,00MXN",
            },
            {
                Articulo: "Camisa",
                Talla: "XS-XL",
                Precio: "$405,00MXN",
            },
            {
                Articulo: "Camisa",
                Talla: "2XL-3XL",
                Precio: "$430,00MXN",
            },
            {
                Articulo: "Bata",
                Talla: "",
                Precio: "$125,00MXN",
            },
            {
                Articulo: "Mandil",
                Talla: "UNITALLA",
                Precio: "$130,00MXN",
            },
            {
                Articulo: "Zapato negro",
                Talla: "",
                Precio: "$495,00MXN",
            },
            {
                Articulo: "Total",
                Talla: "",
                Precio: "$2341,00MXN",
            }
        ],
        tableEqRetail: {},
        dataEqRetail: [
            {
                Articulo: "Faja",
                Talla: "",
                Precio: "$102,00MXN",
            },
            {
                Articulo: "Chamarra",
                Talla: "",
                Precio: "$798,00MXN",
            },
            {
                Articulo: "Bota",
                Talla: "",
                Precio: "$295,00MXN",
            },
            {
                Articulo: "Total",
                Talla: "",
                Precio: "$1195,00MXN",
            }
        ],
        tableDPC: {},
        dataDPC: [
            {
                Articulo: "Pantalones",
                Talla: "",
                Precio: "$320,00MXN",
            },
            {
                Articulo: "Playeras polo vendedores mix, rep, alm",
                Talla: "CH-XL",
                Precio: "$150,00MXN",
            },
            {
                Articulo: "Playeras polo vendedores mix, rep, alm",
                Talla: "2XL",
                Precio: "$175,00MXN",
            },
            {
                Articulo: "Playeras polo vendedores mix, rep, alm",
                Talla: "3XL",
                Precio: "$215,00MXN",
            },
            {
                Articulo: "Camisas Vendedores mix, rep, alm",
                Talla: "CH-XL",
                Precio: "$405,00MXN",
            },
            {
                Articulo: "Camisas Vendedores mix, rep, alm",
                Talla: "2XL-3XL",
                Precio: "$430,00MXN",
            },
            {
                Articulo: "Camisas EC",
                Talla: "CH-XL",
                Precio: "$405,00MXN",
            },
            {
                Articulo: "Camisas EC",
                Talla: "2XL-3XL",
                Precio: "$430,00MXN",
            },
            {
                Articulo: "Camisas Vendedores RD",
                Talla: "CH-XL",
                Precio: "$405,00MXN",
            },
            {
                Articulo: "Camisas Vendedores RD",
                Talla: "2XL-3XL",
                Precio: "$430,00MXN",
            },
            {
                Articulo: "Total",
                Talla: "",
                Precio: "$3365,00MXN",
            }
        ],
        tableEqDPC: {},
        dataEqDPC: [
            {
                Articulo: "Filipina",
                Talla: "",
                Precio: "$105,00MXN",
            },
            {
                Articulo: "Mandiles",
                Talla: "UNITALLA",
                Precio: "$42,50MXN",
            },
            {
                Articulo: "Gorras",
                Talla: "",
                Precio: "$49,00MXN",
            },
            {
                Articulo: "Playera",
                Talla: "",
                Precio: "$40,50MXN",
            },
            {
                Articulo: "Total",
                Talla: "",
                Precio: "$237,00MXN",
            }
        ],

        //?-----------------------SETs COMPONENTES-----------------------
        setFtgComponentsRotCob: function () {
            var oComponent = MainControllerHelper.getSharedData()._aFragments[13] // Main->ChargeRotationsView.fragment.xml
                .getItems()[0] // VB2_1RotCob
                .getItems()[1]; // tableCostUnif
            this.tableCostUnif = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[13] // Main->ChargeRotationsView.fragment.xml
                .getItems()[1] // VB2_2RotCob
                .getItems()[1]
                .mForwardedAggregations
                .items[0] // iconTabRetail
                .mAggregations
                .content[0]
                .mAggregations
                .items[0]; // tableRetail
            this.tableRetail = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[13] // Main->ChargeRotationsView.fragment.xml
                .getItems()[1] // VB2_2RotCob
                .getItems()[1]
                .mForwardedAggregations
                .items[0] // iconTabRetail
                .mAggregations
                .content[0]
                .mAggregations
                .items[1]; // tableEqRetail
            this.tableEqRetail = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[13] // Main->ChargeRotationsView.fragment.xml
                .getItems()[1] // VB2_2RotCob
                .getItems()[1]
                .mForwardedAggregations
                .items[1] // iconTabRetail
                .mAggregations
                .content[0]
                .mAggregations
                .items[0]; // tableDPC
            this.tableDPC = oComponent;

            oComponent = MainControllerHelper.getSharedData()._aFragments[13] // Main->ChargeRotationsView.fragment.xml
                .getItems()[1] // VB2_2RotCob
                .getItems()[1]
                .mForwardedAggregations
                .items[1] // iconTabRetail
                .mAggregations
                .content[0]
                .mAggregations
                .items[1]; // tableEqDPC
            this.tableEqDPC = oComponent;

            this.setItemsTables();
        },

        setItemsTables: function () {
            this.setItemsTableCostUnif();
            this.setItemsTableRetail();
            this.setItemsTableEqRetail();
            this.setItemsTableDPC();
            this.setItemsTableEqDPC();
        },

        //!---COBRO DE UNIFORMES Y EQ TRABAJO DPC Y RETAIL---
        // Función para hacer set de los items estáticos a la tabla
        setItemsTableCostUnif: function () {
            var oData = this.dataCostUnif;

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: oData });

            var oTable = this.tableCostUnif; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: new ColumnListItem({
                    cells: [ // Celdas con sus textos
                        new Text({
                            text: "{oDataModel>Zona}"
                        }),
                        new Text({
                            text: "{oDataModel>Precio}"
                        }),
                        new Text({
                            text: "{oDataModel>DiasPenal}"
                        }),
                        new Text({
                            text: "{oDataModel>PorcCobro}"
                        }),
                    ]
                })
            });
        },

        //!---COSTO UNIFORMES RETAIL---
        // Función para hacer set de los items estáticos a la tabla
        setItemsTableRetail: function () {
            var oData = this.dataRetail;

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: oData });

            var oTable = this.tableRetail; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: new ColumnListItem({
                    cells: [ // Celdas con sus textos
                        new Text({
                            text: "{oDataModel>Articulo}"
                        }),
                        new Text({
                            text: "{oDataModel>Talla}"
                        }),
                        new Text({
                            text: "{oDataModel>Precio}"
                        }),
                    ]
                })
            });
        },

        //!---COSTO EQ TRABAJO RETAIL---
        // Función para hacer set de los items estáticos a la tabla
        setItemsTableEqRetail: function () {
            var oData = this.dataEqRetail;

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: oData });

            var oTable = this.tableEqRetail; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: new ColumnListItem({
                    cells: [ // Celdas con sus textos
                        new Text({
                            text: "{oDataModel>Articulo}"
                        }),
                        new Text({
                            text: "{oDataModel>Talla}"
                        }),
                        new Text({
                            text: "{oDataModel>Precio}"
                        }),
                    ]
                })
            });
        },

        //!---COSTO UNIFORMES DPC---
        // Función para hacer set de los items estáticos a la tabla
        setItemsTableDPC: function () {
            var oData = this.dataDPC;

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: oData });

            var oTable = this.tableDPC; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: new ColumnListItem({
                    cells: [ // Celdas con sus textos
                        new Text({
                            text: "{oDataModel>Articulo}"
                        }),
                        new Text({
                            text: "{oDataModel>Talla}"
                        }),
                        new Text({
                            text: "{oDataModel>Precio}"
                        }),
                    ]
                })
            });
        },

        //!---COSTO EQ TRABAJO RETAIL---
        // Función para hacer set de los items estáticos a la tabla
        setItemsTableEqDPC: function () {
            var oData = this.dataEqDPC;

            // Actualizar la tabla con los datos filtrados
            var oModel = new JSONModel();
            oModel.setData({ results: oData });

            var oTable = this.tableEqDPC; // Obtener la tabla
            oTable.setModel(oModel, "oDataModel");
            oTable.bindItems({
                path: "oDataModel>/results",
                template: new ColumnListItem({
                    cells: [ // Celdas con sus textos
                        new Text({
                            text: "{oDataModel>Articulo}"
                        }),
                        new Text({
                            text: "{oDataModel>Talla}"
                        }),
                        new Text({
                            text: "{oDataModel>Precio}"
                        }),
                    ]
                })
            });
        },
    };

    return ChargeRotationsControllerHelper;
});