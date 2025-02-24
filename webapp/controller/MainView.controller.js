sap.ui.define([
	//?-----------------------OTROS-----------------------
	"zuniformes/controller/helpers/MainControllerHelper",
	"zuniformes/controller/helpers/PackageControllerHelper",
	"zuniformes/controller/helpers/OperatorControllerHelper",
	"zuniformes/controller/helpers/AspControllerHelper",
	"zuniformes/controller/helpers/InventoryControllerHelper",
	"zuniformes/controller/helpers/GralSizesControllerHelper",
	"zuniformes/controller/helpers/InvSizesControllerHelper",
	"zuniformes/controller/helpers/AssignmentsControllerHelper",
	"zuniformes/controller/helpers/AssigSizesControllerHelper",
	"zuniformes/controller/helpers/InChargeControllerHelper",
	"zuniformes/controller/helpers/InfoDocumentsControllerHelper",
	"zuniformes/controller/helpers/DocumentsControllerHelper",
	"zuniformes/controller/helpers/GraphHelper",
	"zuniformes/controller/helpers/RotationsControllerHelper",
	"zuniformes/controller/helpers/ChargeRotationsControllerHelper",
	"zuniformes/controller/helpers/UsersControllerHelper",
	"zuniformes/controller/helpers/RolesControllerHelper",
	"zuniformes/controller/helpers/PermissionsControllerHelper",
	"zuniformes/auxiliar/formatter",
	//?-----------------------SAP/UI-----------------------
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/ui/core/Fragment',
	//?-----------------------SAP/M-----------------------
	'sap/m/Button',
	'sap/m/ButtonType',
	'sap/m/Dialog',
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	'sap/m/Text',
], function (
	//?-----------------------OTROS-----------------------
	MainControllerHelper,
	PackageControllerHelper,
	OperatorControllerHelper,
	AspControllerHelper,
	InventoryControllerHelper,
	GralSizesControllerHelper,
	InvSizesControllerHelper,
	AssignmentsControllerHelper,
	AssigSizesControllerHelper,
	InChargeControllerHelper,
	InfoDocumentsControllerHelper,
	DocumentsControllerHelper,
	GraphHelper,
	RotationsControllerHelper,
	ChargeRotationsControllerHelper,
	UsersControllerHelper,
	RolesControllerHelper,
	PermissionsControllerHelper,
	formatter,
	//?-----------------------SAP/UI-----------------------
	Controller, JSONModel, Fragment,
	//?-----------------------SAP/M-----------------------
	Button, ButtonType, Dialog, MessageToast, MessageBox, Text
) {
	"use strict";

	return Controller.extend("zuniformes.controller.MainView", {
		//*----------------------------------------------------------------
		//*| GLOBAL VARS                                                  |
		//*----------------------------------------------------------------
		user: null,
		permissions: { // Variable sobre que permisos tiene el usuario principal
			PAQUETES: {
				LEER: false,
				ESCRIBIR: false,
			},
			OPERADORES: {
				LEER: false,
				ESCRIBIR: false,
			},
			ASIG_PAQOP: {
				LEER: false,
				ESCRIBIR: false,
			},
			INVENTARIO: {
				LEER: false,
				ESCRIBIR: false,
			},
			TALLAS_GRAL: {
				LEER: false,
				ESCRIBIR: false,
			},
			TALLAS_INV: {
				LEER: false,
				ESCRIBIR: false,
			},
			ASIGNACIONES: {
				LEER: false,
				ESCRIBIR: false,
			},
			TALLAS_ASIG: {
				LEER: false,
				ESCRIBIR: false,
			},
			ENCARGADOS: {
				LEER: false,
				ESCRIBIR: false,
			},
			EVIDENCIA_INFO: {
				LEER: false,
			},
			EVIDENCIA_DOCS: {
				LEER: false,
			},
			ROTACIONES: {
				LEER: false,
				ESCRIBIR: false,
			},
			ROTACIONES_INFO: {
				LEER: false,
			},
			USUARIOS: {
				LEER: false,
				ESCRIBIR: false,
			},
			ROLES: {
				LEER: false,
				ESCRIBIR: false,
			},
			PERMISOS: {
				LEER: false,
				ESCRIBIR: false,
			},
		},
		indexPages: [ // Variable de guía para el SideNavigation
			"1_home",
			"2_1_packages", "2_2_operators", "2_3_as_paq_op",
			"3_inventory",
			"4_1_sizes", "4_2_sizes",
			"5_1_assignments", "5_2_assignments",
			"6_in_charge",
			"7_1_documents", "7_2_documents",
			"8_1_rotations", "8_2_rotations",
			"9_1_users", "9_2_users", "9_3_users"
		],
		oSideBarModel: new JSONModel({ // Modelo completo del SideNavigation
			"selectedKey": "1_home",
			"navigation": [
				{
					"title": "Inicio",
					"icon": "sap-icon://home",
					"key": "1_home"
				},
				{
					"title": "Paquetes",
					"icon": "sap-icon://product",
					"expanded": false,
					"items": [
						{
							"title": "Administrar Paquetes",
							"key": "2_1_packages",
							"enabled": false
						},
						{
							"title": "Administrar Operadores",
							"key": "2_2_operators",
							"enabled": false
						},
						{
							"title": "Asignación Paq&Oper",
							"key": "2_3_as_paq_op",
							"enabled": false
						}
					]
				},
				{
					"title": "Inventario",
					"icon": "sap-icon://inventory",
					"key": "3_inventory",
					"enabled": false
				},
				{
					"title": "Tallas",
					"icon": "sap-icon://measure",
					"expanded": false,
					"items": [
						{
							"title": "Generales",
							"key": "4_1_sizes",
							"enabled": false
						},
						{
							"title": "En Inventario",
							"key": "4_2_sizes",
							"enabled": false
						}
					]
				},
				{
					"title": "Asignaciones",
					"icon": "sap-icon://add-employee",
					"expanded": false,
					"items": [
						{
							"title": "Administrar Asignaciones",
							"key": "5_1_assignments",
							"enabled": false
						},
						{
							"title": "Tallas Asignadas",
							"key": "5_2_assignments",
							"enabled": false
						}
					]
				},
				{
					"title": "Encargados",
					"icon": "sap-icon://employee",
					"key": "6_in_charge",
					"enabled": false
				},
				{
					"title": "Evidencias",
					"icon": "sap-icon://documents",
					"expanded": false,
					"items": [
						{
							"title": "Administrar Información",
							"key": "7_1_documents",
							"enabled": false
						},
						{
							"title": "Administrar Documentos",
							"key": "7_2_documents",
							"enabled": false
						}
					]
				},
				{
					"title": "Rotaciones",
					"icon": "sap-icon://employee-rejections",
					"expanded": false,
					"items": [
						{
							"title": "Administrar rotaciones",
							"key": "8_1_rotations",
							"enabled": false
						},
						{
							"title": "Visualizar costos",
							"key": "8_2_rotations",
							"enabled": false
						}
					]
				},
				{
					"title": "Usuarios",
					"icon": "sap-icon://user-settings",
					"expanded": true,
					"items": [
						{
							"title": "Administrar usuarios",
							"key": "9_1_users",
							"enabled": false
						},
						{
							"title": "Administrar roles",
							"key": "9_2_users",
							"enabled": false
						},
						{
							"title": "Administrar permisos",
							"key": "9_3_users",
							"enabled": false
						}
					]
				}
			]
		}),
		oComboBoxModelSearch: new JSONModel( // Modelo de búsqueda de los ComboBox
			[
				{
					"type": "Paquete", //0
					"values": [
						{
							"text": "Función",
							"key": "Funcion"
						},
						{
							"text": "Tipo Uniforme",
							"key": "TipoUniforme"
						},
						{
							"text": "Denominación Función",
							"key": "DenomFunc"
						},
						{
							"text": "Paquete",
							"key": "NomPaquete"
						},
						{
							"text": "Descripción",
							"key": "Descripcion"
						},
					]
				},
				{
					"type": "Operador", //1
					"values": [
						{
							"text": "Operador Función",
							"key": "OpFuncion"
						},
						{
							"text": "Tipo Uniforme",
							"key": "TipoUnif"
						},
						{
							"text": "Paquete",
							"key": "Paquete"
						},
						{
							"text": "Descripción",
							"key": "Descripcion"
						},
					]
				},
				{
					"type": "PaqOp", //2
					"values": [
						{
							"text": "ID",
							"key": "IdApo"
						},
						{
							"text": "Función Paquete",
							"key": "Funcion"
						},
						{
							"text": "Paquete",
							"key": "Paquete"
						},
						{
							"text": "Función Operador",
							"key": "OpFuncion"
						},
						{
							"text": "Tipo Uniforme",
							"key": "TipoUnif"
						},
					]
				},
				{
					"type": "Inventario", //3
					"values": [
						{
							"text": "ID",
							"key": "IdInv"
						},
						{
							"text": "Función",
							"key": "Funcion"
						},
						{
							"text": "Artículo",
							"key": "Articulo"
						},
						{
							"text": "Talla General",
							"key": "TallaGral"
						},
						{
							"text": "Color",
							"key": "Color"
						},
						{
							"text": "Logo",
							"key": "Logo"
						},
						{
							"text": "Vida Útil",
							"key": "VidaUtil"
						},
						{
							"text": "Talla 1",
							"key": "Talla1"
						},
						{
							"text": "Precio 1",
							"key": "Precio1"
						},
						{
							"text": "Talla 2",
							"key": "Talla2"
						},
						{
							"text": "Precio 2",
							"key": "Precio2"
						},
						{
							"text": "Talla 3",
							"key": "Talla3"
						},
						{
							"text": "Precio 3",
							"key": "Precio3"
						},
						{
							"text": "Proveedor",
							"key": "Proveedor"
						},
						{
							"text": "Fecha Entrada (dd.MM.yyyy)",
							"key": "FechaEntrada"
						},
						{
							"text": "Cantidad Entrada",
							"key": "CantEnt"
						},
						{
							"text": "Fecha Salida (dd.MM.yyyy)",
							"key": "FechaSalida"
						},
						{
							"text": "Cant Salida",
							"key": "CantSal"
						},
						{
							"text": "Cantidad Total",
							"key": "CantTotal"
						},
					]
				},
				{
					"type": "TaGral", //4
					"values": [
						{
							"text": "ID",
							"key": "IdTaGr"
						},
						{
							"text": "Talla",
							"key": "Talla"
						},
						{
							"text": "Tipo",
							"key": "Tipo"
						},
					]
				},
				{
					"type": "TaInv", //5
					"values": [
						{
							"text": "ID",
							"key": "IdTaInv"
						},
						{
							"text": "ID Inventario",
							"key": "IdInv"
						},
						{
							"text": "Artículo",
							"key": "Articulo"
						},
						{
							"text": "ID Talla General",
							"key": "IdInv"
						},
						{
							"text": "Talla",
							"key": "Talla"
						},
						{
							"text": "ID Asignación",
							"key": "IdAsign"
						},
						{
							"text": "Precio",
							"key": "Precio"
						},
					]
				},
				{
					"type": "Asignaciones", //6
					"values": [
						{
							"text": "ID",
							"key": "IdAsign"
						},
						{
							"text": "ID Info Documento",
							"key": "IdDocEv"
						},
						{
							"text": "ID Talla Inventario",
							"key": "IdTaInv"
						},
						{
							"text": "Encargado",
							"key": "Encargado"
						},
						{
							"text": "Función",
							"key": "Funcion"
						},
						{
							"text": "División",
							"key": "Division"
						},
						{
							"text": "Unidad Organizativa",
							"key": "UnidadOrg"
						},
						{
							"text": "N° Empleado",
							"key": "NoEmp"
						},
						{
							"text": "Tipo Uniforme",
							"key": "TipoUnif"
						},
						{
							"text": "Talla General",
							"key": "TallaGral"
						},
						{
							"text": "Fecha Asignación (dd.MM.yyyy)",
							"key": "FechaAsign"
						},
					]
				},
				{
					"type": "TaAsig", //7
					"values": [
						{
							"text": "ID",
							"key": "IdTaAs"
						},
						{
							"text": "ID Asignación",
							"key": "IdAsign"
						},
						{
							"text": "División",
							"key": "Division"
						},
						{
							"text": "N° Empleado",
							"key": "NoEmp"
						},
						{
							"text": "Nombre Empleado",
							"key": "NombreEmp"
						},
						{
							"text": "Pantalón",
							"key": "Pantalon"
						},
						{
							"text": "Camisa",
							"key": "Camisa"
						},
						{
							"text": "Playera",
							"key": "Playera"
						},
						{
							"text": "Calzado",
							"key": "Calzado"
						},
						{
							"text": "Chamarra",
							"key": "Chamarra"
						},
						{
							"text": "Mandil",
							"key": "Mandil"
						},
						{
							"text": "Bata",
							"key": "Bata"
						},
						{
							"text": "Faja",
							"key": "Faja"
						},
					]
				},
				{
					"type": "Encargados", //8
					"values": [
						{
							"text": "N° Empleado",
							"key": "NoEmp"
						},
						{
							"text": "Nombre",
							"key": "Rh"
						},
						{
							"text": "Ciudad 1",
							"key": "Ciudad1"
						},
						{
							"text": "División 1",
							"key": "Division1"
						},
						{
							"text": "Ciudad 2",
							"key": "Ciudad2"
						},
						{
							"text": "División 2",
							"key": "Division2"
						},
						{
							"text": "Ciudad 3",
							"key": "Ciudad3"
						},
						{
							"text": "División 3",
							"key": "Division3"
						},
					]
				},
				{
					"type": "DocEvidencia", //9
					"values": [
						{
							"text": "ID",
							"key": "IdDocEv"
						},
						{
							"text": "Nombre",
							"key": "Nombre"
						},
						{
							"text": "Fecha Creación (dd.MM.yyyy)",
							"key": "FechaCreacion"
						},
						{
							"text": "Creado Por",
							"key": "CreadoPor"
						},
						{
							"text": "Tamaño Archivo",
							"key": "TamArchivo"
						},
						{
							"text": "ID Objeto",
							"key": "IdObjeto"
						},
					]
				},
				{
					"type": "Rotaciones", //10
					"values": [
						{
							"text": "ID",
							"key": "IdRt"
						},
						{
							"text": "ID Asignación",
							"key": "IdAsign"
						},
						{
							"text": "Fecha Ingreso (dd.MM.yyyy)",
							"key": "FechaIngreso"
						},
						{
							"text": "N° Empleado",
							"key": "NoEmp"
						},
						{
							"text": "Tipo Uniforme",
							"key": "TipoUnif"
						},
						{
							"text": "Fecha Egreso (dd.MM.yyyy)",
							"key": "FechaEgreso"
						},
						{
							"text": "Cantidad",
							"key": "Cantidad"
						},
						{
							"text": "Cuenta",
							"key": "Cuenta"
						},
					]
				},
				{
					"type": "Usuarios", //11
					"values": [
						{
							"text": "N° Empleado",
							"key": "NoEmp"
						},
						{
							"text": "Rol",
							"key": "Rol"
						},
						{
							"text": "Nombre Fiori",
							"key": "Nombre"
						},
					]
				},
				{
					"type": "Roles", //12
					"values": [
						{
							"text": "Rol",
							"key": "Rol"
						},
						{
							"text": "Descripción",
							"key": "Descripcion"
						},
					]
				},
				{
					"type": "Permisos", //13
					"values": [
						{
							"text": "ID",
							"key": "IdPer"
						},
						{
							"text": "Rol",
							"key": "Rol"
						},
					]
				},
			]
		),
		oComboBoxModelCreate: new JSONModel( // Modelo de Form Create de los ComboBox
			[
				{
					"type": "Paquete", // 0
					"values": [
						{
							"Hijos": [ // 0/0
								{
									"text": "SI",
									"key": "SI"
								},
								{
									"text": "NO",
									"key": "NO"
								},
							],
						},
						{
							"Uniforme": [ // 0/1
								{
									"text": "SI",
									"key": "SI"
								},
								{
									"text": "NO",
									"key": "NO"
								},
							],
						},
						{
							"Sociedad": [ // 0/2
								{
									"text": "DPC",
									"key": "DPC"
								},
								{
									"text": "PLANTAS",
									"key": "PLANTAS"
								},
								{
									"text": "RETAIL",
									"key": "RETAIL"
								},
							],
						}
					]
				},
				{
					"type": "Evidencias", // 1
					"values": [
						{
							"text": "Firmado",
							"key": "Firmado"
						},
						{
							"text": "Pendiente",
							"key": "Pendiente"
						},
					]
				},
				{
					"type": "Permisos", // 2
					"values": [
						{
							"Permiso": [ // 2/0
								{
									"text": "LEER",
									"key": "LEER"
								},
								{
									"text": "ESCRIBIR",
									"key": "ESCRIBIR"
								},
							],
						},
						{
							"Catalogo": [ // 2/1
								{
									"text": "PAQUETES",
									"key": "PAQUETES"
								},
								{
									"text": "OPERADORES",
									"key": "OPERADORES"
								},
								{
									"text": "ASIG_PAQOP",
									"key": "ASIG_PAQOP"
								},
								{
									"text": "INVENTARIO",
									"key": "INVENTARIO"
								},
								{
									"text": "TALLAS_GRAL",
									"key": "TALLAS_GRAL"
								},
								{
									"text": "TALLAS_INV",
									"key": "TALLAS_INV"
								},
								{
									"text": "ASIGNACIONES",
									"key": "ASIGNACIONES"
								},
								{
									"text": "TALLAS_ASIG",
									"key": "TALLAS_ASIG"
								},
								{
									"text": "ENCARGADOS",
									"key": "ENCARGADOS"
								},
								{
									"text": "EVIDENCIA_INFO",
									"key": "EVIDENCIA_INFO"
								},
								{
									"text": "EVIDENCIA_DOCS",
									"key": "EVIDENCIA_DOCS"
								},
								{
									"text": "ROTACIONES",
									"key": "ROTACIONES"
								},
								{
									"text": "ROTACIONES",
									"key": "ROTACIONES"
								},
								{
									"text": "ROTACIONES_INFO",
									"key": "ROTACIONES_INFO"
								},
								{
									"text": "USUARIOS",
									"key": "USUARIOS"
								},
								{
									"text": "ROLES",
									"key": "ROLES"
								},
								{
									"text": "PERMISOS",
									"key": "PERMISOS"
								},
							],
						},
					]
				},
			]
		),
		oComboBoxModelUpdate: new JSONModel( // Modelo de Form Update de los ComboBox
			[
				{
					"type": "Paquete", //0
					"values": [
						{
							"Uniforme": [ // 0/0
								{
									"text": "SI",
									"key": "SI"
								},
								{
									"text": "NO",
									"key": "NO"
								},
							],
						},
						{
							"Sociedad": [ // 0/1
								{
									"text": "DPC",
									"key": "DPC"
								},
								{
									"text": "PLANTAS",
									"key": "PLANTAS"
								},
								{
									"text": "RETAIL",
									"key": "RETAIL"
								},
							],
						}
					]
				},
				{
					"type": "Evidencias", // 1
					"values": [
						{
							"text": "Firmado",
							"key": "Firmado"
						},
						{
							"text": "Pendiente",
							"key": "Pendiente"
						},
					]
				},
			]
		),

		// Variables de uso global para guardar componentes en este controlador
		//*----------------------------------------------------------------
		//*| 2_1_PACKAGES	                                              |
		//*----------------------------------------------------------------
		componentsCreatePaq: [],
		componentsUpdatePaq: [],

		//*----------------------------------------------------------------
		//*| 2_2_OPERATORS	                                              |
		//*----------------------------------------------------------------
		componentsCreateOpe: [],
		componentsUpdateOpe: [],

		//*----------------------------------------------------------------
		//*| 2_3_ASIG_PAQ_OP                                              |
		//*----------------------------------------------------------------
		componentsCreateAsp: [],

		//*----------------------------------------------------------------
		//*| 3_INVENTORY	                                              |
		//*----------------------------------------------------------------
		componentsCreateInv: [],
		componentsUpdateInv: [],

		//*----------------------------------------------------------------
		//*| 4_1_SIZES	                                   	              |
		//*----------------------------------------------------------------
		componentsCreateTaGral: [],
		componentsUpdateTaGral: [],

		//*----------------------------------------------------------------
		//*| 4_2_SIZES	                                   	              |
		//*----------------------------------------------------------------
		componentsCreateTaInv: [],
		componentsUpdateTaInv: [],

		//*----------------------------------------------------------------
		//*| 5_1_ASSIGNMENTS                               	              |
		//*----------------------------------------------------------------
		componentsCreateAsig: [],
		componentsUpdateAsig: [],

		//*----------------------------------------------------------------
		//*| 5_2_ASSIGNMENTS                               	              |
		//*----------------------------------------------------------------
		componentsCreateTaAsig: [],

		//*----------------------------------------------------------------
		//*| 6_IN_CHARGE                                 	              |
		//*----------------------------------------------------------------
		componentsCreateEnc: [],
		componentsUpdateEnc: [],

		//*----------------------------------------------------------------
		//*| 7_1_DOCUMENTS                                	              |
		//*----------------------------------------------------------------
		componentsCreateDoc: [],
		fUploaderComponentsCreateDoc: [],

		//*----------------------------------------------------------------
		//*| 7_2_DOCUMENTS	       			                              |
		//*----------------------------------------------------------------
		modelListDoc: [],

		//*----------------------------------------------------------------
		//*| 8_1_ROTATIONS                                	              |
		//*----------------------------------------------------------------
		componentsCreateRot: [],
		componentsUpdateRot: [],

		//*----------------------------------------------------------------
		//*| 9_1_USERS	                                	              |
		//*----------------------------------------------------------------
		componentsCreateUsu: [],

		//*----------------------------------------------------------------
		//*| 9_2_USERS	                                	              |
		//*----------------------------------------------------------------
		componentsCreateRol: [],
		componentsUpdateRol: [],

		//*----------------------------------------------------------------
		//*| 9_3_USERS	                                	              |
		//*----------------------------------------------------------------
		componentsCreatePer: [],

		//*----------------------------------------------------------------
		//*| ONINIT     	                                              |
		//*----------------------------------------------------------------
		onInit: async function () {
			//*----------------------------------------------------------------
			//*| MAIN->ODATA	                                              |
			//*----------------------------------------------------------------
			// Cargar el modelo OData para las tablas
			var oModelOData = this.getOwnerComponent().getModel();
			this.getView().setModel(oModelOData, "oDataModel");

			//*----------------------------------------------------------------
			//*| MAIN->USER		                                              |
			//*----------------------------------------------------------------
			this.user = MainControllerHelper.getUserId();

			//*----------------------------------------------------------------
			//*| MAIN->SHELLBAR	                                              |
			//*----------------------------------------------------------------
			this.shellBar = this.byId("shellBar");
			this.shellBar.setSecondTitle("Bienvenido, " + this.user);

			//*----------------------------------------------------------------
			//*| MAIN->DIALOGS	                          	                  |
			//*----------------------------------------------------------------
			// Mantener la referencia de cualquier díalogo de sap.m.ViewSettingsDialog-s
			this._mViewSettingsDialogs = {};

			//*----------------------------------------------------------------
			//*| MAIN->COMBOBOX	                                              |
			//*----------------------------------------------------------------
			// Set del modelo de búsqueda para los ComboBox
			this.getView().setModel(this.oComboBoxModelSearch, "oComboBoxModelSearch");

			try {
				//*----------------------------------------------------------------
				//*| MAIN->PERMISOS				                                  |
				//*----------------------------------------------------------------
				// Cargar permisos primero
				await this.setUserPermissions();

				//*----------------------------------------------------------------
				//*| MAIN->CONTAINERS                                             |
				//*----------------------------------------------------------------
				// Cargar los contenedores específicamente por permisos
				await this.initializeContainers();

				//*----------------------------------------------------------------
				//*| MAIN->SIDEBAR	                                              |
				//*----------------------------------------------------------------
				// Cargar los modelos necesarios del SideBar: modelo JSON, keys, items, texts
				this.getView().setModel(this.oSideBarModel, "oSideBar");

				//*----------------------------------------------------------------
				//*| MAIN->FRAGMENTS                                              |
				//*----------------------------------------------------------------
				// Inicializar el arreglo de fragmentos de los menús
				this._aFragments = [];

				// Cargar fragmentos
				await this._loadFragments();

				// Mostrar el fragmento inicial
				this._showFragment(0);
			} catch (error) {
				MessageToast.show("Error cargando contenedores y fragmentos: " + error);
			}
		},

		//*----------------------------------------------------------------
		//*| MAIN->PERMISOS				                                  |
		//*----------------------------------------------------------------
		setUserPermissions: function () {
			return new Promise((resolve, reject) => {
				// Obtener datos OData de Usuarios
				MainControllerHelper.getSetOData("UsuariosSet")
					.then((oDataU) => {
						// Filtrar los datos por el usuario actual
						oDataU = oDataU.filter((item) => item.Nombre === this.user);

						// Mapear los roles obtenidos
						var oDataValues = oDataU.map((item) => item.Rol);

						// Obtener datos OData de Permisos
						return MainControllerHelper.getSetOData("PermisosSet").then((oDataP) => {
							// Filtrar los permisos por los roles del usuario
							oDataP = oDataP.filter((item) => oDataValues.includes(item.Rol));

							// Arreglo estático para verificar permisos
							var oArrPer = [
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "PAQUETES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "PAQUETES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "OPERADORES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "OPERADORES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "ASIG_PAQOP";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "ASIG_PAQOP";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "INVENTARIO";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "INVENTARIO";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "TALLAS_GRAL";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "TALLAS_GRAL";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "TALLAS_INV";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "TALLAS_INV";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "ASIGNACIONES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "ASIGNACIONES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "TALLAS_ASIG";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "TALLAS_ASIG";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "ENCARGADOS";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "ENCARGADOS";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "EVIDENCIA_INFO";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "EVIDENCIA_INFO";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "EVIDENCIA_DOCS";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "ROTACIONES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "ROTACIONES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "ROTACIONES_INFO";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "USUARIOS";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "USUARIOS";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "ROLES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "ROLES";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "LEER" && item.Catalogo === "PERMISOS";
								}),
								oDataP.some(function (item) {
									return item.Permiso === "ESCRIBIR" && item.Catalogo === "PERMISOS";
								}),
							];

							// Asignar permisos
							this.permissions.PAQUETES.LEER = oArrPer[0];
							this.permissions.PAQUETES.ESCRIBIR = oArrPer[1];

							this.permissions.OPERADORES.LEER = oArrPer[2];
							this.permissions.OPERADORES.ESCRIBIR = oArrPer[3];

							this.permissions.ASIG_PAQOP.LEER = oArrPer[4];
							this.permissions.ASIG_PAQOP.ESCRIBIR = oArrPer[5];

							this.permissions.INVENTARIO.LEER = oArrPer[6];
							this.permissions.INVENTARIO.ESCRIBIR = oArrPer[7];

							this.permissions.TALLAS_GRAL.LEER = oArrPer[8];
							this.permissions.TALLAS_GRAL.ESCRIBIR = oArrPer[9];

							this.permissions.TALLAS_INV.LEER = oArrPer[10];
							this.permissions.TALLAS_INV.ESCRIBIR = oArrPer[11];

							this.permissions.ASIGNACIONES.LEER = oArrPer[12];
							this.permissions.ASIGNACIONES.ESCRIBIR = oArrPer[13];

							this.permissions.TALLAS_ASIG.LEER = oArrPer[14];
							this.permissions.TALLAS_ASIG.ESCRIBIR = oArrPer[15];

							this.permissions.ENCARGADOS.LEER = oArrPer[16];
							this.permissions.ENCARGADOS.ESCRIBIR = oArrPer[17];

							this.permissions.EVIDENCIA_INFO.LEER = oArrPer[18];
							this.permissions.EVIDENCIA_INFO.ESCRIBIR = oArrPer[19];

							this.permissions.EVIDENCIA_DOCS.LEER = oArrPer[20];

							this.permissions.ROTACIONES.LEER = oArrPer[21];
							this.permissions.ROTACIONES.ESCRIBIR = oArrPer[22];

							this.permissions.ROTACIONES_INFO.LEER = oArrPer[23];

							this.permissions.USUARIOS.LEER = oArrPer[24];
							this.permissions.USUARIOS.ESCRIBIR = oArrPer[25];

							this.permissions.ROLES.LEER = oArrPer[26];
							this.permissions.ROLES.ESCRIBIR = oArrPer[27];

							this.permissions.PERMISOS.LEER = oArrPer[28];
							this.permissions.PERMISOS.ESCRIBIR = oArrPer[29];

							resolve(); // Resolver la promesa cuando todo esté configurado
						});
					})
					.catch((error) => {
						console.error("Error al cargar permisos:", error);
						reject(error); // Rechazar la promesa si ocurre un error
					});
			});
		},

		//*----------------------------------------------------------------
		//*| MAIN->CONTAINERS                                             |
		//*----------------------------------------------------------------
		initializeContainers: async function () {
			return new Promise(async (resolve, reject) => {
				// Obtener los VBox con el id correspondiente de la View principal
				this._oHomeContainer = this.byId("homeContainer");
				// Carga únicamente los contenedores existentes en los permisos del usuario
				// Aliviando el ahorro de recursos en la memoria de la app
				if (this.permissions.PAQUETES.LEER || this.permissions.PAQUETES.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[1].items[0].enabled = true;
					this._o2_1_PackageContainer = this.byId("2_1packageContainer");
				}
				if (this.permissions.PAQUETES.LEER || this.permissions.PAQUETES.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[1].items[0].enabled = true;
					this._o2_1_PackageContainer = this.byId("2_1packageContainer");
				}
				if (this.permissions.OPERADORES.LEER || this.permissions.OPERADORES.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[1].items[1].enabled = true;
					this._o2_2_PackageContainer = this.byId("2_2packageContainer");
				}
				if (this.permissions.ASIG_PAQOP.LEER || this.permissions.ASIG_PAQOP.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[1].items[2].enabled = true;
					this._o2_3_PackageContainer = this.byId("2_3packageContainer");
				}
				if (this.permissions.INVENTARIO.LEER || this.permissions.INVENTARIO.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[2].enabled = true;
					this._o3_InventoryContainer = this.byId("3inventoryContainer");
				}
				if (this.permissions.TALLAS_GRAL.LEER || this.permissions.TALLAS_GRAL.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[3].items[0].enabled = true;
					this._o4_1_SizesContainer = this.byId("4_1sizesContainer");
				}
				if (this.permissions.TALLAS_INV.LEER || this.permissions.TALLAS_INV.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[3].items[1].enabled = true;
					this._o4_2_SizesContainer = this.byId("4_2sizesContainer");
				}
				if (this.permissions.ASIGNACIONES.LEER || this.permissions.ASIGNACIONES.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[4].items[0].enabled = true;
					this._o5_1_AssignContainer = this.byId("5_1assignContainer");
				}
				if (this.permissions.TALLAS_ASIG.LEER || this.permissions.TALLAS_ASIG.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[4].items[1].enabled = true;
					this._o5_2_AssignContainer = this.byId("5_2assignContainer");
				}
				if (this.permissions.ENCARGADOS.LEER || this.permissions.ENCARGADOS.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[5].enabled = true;
					this._o6_InChargeContainer = this.byId("6inChargeContainer");
				}
				if (this.permissions.EVIDENCIA_INFO.LEER || this.permissions.EVIDENCIA_INFO.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[6].items[0].enabled = true;
					this._o7_1_DocumentsContainer = this.byId("7_1documentsContainer");
				}
				if (this.permissions.EVIDENCIA_DOCS.LEER) {
					this.oSideBarModel.oData.navigation[6].items[1].enabled = true;
					this._o7_2_DocumentsContainer = this.byId("7_2documentsContainer");
				}
				if (this._o7_1_DocumentsContainer != undefined || this._o7_2_DocumentsContainer != undefined) {
					// Intenta autenticar en segundo plano
					if (await GraphHelper.getToken) {
						// Llama a Microsoft Graph API con el token
						await GraphHelper.setGraphClient(); // Inicio del cliente de la API Graph
						this.modelListDoc = await GraphHelper.getFiles(); // Modelo global de los archivos de OneDrive
					}
				}
				if (this.permissions.ROTACIONES.LEER || this.permissions.ROTACIONES.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[7].items[0].enabled = true;
					this._o8_1_RotationsContainer = this.byId("8_1rotationsContainer");
				}
				if (this.permissions.ROTACIONES_INFO.LEER) {
					this.oSideBarModel.oData.navigation[7].items[1].enabled = true;
					this._o8_2_RotationsContainer = this.byId("8_2rotationsContainer");
				}
				if (this.permissions.USUARIOS.LEER || this.permissions.USUARIOS.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[8].items[0].enabled = true;
					this._o9_1_UsersContainer = this.byId("9_1usersContainer");
				}
				if (this.permissions.ROLES.LEER || this.permissions.ROLES.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[8].items[1].enabled = true;
					this._o9_2_UsersContainer = this.byId("9_2usersContainer");
				}
				if (this.permissions.PERMISOS.LEER || this.permissions.PERMISOS.ESCRIBIR) {
					this.oSideBarModel.oData.navigation[8].items[2].enabled = true;
					this._o9_3_UsersContainer = this.byId("9_3usersContainer");
				}

				resolve();
			});
		},

		//*----------------------------------------------------------------
		//*| MAIN->FRAGMENTS->SUBFRAGMENTS                                |
		//*----------------------------------------------------------------
		//? NOTA: Ya que es una recarga del MainView, se mantienen guardado
		//? todos los fragmentos principales o páginas secundarias del Navbar,
		//? hasta que se haga una recarga de la app.
		//? Los únicos que no serán iguales son los subfragmentos de Create y Update, etc.
		// Función para cargar los fragmentos de cada item
		_loadFragments: function () {
			// Inicializar los fragmentos en un arreglo
			var aFragmentNames = [
				this._loadFragment("zuniformes.view.1_HomeView"),
				this._loadFragment("zuniformes.view.2_1PackageView"),
				this._loadFragment("zuniformes.view.2_2OperatorView"),
				this._loadFragment("zuniformes.view.2_3AspView"),
				this._loadFragment("zuniformes.view.3_InventoryView"),
				this._loadFragment("zuniformes.view.4_1GralSizesView"),
				this._loadFragment("zuniformes.view.4_2InvSizesView"),
				this._loadFragment("zuniformes.view.5_1AssignmentsView"),
				this._loadFragment("zuniformes.view.5_2AssigSizesView"),
				this._loadFragment("zuniformes.view.6_InChargeView"),
				this._loadFragment("zuniformes.view.7_1InfoDocumentsView"),
				this._loadFragment("zuniformes.view.7_2DocumentsView"),
				this._loadFragment("zuniformes.view.8_1RotationsView"),
				this._loadFragment("zuniformes.view.8_2ChargeRotationsView"),
				this._loadFragment("zuniformes.view.9_1UsersView"),
				this._loadFragment("zuniformes.view.9_2RolesView"),
				this._loadFragment("zuniformes.view.9_3PermissionsView"),
			];

			// Devuelve la promesa que carga todos los fragmentos principales
			return Promise.all(aFragmentNames);
		},

		// Carga los fragmentos por su id y nombre al contenedor
		_loadFragment: function (sFragmentName) {
			//Se obtiene el View ya instanciada en el controlador
			var oView = this.getView();

			//Se carga dicho fragmento por su id y nombre específicamente
			Fragment.load({
				id: oView.getId() + "-" + sFragmentName,
				name: sFragmentName,
				controller: this,
			})
				.then(
					function (oFragment) {
						// Añade todos los fragmentos existentes en el arreglo
						this._aFragments.push(oFragment);

						// Comparte el arreglo que se utiliza en demás Controladores
						MainControllerHelper.setMainFragments(this._aFragments);
					}.bind(this)
				)
				.catch(function (oError) {
					MessageToast.show("Error loading fragment: " + oError);
				});
		},

		// Función para mostrar los fragmentos en sus contenedores específicos
		_showFragment: function (iIndex) {
			// Instancia de this.controller
			var that = this,
				oPagesEnabled = { // Objeto para guardar las condiciones de los permisos otorgados
					isPackageEnabled: that.permissions.PAQUETES.LEER || that.permissions.PAQUETES.ESCRIBIR,
					isOperatorEnabled: that.permissions.OPERADORES.LEER || that.permissions.OPERADORES.ESCRIBIR,
					isAspEnabled: that.permissions.ASIG_PAQOP.LEER || that.permissions.ASIG_PAQOP.ESCRIBIR,
					isInventoryEnabled: that.permissions.INVENTARIO.LEER || that.permissions.INVENTARIO.ESCRIBIR,
					isGralSizesEnabled: that.permissions.TALLAS_GRAL.LEER || that.permissions.TALLAS_GRAL.ESCRIBIR,
					isInvSizesEnabled: that.permissions.TALLAS_INV.LEER || that.permissions.TALLAS_INV.ESCRIBIR,
					isAssignmentsEnabled: that.permissions.ASIGNACIONES.LEER || that.permissions.ASIGNACIONES.ESCRIBIR,
					isAssigSizesEnabled: that.permissions.TALLAS_ASIG.LEER || that.permissions.TALLAS_ASIG.ESCRIBIR,
					isInChargeEnabled: that.permissions.ENCARGADOS.LEER || that.permissions.ENCARGADOS.ESCRIBIR,
					isInfoDocsEnabled: that.permissions.EVIDENCIA_INFO.LEER || that.permissions.EVIDENCIA_INFO.ESCRIBIR,
					isDocsEnabled: that.permissions.EVIDENCIA_DOCS.LEER,
					isRotationsEnabled: that.permissions.ROTACIONES.LEER || that.permissions.ROTACIONES.ESCRIBIR,
					isInfoRotationsEnabled: that.permissions.ROTACIONES_INFO.LEER,
					isUsersEnabled: that.permissions.USUARIOS.LEER || that.permissions.USUARIOS.ESCRIBIR,
					isRolesEnabled: that.permissions.ROLES.LEER || that.permissions.ROLES.ESCRIBIR,
					isPermissionsEnabled: that.permissions.PERMISOS.LEER || that.permissions.PERMISOS.ESCRIBIR
				};

			// Para cada fragmento se buscará dentro de su arreglo por index,
			// volviéndolo visible en el objeto XML
			that._aFragments.forEach(function (oFragment, i) {
				oFragment.setVisible(i === iIndex);
				// Switch dónde se añade al contenedor específico 
				// su fragmento correspondiente, checando por índice y permiso
				switch (i) {
					case 0:
						// Cargar el fragmento al contenedor al abrir la página
						that._oHomeContainer.addItem(oFragment);
						//? Cargar los componentes de la página por defecto
						that.setHomeViewValues();
						break;
					case 1:
						if (oPagesEnabled.isPackageEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o2_1_PackageContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							PackageControllerHelper.setPermissions(
								that.permissions.PAQUETES.LEER,
								that.permissions.PAQUETES.ESCRIBIR
							);
							PackageControllerHelper.setFtgComponentsPaq();
						}
						break;
					case 2:
						if (oPagesEnabled.isOperatorEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o2_2_PackageContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							OperatorControllerHelper.setPermissions(
								that.permissions.OPERADORES.LEER,
								that.permissions.OPERADORES.ESCRIBIR
							);
							OperatorControllerHelper.setFtgComponentsOpe();
						}
						break;
					case 3:
						if (oPagesEnabled.isAspEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o2_3_PackageContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							AspControllerHelper.setPermissions(
								that.permissions.ASIG_PAQOP.LEER,
								that.permissions.ASIG_PAQOP.ESCRIBIR
							);
							AspControllerHelper.setFtgComponentsAsp();
						}
						break;
					case 4:
						if (oPagesEnabled.isInventoryEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o3_InventoryContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							InventoryControllerHelper.setPermissions(
								that.permissions.INVENTARIO.LEER,
								that.permissions.INVENTARIO.ESCRIBIR
							);
							InventoryControllerHelper.setFtgComponentsInv();
						}
						break;
					case 5:
						if (oPagesEnabled.isGralSizesEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o4_1_SizesContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							GralSizesControllerHelper.setPermissions(
								that.permissions.TALLAS_GRAL.LEER,
								that.permissions.TALLAS_GRAL.ESCRIBIR
							);
							GralSizesControllerHelper.setFtgComponentsTaGral();
						}
						break;
					case 6:
						if (oPagesEnabled.isInvSizesEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o4_2_SizesContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							InvSizesControllerHelper.setPermissions(
								that.permissions.TALLAS_INV.LEER,
								that.permissions.TALLAS_INV.ESCRIBIR
							);
							InvSizesControllerHelper.setFtgComponentsTaInv();
						}
						break;
					case 7:
						if (oPagesEnabled.isAssignmentsEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o5_1_AssignContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							AssignmentsControllerHelper.setPermissions(
								that.permissions.ASIGNACIONES.LEER,
								that.permissions.ASIGNACIONES.ESCRIBIR
							);
							AssignmentsControllerHelper.setFtgComponentsAsig();
						}
						break;
					case 8:
						if (oPagesEnabled.isAssigSizesEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o5_2_AssignContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							AssigSizesControllerHelper.setPermissions(
								that.permissions.TALLAS_ASIG.LEER,
								that.permissions.TALLAS_ASIG.ESCRIBIR
							);
							AssigSizesControllerHelper.setFtgComponentsTaAsig();
						}
						break;
					case 9:
						if (oPagesEnabled.isInChargeEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o6_InChargeContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							InChargeControllerHelper.setPermissions(
								that.permissions.ENCARGADOS.LEER,
								that.permissions.ENCARGADOS.ESCRIBIR
							);
							InChargeControllerHelper.setFgtComponentsEnc();
						}
						break;
					case 10:
						if (oPagesEnabled.isInfoDocsEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o7_1_DocumentsContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							InfoDocumentsControllerHelper.setPermissions(
								that.permissions.EVIDENCIA_INFO.LEER,
								that.permissions.EVIDENCIA_INFO.ESCRIBIR
							);
							InfoDocumentsControllerHelper.setFgtComponentsDoc();
						}
						break;
					case 11:
						if (oPagesEnabled.isDocsEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o7_2_DocumentsContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							var oModelListDoc = new JSONModel(); // Modelo JSON
							// Set de los datos obtenidos de los archivos de OneDrive
							oModelListDoc.setData({ DocumentsSet: that.modelListDoc });
							DocumentsControllerHelper.setFgtComponentsDoc(oModelListDoc);
						}
						break;
					case 12:
						if (oPagesEnabled.isRotationsEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o8_1_RotationsContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							RotationsControllerHelper.setPermissions(
								that.permissions.ROTACIONES.LEER,
								that.permissions.ROTACIONES.ESCRIBIR
							);
							RotationsControllerHelper.setFgtComponentsRot();
						}
						break;
					case 13:
						if (oPagesEnabled.isInfoRotationsEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o8_2_RotationsContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							ChargeRotationsControllerHelper.setFtgComponentsRotCob();
						}
						break;
					case 14:
						if (oPagesEnabled.isUsersEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o9_1_UsersContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							UsersControllerHelper.setPermissions(
								that.permissions.USUARIOS.LEER,
								that.permissions.USUARIOS.ESCRIBIR
							);
							UsersControllerHelper.setFtgComponentsUsu();
						}
						break;
					case 15:
						if (oPagesEnabled.isRolesEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o9_2_UsersContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							RolesControllerHelper.setPermissions(
								that.permissions.ROLES.LEER,
								that.permissions.ROLES.ESCRIBIR
							);
							RolesControllerHelper.setFtgComponentsRol();
						}
						break;
					case 16:
						if (oPagesEnabled.isPermissionsEnabled) {
							// Cargar el fragmento al contenedor al abrir la página
							that._o9_3_UsersContainer.addItem(oFragment);
							//? Cargar los componentes de la página por defecto
							PermissionsControllerHelper.setPermissions(
								that.permissions.PERMISOS.LEER,
								that.permissions.PERMISOS.ESCRIBIR
							);
							PermissionsControllerHelper.setFtgComponentsPer();
						}
						break;
				}
			});
		},

		//*----------------------------------------------------------------
		//*| MAIN->SIDEBAR	                                              |
		//*----------------------------------------------------------------
		// Función para seleccionar los items en el Navbar
		onItemSelect: function (oEvent) {
			var item = oEvent.getParameter('item'); // Parámetro para obtener el item seleccionado
			// Ir hacia al item seleccionado
			this.byId("pageContainer").to(this.getView().createId(item.getKey()));
			// Mandar el index del item seleccionado
			this.onIndexSelect(item.getKey());
		},

		// Función para pasar el index del Navbar seleccionado y, 
		// mostrar dicho fragmento en su contenedor
		onIndexSelect: function (oItem) {
			var that = this;
			// ForEach para comprobar item seleccionado
			that.indexPages.forEach(function (oPages, i) {
				if (oItem == oPages) {
					that._showFragment(i); // Mostrar fragmento
				}
			});
		},

		// Función para expandir el Navbar
		onMenuButtonPress: function () {
			var mainPage = this.byId("mainPage");
			// Expandir o no el item que sea expandible
			mainPage.setSideExpanded(!mainPage.getSideExpanded());
		},

		//*----------------------------------------------------------------
		//*| DIALOGS		                                              |
		//*----------------------------------------------------------------
		// Función para crear los díalogos
		createViewSettingsDialog: function (sDialogFragmentName) {
			var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
				this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;
			}
			return oDialog;
		},

		//*----------------------------------------------------------------
		//*| 1_HOME_VIEW	                                              |
		//*----------------------------------------------------------------
		setHomeViewValues: function () {
			// Modelo de valores dinámicos de la longitud del arreglo OData
			// de cada tabla, para la página HOME_VIEW
			var oHomeViewValues = new JSONModel({
				"Paquete": MainControllerHelper.getSetOData("PaqueteSet")
					.then(function (result) {
						return result.length;
					}),
				"Operadores": MainControllerHelper.getSetOData("PaqOpSet")
					.then(function (result) {
						return result.length;
					}),
				"Inventario": MainControllerHelper.getSetOData("InventarioSet")
					.then(function (result) {
						return result.length;
					}),
				"TallasGrl": MainControllerHelper.getSetOData("TallasGrlSet")
					.then(function (result) {
						return result.length;
					}),
				"TallasInv": MainControllerHelper.getSetOData("TallasInvSet")
					.then(function (result) {
						return result.length;
					}),
				"Asignaciones": MainControllerHelper.getSetOData("AsignacionSet")
					.then(function (result) {
						return result.length;
					}),
				"TallasAsig": MainControllerHelper.getSetOData("TallasAsigSet")
					.then(function (result) {
						return result.length;
					}),
				"Encargados": MainControllerHelper.getSetOData("EncargadosSet")
					.then(function (result) {
						return result.length;
					}),
				"Evidencias": MainControllerHelper.getSetOData("DocEvidenciaSet")
					.then(function (result) {
						return result.length;
					}),
				"Rotaciones": MainControllerHelper.getSetOData("RotTempSet")
					.then(function (result) {
						return result.length;
					}),
			})
			this.getView().setModel(oHomeViewValues, "oHomeViewValues");
		},

		//*----------------------------------------------------------------
		//*| 2_1_PACKAGES	                                              |
		//*----------------------------------------------------------------
		//! NOTA: MAYORÍA DE LOS MÉTODOS SON REDIRECTORIOS A LA CLASE HELPER CORRESPONDIENTE

		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVPaq: function () {
			PackageControllerHelper.downloadAllCSVPaq();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVPaq: function () {
			PackageControllerHelper.downloadSelectedCSVPaq();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVPaq: function () {
			PackageControllerHelper.downloadTemplateCSVPaq();
		},

		// Función para subir archivo CSV
		uploadCSVPaq: function () {
			PackageControllerHelper.uploadCSVPaq();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnPaq

		// Función para el díalogo Create
		onCreateDialogPaq: function () {
			var that = this,
				sharedData = PackageControllerHelper.getSharedData();

			PackageControllerHelper.setFgtCreatePaq(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.2_1CreateForm",
					"zuniformes.view.2_1CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo paquete',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtPackageCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					enabled: false,
					press: function () {
						var oComponents = [
							sharedData.inpCreateFuncion.getValue().replace(/[_]/g, ""),
							PackageControllerHelper.onChangeCreateHijos(),
							PackageControllerHelper.onChangeCreateUniforme(),
							sharedData.inpCreateTipoUniforme.getValue(),
							PackageControllerHelper.onChangeCreateSociedad(),
							sharedData.inpCreateDenomFuncion.getValue(),
							sharedData.inpCreateNomPaquete.getValue(),
							sharedData.inpCreateDescripcion.getValue()
						]

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						var request = "PaqueteSet(Funcion='" + oComponents[0] + "')";

						MainControllerHelper.getOData(request) // Llamada GET para comprobar existencia
							.then(function (result) {
								if (result !== undefined) { // Si no resulta indefinida la consulta
									MessageBox.error("¡Paquete ya existente, ingrese uno nuevo!", {
										title: "Error",                                      // default
										onClose: null,                                       // default
										styleClass: "",                                      // default
										initialFocus: null,                                  // default
										textDirection: sap.ui.core.TextDirection.Inherit     // default
									});
								} else { // Si resulta indefinida sin datos
									//! ----------------------------SEGUNDA PROMESA----------------------------
									//! ----------------------------POST----------------------------
									// Llamamos al método postMultipleOData, por el nombre de la entidad
									// y el JSON referente a sus campos para insertar
									MainControllerHelper.postMultipleOData(
										"PAQUETE", "MOD",
										[{
											B1: oComponents[0], //FUNCION
											B2: oComponents[1], //HIJOS
											B3: oComponents[2], //UNIFORME
											B4: oComponents[3], //TIPO_UNIFORME
											B5: oComponents[4], //SOCIEDAD
											B6: oComponents[5], //DENOM_FUNC
											B7: oComponents[6], //PAQUETE
											B8: oComponents[7] //DESCRIPCION
										}]
									).then(() => {
										// Mensaje de éxito, se cierra y se destruye el Dialog
										MessageToast.show('¡Paquete agregado exitosamente!');
										that.handleResetBtnConfirmPaq();
									}).catch(() => {
										// Aquí hubo un error, puedes manejar el error
										MessageToast.show("Error al modificar el registro");
									});
								}
							});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Agregar el modelo Create para los ComboBox
			dialog.setModel(that.oComboBoxModelCreate, "oComboBoxModelCreate");

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnPaq(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnPaq: function (oBeginButton) {
			var sharedData = PackageControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				if (
					// Primera combinación de Hijos y TipoUnif
					(
						PackageControllerHelper.onChangeCreateHijos() === 'SI' &&
						sharedData.inpCreateTipoUniforme.getValue() === ''
					) ||
					// Segunda combinación de Hijos y TipoUnif
					(
						PackageControllerHelper.onChangeCreateHijos() === 'NO' &&
						sharedData.inpCreateTipoUniforme.getValue().length > 0
					)
				) {
					// Se debe de comprobar las combinaciones de arriba
					// luego confirmar las demás simples
					oBeginButton.setEnabled(
						sharedData.inpCreateFuncion.getValue().length > 0 &&
						sharedData.inpCreateDenomFuncion.getValue().length > 0 &&
						sharedData.inpCreateNomPaquete.getValue().length > 0
					);
				} else {
					oBeginButton.setEnabled(false);
				}
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreatePaq = [
				sharedData.inpCreateFuncion,
				sharedData.inpCreateTipoUniforme,
				sharedData.inpCreateDenomFuncion,
				sharedData.inpCreateNomPaquete,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oComponentsBinding = [
				this.componentsCreatePaq[0].getId(),
				this.componentsCreatePaq[1].getId(),
				this.componentsCreatePaq[2].getId(),
				this.componentsCreatePaq[3].getId(),
			];

			// Asignar eventos 'change' a los inputs
			oComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(
					component
				).attachChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		// Función que retorna la key del ComboBox
		onChangeCreateHijos: function () {
			PackageControllerHelper.onChangeCreateHijos();
		},

		// Función que retorna la key del ComboBox
		onChangeCreateUniforme: function () {
			PackageControllerHelper.onChangeCreateUniforme();
		},

		// Función que retorna la key del ComboBox
		onChangeCreateSociedad: function () {
			PackageControllerHelper.onChangeCreateSociedad();
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnPaq

		// Función para el díalogo Update
		onUpdateDialogPaq: function () {
			var that = this,
				sharedData = PackageControllerHelper.getSharedData();

			PackageControllerHelper.setFgtUpdatePaq(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.2_1UpdateForm",
					"zuniformes.view.2_1UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar paquete',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtPackageUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					press: function () {
						var oComponents = [
							sharedData.inpUpdateFuncion.getValue(), //FUNCION
							PackageControllerHelper.onChangeUpdateUniforme(), //UNIFORME
							sharedData.inpUpdateTipoUniforme.getValue(), //TIPO_UNIFORME
							PackageControllerHelper.onChangeUpdateSociedad(), //SOCIEDAD
							sharedData.inpUpdateDenomFuncion.getValue(), //DENOM_FUNC
							sharedData.inpUpdateNomPaquete.getValue(), //PAQUETE
							sharedData.inpUpdateDescripcion.getValue() //DESCRIPCION
						]

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para modificar
						MainControllerHelper.postMultipleOData(
							"PAQUETE", "MOD",
							[{
								B1: oComponents[0], //FUNCION
								B3: oComponents[1], //UNIFORME
								B4: oComponents[2], //TIPO_UNIFORME
								B5: oComponents[3], //SOCIEDAD
								B6: oComponents[4], //DENOM_FUNC
								B7: oComponents[5], //PAQUETE
								B8: oComponents[6] //DESCRIPCION		
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Paquete modificado exitosamente!');
							// Reinicio de datos referenciados actualizados
							that.handleResetBtnConfirmPaq();
							that.handleResetBtnConfirmAsp();
							that.handleResetBtnConfirmTaAsig();
							that.handleResetBtnConfirmAsig();
							that.handleResetBtnConfirmRot();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Agregar el modelo Create para los ComboBox
			dialog.setModel(that.oComboBoxModelUpdate, "oComboBoxModelUpdate");

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnPaq(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnPaq: function (oBeginButton) {
			var sharedData = PackageControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				if (
					// Primera combinación de Hijos y TipoUnif
					(
						sharedData.inpUpdateHijos.getValue() === 'SI' &&
						sharedData.inpUpdateTipoUniforme.getValue() === ''
					) ||
					// Segunda combinación de Hijos y TipoUnif
					(
						sharedData.inpUpdateHijos.getValue() === 'NO' &&
						sharedData.inpUpdateTipoUniforme.getValue().length > 0
					)
				) {
					// Se debe de comprobar las combinaciones de arriba
					// luego confirmar las demás simples
					oBeginButton.setEnabled(
						sharedData.inpUpdateDenomFuncion.getValue().length > 0 &&
						sharedData.inpUpdateNomPaquete.getValue().length > 0
					);
				} else {
					oBeginButton.setEnabled(false);
				}
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdatePaq = [
				sharedData.inpUpdateHijos,
				sharedData.inpUpdateTipoUniforme,
				sharedData.inpUpdateDenomFuncion,
				sharedData.inpUpdateNomPaquete,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsUpdatePaq.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		// Función que retorna la key del ComboBox
		onChangeUpdateUniforme: function () {
			PackageControllerHelper.onChangeUpdateUniforme();
		},

		// Función que retorna la key del ComboBox
		onChangeUpdateSociedad: function () {
			PackageControllerHelper.onChangeUpdateSociedad();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogPaq: function () {
			PackageControllerHelper.onDeleteDialogPaq();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangePaq: function () {
			PackageControllerHelper.onChangePaq();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldPaq: function () {
			PackageControllerHelper.handleSearchFieldPaq();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedPaq: function () {
			this.createViewSettingsDialog("zuniformes.view.2_1SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmPaq: function (oEvent) {
			PackageControllerHelper.handleSortDialogConfirmPaq(oEvent);
		},

		//?-----------------------FILTER-----------------------
		// Función para abrir el díalogo de Filter correspondiente
		handleFilterBtnPressedPaq: function () {
			this.createViewSettingsDialog("zuniformes.view.2_1FilterDialog").open();
		},

		// Función para filtrar datos de las tablas por columna
		handleFilterDialogConfirmPaq: function (oEvent) {
			PackageControllerHelper.handleFilterDialogConfirmPaq(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmPaq: function () {
			PackageControllerHelper.handleResetBtnConfirmPaq();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemPaq: function (oEvent) {
			PackageControllerHelper.onSelectedItemPaq(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 2_2_OPERATORS	                                              |
		//*----------------------------------------------------------------
		//! NOTA: MAYORÍA DE LOS MÉTODOS SON REDIRECTORIOS A LA CLASE HELPER CORRESPONDIENTE

		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVOpe: function () {
			OperatorControllerHelper.downloadAllCSVOpe();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVOpe: function () {
			OperatorControllerHelper.downloadSelectedCSVOpe();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVOpe: function () {
			OperatorControllerHelper.downloadTemplateCSVOpe();
		},

		// Función para subir archivo CSV
		uploadCSVOpe: function () {
			OperatorControllerHelper.uploadCSVOpe();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnOpe

		// Función para el díalogo Create
		onCreateDialogOpe: function () {
			var that = this,
				sharedData = OperatorControllerHelper.getSharedData();

			OperatorControllerHelper.setFgtCreateOpe(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.2_2CreateForm",
					"zuniformes.view.2_2CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo operador',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtOperatorCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					press: function () {
						var oComponents = [
							sharedData.inpCreateTipoUniforme.getValue(),
							sharedData.inpCreatePaquete.getValue(),
							sharedData.inpCreateDescripcion.getValue()
						];

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para insertar
						MainControllerHelper.postMultipleOData(
							"OPERADOR", "MOD",
							[{
								B2: oComponents[0], //TIPO_UNIF
								B3: oComponents[1], //PAQUETE
								B4: oComponents[2], //DESCRIPCION
							}]
						).then(() => {
							// Aquí la promesa fue exitosa, puedes manejar el resultado
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('Operadore(s) agregados exitosamente!');

							that.handleResetBtnConfirmOpe();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnOpe(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnOpe: function (oBeginButton) {
			var sharedData = OperatorControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateTipoUniforme.getValue().length > 0 &&
					sharedData.inpCreatePaquete.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateOpe = [
				sharedData.inpCreateTipoUniforme,
				sharedData.inpCreatePaquete
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsCreateOpe.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnOpe

		// Función para el díalogo Update
		onUpdateDialogOpe: function () {
			var that = this,
				sharedData = OperatorControllerHelper.getSharedData();

			OperatorControllerHelper.setFgtUpdateOpe(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.2_2UpdateForm",
					"zuniformes.view.2_2UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar operador',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtOperatorUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					press: function () {
						var oComponents = [
							sharedData.inpUpdateOpFuncion.getValue(), //OP_FUNCION
							sharedData.inpUpdateTipoUniforme.getValue(), //TIPO_UNIF
							sharedData.inpUpdatePaquete.getValue(), //PAQUETE
							sharedData.inpUpdateDescripcion.getValue() //DESCRIPCION
						]

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para modificar
						MainControllerHelper.postMultipleOData(
							"OPERADOR", "MOD",
							[{
								B1: oComponents[0], //OP_FUNCION
								B2: oComponents[1], //TIPO_UNIF
								B3: oComponents[2], //PAQUETE
								B4: oComponents[3] //DESCRIPCION
							}]
						).then(() => {
							// Aquí la promesa fue exitosa, puedes manejar el resultado
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('Operadore(s) agregados exitosamente!');
							// Reinicio de datos referenciados actualizados
							that.handleResetBtnConfirmOpe();
							that.handleResetBtnConfirmAsp();
							that.handleResetBtnConfirmAsig();
							that.handleResetBtnConfirmRot();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnOpe(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnOpe: function (oBeginButton) {
			var sharedData = OperatorControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpUpdateTipoUniforme.getValue().length > 0 &&
					sharedData.inpUpdatePaquete.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdateOpe = [
				sharedData.inpUpdateTipoUniforme,
				sharedData.inpUpdatePaquete,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsUpdateOpe.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogOpe: function () {
			OperatorControllerHelper.onDeleteDialogOpe();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeOpe: function () {
			OperatorControllerHelper.onChangeOpe();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldOpe: function () {
			OperatorControllerHelper.handleSearchFieldOpe();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedOpe: function () {
			this.createViewSettingsDialog("zuniformes.view.2_2SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmOpe: function (oEvent) {
			OperatorControllerHelper.handleSortDialogConfirmOpe(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmOpe: function () {
			OperatorControllerHelper.handleResetBtnConfirmOpe();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemOpe: function (oEvent) {
			OperatorControllerHelper.onSelectedItemOpe(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 2_3_ASIG_PAQ_OP                                              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVAsp: function () {
			AspControllerHelper.downloadAllCSVAsp();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVAsp: function () {
			AspControllerHelper.downloadSelectedCSVAsp();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVAsp: function () {
			AspControllerHelper.downloadTemplateCSVAsp();
		},

		// Función para subir archivo CSV
		uploadCSVAsp: function () {
			AspControllerHelper.uploadCSVAsp();
		},

		//?-----------------------CREATE-----------------------
		// Función para el díalogo Create
		onCreateDialogAsp: function () {
			AspControllerHelper.setFtgCreateAsp(sap.ui.xmlfragment(
				this.getView().getId() + "-zuniformes.view.2_3CreateNav",
				"zuniformes.view.2_3CreateNav",
				this
			));
			AspControllerHelper.onCreateDialogAsp(this.oComboBoxModelSearch);
		},

		// Función Nav para la página
		handleNavAsp: function (oEvent) {
			AspControllerHelper.handleNavAsp(oEvent);
		},

		//!---PAQUETE---
		// Función para seleccionar filas de la tabla
		onSelectedItemAspPaq: function (oEvent) {
			AspControllerHelper.onSelectedItemAspPaq(oEvent);
		},

		// Función para obtener el valor del ComboBox
		onChangeAspPaq: function () {
			AspControllerHelper.onChangeAspPaq();
		},

		// Función para buscar por SearchField
		handleSearchFieldAspPaq: function () {
			AspControllerHelper.handleSearchFieldAspPaq();
		},

		//!---OPERADOR---
		// Función para seleccionar filas de la tabla
		onSelectedItemAspOpe: function (oEvent) {
			AspControllerHelper.onSelectedItemAspOpe(oEvent);
		},

		// Función para obtener el valor del ComboBox
		onChangeAspOpe: function () {
			AspControllerHelper.onChangeAspOpe();
		},

		// Función para buscar por SearchField
		handleSearchFieldAspOpe: function () {
			AspControllerHelper.handleSearchFieldAspOpe();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogAsp: function () {
			AspControllerHelper.onDeleteDialogAsp();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeAsp: function () {
			AspControllerHelper.onChangeAsp();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldAsp: function () {
			AspControllerHelper.handleSearchFieldAsp();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedAsp: function () {
			this.createViewSettingsDialog("zuniformes.view.2_3SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmAsp: function (oEvent) {
			AspControllerHelper.handleSortDialogConfirmAsp(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmAsp: function () {
			AspControllerHelper.handleResetBtnConfirmAsp();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemAsp: function (oEvent) {
			AspControllerHelper.onSelectedItemAsp(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 3_INVENTORY	                                              |
		//*----------------------------------------------------------------
		//! NOTA: MAYORÍA DE LOS MÉTODOS SON REDIRECTORIOS A LA CLASE HELPER CORRESPONDIENTE

		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVInv: function () {
			InventoryControllerHelper.downloadAllCSVInv();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVInv: function () {
			InventoryControllerHelper.downloadSelectedCSVInv();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVInv: function () {
			InventoryControllerHelper.downloadTemplateCSVInv();
		},

		// Función para subir archivo CSV
		uploadCSVInv: function () {
			InventoryControllerHelper.uploadCSVInv();
		},

		//?-----------------------STOCK-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableStockBeginBtnInv

		// Función para el díalogo Stock
		onStockDialogInv: function () {
			var that = this,
				sharedData = InventoryControllerHelper.getSharedData();

			InventoryControllerHelper.setFgtStockInv(sap.ui.xmlfragment(
				this.getView().getId() + "-zuniformes.view.3_StockForm",
				"zuniformes.view.3_StockForm",
				this
			));

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo stock',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtInventoryStock
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					press: function () {
						var oComponents = [
							sharedData.inpStockIdInv.getValue(),
							sharedData.inpStockCantEnt.getValue()
						];

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para insertar
						MainControllerHelper.postMultipleOData(
							"INVENTARIO", "STOCK",
							[{
								B1: oComponents[0], //ID_INV
								B2: oComponents[1], //CANT_ENTR
							}]
						).then(() => {
							// Aquí la promesa fue exitosa, puedes manejar el resultado
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('Stock actualizado exitosamente!');

							that.handleResetBtnConfirmInv();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableStockBeginBtnInv(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableStockBeginBtnInv: function (oBeginButton) {
			var sharedData = InventoryControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpStockCantEnt.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsStockInv = [
				sharedData.inpStockCantEnt,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsStockInv.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnInv

		// Función para el díalogo Create
		onCreateDialogInv: function () {
			var that = this,
				sharedData = InventoryControllerHelper.getSharedData();

			InventoryControllerHelper.setFgtCreateInv(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.3_CreateForm",
					"zuniformes.view.3_CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo inventario',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtInventoryCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					enabled: false,
					press: function () {
						var oComponents = [
							sharedData.inpCreateFuncion.getValue(),
							sharedData.inpCreateDivision.getValue(),
							sharedData.inpCreateArticulo.getValue(),
							sharedData.inpCreateTallaGral.getValue(),
							sharedData.inpCreateColor.getValue(),
							sharedData.inpCreateTipo.getValue(),
							sharedData.inpCreateLogo.getValue(),
							sharedData.inpCreateVidaUtil.getValue(),
							sharedData.inpCreateTalla1.getValue(),
							sharedData.inpCreatePrecio1.getValue(),
							sharedData.inpCreateTalla2.getValue(),
							sharedData.inpCreatePrecio2.getValue(),
							sharedData.inpCreateTalla3.getValue(),
							sharedData.inpCreatePrecio3.getValue(),
							sharedData.inpCreateProveedor.getValue(),
							formatter.oDateToDats.format(
								sharedData.dPickCreateFechaEntr.getDateValue()
							),
							sharedData.inpCreateCantEntr.getValue(),
						];

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para insertar
						MainControllerHelper.postMultipleOData(
							"INVENTARIO", "MOD",
							[{
								B2: oComponents[0], //FUNCION
								B3: oComponents[1], //DIVISION
								B4: oComponents[2], //ARTICULO
								B5: oComponents[3], //TALLA_GRAL
								B6: oComponents[4], //COLOR 
								B7: oComponents[5], //TIPO
								B8: oComponents[6], //LOGO
								B9: oComponents[7], //VIDA_UTIL
								B10: oComponents[8], //TALLA1
								B11: oComponents[9], //PRECIO1
								B12: oComponents[10], //TALLA2
								B13: oComponents[11], //PRECIO2
								B14: oComponents[12], //TALLA3
								B15: oComponents[13], //PRECIO3
								B16: oComponents[14], //PROVEEDOR
								B17: oComponents[15], //FECHA_ENTR
								B18: oComponents[16], //CANT_ENTR
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Inventario agregado exitosamente!');
							that.handleResetBtnConfirmInv();
						}).catch(() => {
							// Aquí hubo un error, puedes manejar el error
							MessageToast.show("Error al modificar el registro");
						});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnInv(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnInv: function (oBeginButton) {
			var sharedData = InventoryControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateFuncion.getValue().length > 0 &&
					sharedData.inpCreateArticulo.getValue().length > 0 &&
					sharedData.inpCreateTallaGral.getValue().length > 0 &&
					sharedData.inpCreateTipo.getValue().length > 0 &&
					sharedData.inpCreateVidaUtil.getValue().length > 0 &&
					sharedData.inpCreateTalla1.getValue().length > 0 &&
					sharedData.inpCreatePrecio1.getValue().length > 0 &&
					sharedData.inpCreateProveedor.getValue().length > 0 &&
					sharedData.dPickCreateFechaEntr.getValue().length > 0 &&
					sharedData.inpCreateCantEntr.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateInv = [
				sharedData.inpCreateFuncion,
				sharedData.inpCreateArticulo,
				sharedData.inpCreateTallaGral,
				sharedData.inpCreateTipo,
				sharedData.inpCreateVidaUtil,
				sharedData.inpCreateTalla1,
				sharedData.inpCreatePrecio1,
				sharedData.inpCreateProveedor,
				sharedData.dPickCreateFechaEntr,
				sharedData.inpCreateCantEntr,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oComponentsBinding = [
				this.componentsCreateInv[0].getId(),
				this.componentsCreateInv[1].getId(),
				this.componentsCreateInv[2].getId(),
				this.componentsCreateInv[3].getId(),
				this.componentsCreateInv[4].getId(),
				this.componentsCreateInv[5].getId(),
				this.componentsCreateInv[6].getId(),
				this.componentsCreateInv[7].getId(),
				this.componentsCreateInv[8].getId(),
				this.componentsCreateInv[9].getId(),
			];

			// Asignar eventos 'change' a los inputs
			oComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(
					component
				).attachChange(checkInputValues);
			});
		},

		// Función para accionar desde el ValueHelp del input
		handleValueHelpPaqInv: function () {
			InventoryControllerHelper.handleValueHelpPaqInv();
		},

		// Función para accionar desde el ValueHelp del input
		handleValueHelpCreateTaGral: function () {
			InventoryControllerHelper.handleValueHelpCreateTaGral();
		},

		// Función para accionar desde el ValueHelp del input
		handleValueHelpCreateTipo: function () {
			InventoryControllerHelper.handleValueHelpCreateTipo();
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnInv

		// Función para el díalogo Update
		onUpdateDialogInv: function () {
			var that = this,
				sharedData = InventoryControllerHelper.getSharedData();

			InventoryControllerHelper.setFgtUpdateInv(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.3_UpdateForm",
					"zuniformes.view.3_UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar inventario',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtInventoryUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					enabled: true,
					press: function () {
						var fechaEntrada = formatter.oDateToDats.format(
							sharedData.dPickUpdateFechaEntr.getDateValue()
						);

						var oComponents = [
							sharedData.inpUpdateIdInv.getValue(), //0
							sharedData.inpUpdateFuncion.getValue(), //1
							sharedData.inpUpdateDivision.getValue(), //2
							sharedData.inpUpdateArticulo.getValue(), //3
							sharedData.inpUpdateTallaGral.getValue(), //4
							sharedData.inpUpdateColor.getValue(), //5
							sharedData.inpUpdateTipo.getValue(), //6
							sharedData.inpUpdateLogo.getValue(), //7
							sharedData.inpUpdateVidaUtil.getValue(), //8
							sharedData.inpUpdateTalla1.getValue(), //9
							sharedData.inpUpdatePrecio1.getValue(), //10
							sharedData.inpUpdateTalla2.getValue(), //11
							sharedData.inpUpdatePrecio2.getValue(), //12
							sharedData.inpUpdateTalla3.getValue(), //13
							sharedData.inpUpdatePrecio3.getValue(), //14
							sharedData.inpUpdateProveedor.getValue(), //15
							fechaEntrada,
							sharedData.inpUpdateCantEntr.getValue(), //17
						];

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para insertar
						MainControllerHelper.postMultipleOData(
							"INVENTARIO", "MOD",
							[{
								B1: oComponents[0], //ID_INV
								B2: oComponents[1], //FUNCION
								B3: oComponents[2], //DIVISION
								B4: oComponents[3], //ARTICULO
								B5: oComponents[4], //TALLA_GRAL
								B6: oComponents[5], //COLOR 
								B7: oComponents[6], //TIPO
								B8: oComponents[7], //LOGO
								B9: oComponents[8], //VIDA_UTIL
								B10: oComponents[9], //TALLA1
								B11: oComponents[10], //PRECIO1
								B12: oComponents[11], //TALLA2
								B13: oComponents[12], //PRECIO2
								B14: oComponents[13], //TALLA3
								B15: oComponents[14], //PRECIO3
								B16: oComponents[15], //PROVEEDOR
								B17: oComponents[16], //FECHA_ENTR
								B18: oComponents[17], //CANT_ENTR
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Inventario modificado exitosamente!');
							// Reinicio de datos referenciados actualizados
							that.handleResetBtnConfirmInv();
							that.handleResetBtnConfirmAsig();
							that.handleResetBtnConfirmTaInv();
						}).catch(() => {
							// Aquí hubo un error, puedes manejar el error
							MessageToast.show("Error al modificar el registro");
						});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnInv(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnInv: function (oBeginButton) {
			var sharedData = InventoryControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpUpdateArticulo.getValue().length > 0 &&
					sharedData.inpUpdateTallaGral.getValue().length > 0 &&
					sharedData.inpUpdateTipo.getValue().length > 0 &&
					sharedData.inpUpdateVidaUtil.getValue().length > 0 &&
					sharedData.inpUpdateTalla1.getValue().length > 0 &&
					sharedData.inpUpdatePrecio1.getValue().length > 0 &&
					sharedData.inpUpdateProveedor.getValue().length > 0 &&
					sharedData.dPickUpdateFechaEntr.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdateInv = [
				sharedData.inpUpdateArticulo,
				sharedData.inpUpdateTallaGral,
				sharedData.inpUpdateTipo,
				sharedData.inpUpdateVidaUtil,
				sharedData.inpUpdateTalla1,
				sharedData.inpUpdatePrecio1,
				sharedData.inpUpdateProveedor,
				sharedData.dPickUpdateFechaEntr,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oComponentsBinding = [
				this.componentsUpdateInv[0].getId(),
				this.componentsUpdateInv[1].getId(),
				this.componentsUpdateInv[2].getId(),
				this.componentsUpdateInv[3].getId(),
				this.componentsUpdateInv[4].getId(),
				this.componentsUpdateInv[5].getId(),
				this.componentsUpdateInv[6].getId(),
				this.componentsUpdateInv[7].getId(),
			];

			// Asignar eventos 'change' a los inputs
			oComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(
					component
				).attachChange(checkInputValues);
			});
		},

		// Función para accionar desde el ValueHelp del input
		handleValueHelpUpdateTaGral: function () {
			InventoryControllerHelper.handleValueHelpUpdateTaGral();
		},

		// Función para accionar desde el ValueHelp del input
		handleValueHelpUpdateTipo: function () {
			InventoryControllerHelper.handleValueHelpUpdateTipo();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogInv: function () {
			InventoryControllerHelper.onDeleteDialogInv();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeInv: function () {
			InventoryControllerHelper.onChangeInv();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldInv: function () {
			InventoryControllerHelper.handleSearchFieldInv();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedInv: function () {
			this.createViewSettingsDialog("zuniformes.view.3_SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmInv: function (oEvent) {
			InventoryControllerHelper.handleSortDialogConfirmInv(oEvent);
		},

		//?-----------------------FILTER-----------------------
		// Función para abrir el díalogo de Filter correspondiente
		handleFilterBtnPressedInv: function () {
			this.createViewSettingsDialog("zuniformes.view.3_FilterDialog").open();
		},

		// Función para filtrar datos de las tablas por columna
		handleFilterDialogConfirmInv: function (oEvent) {
			InventoryControllerHelper.handleFilterDialogConfirmInv(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmInv: function () {
			InventoryControllerHelper.handleResetBtnConfirmInv();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemInv: function (oEvent) {
			InventoryControllerHelper.onSelectedItemInv(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 4_1_SIZES		                                              |
		//*----------------------------------------------------------------
		//! NOTA: MAYORÍA DE LOS MÉTODOS SON REDIRECTORIOS A LA CLASE HELPER CORRESPONDIENTE

		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVTaGral: function () {
			GralSizesControllerHelper.downloadAllCSVTaGral();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVTaGral: function () {
			GralSizesControllerHelper.downloadSelectedCSVTaGral();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVTaGral: function () {
			GralSizesControllerHelper.downloadTemplateCSVTaGral();
		},

		// Función para subir archivo CSV
		uploadCSVTaGral: function () {
			GralSizesControllerHelper.uploadCSVTaGral();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnTaGral

		// Función para el díalogo Create
		onCreateDialogTaGral: function () {
			var that = this,
				sharedData = GralSizesControllerHelper.getSharedData();

			GralSizesControllerHelper.setFgtCreateTaGral(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.4_1CreateForm",
					"zuniformes.view.4_1CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nueva talla',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtGralSizesCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					press: function () {
						var oComponents = [
							sharedData.inpCreateTalla.getValue(),
							sharedData.inpCreateTipo.getValue(),
						]

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para insertar
						MainControllerHelper.postMultipleOData(
							"TALLAS_GRL", "MOD",
							[{
								B2: oComponents[0], //TALLA
								B3: oComponents[1], //TIPO
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('Talla agregada exitosamente!');
							that.handleResetBtnConfirmTaGral();
						}).catch(() => {
							// Aquí hubo un error, puedes manejar el error
							MessageToast.show("Error al modificar el registro");
						});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnTaGral(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnTaGral: function (oBeginButton) {
			var sharedData = GralSizesControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateTalla.getValue().length > 0 &&
					sharedData.inpCreateTipo.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateTaGral = [
				sharedData.inpCreateTalla,
				sharedData.inpCreateTipo,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsCreateTaGral.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnTaGral

		// Función para el díalogo Create
		onUpdateDialogTaGral: function () {
			var that = this,
				sharedData = GralSizesControllerHelper.getSharedData();

			GralSizesControllerHelper.setFgtUpdateTaGral(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.4_1UpdateForm",
					"zuniformes.view.4_1UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar talla',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtGralSizesUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					press: function () {
						var oComponents = [
							sharedData.inpUpdateIdTaGr.getValue(),
							sharedData.inpUpdateTalla.getValue(),
							sharedData.inpUpdateTipo.getValue(),
						];

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para insertar
						MainControllerHelper.postMultipleOData(
							"TALLAS_GRL", "MOD",
							[{
								B1: oComponents[0], //ID_TA_GR
								B2: oComponents[1], //TALLA
								B3: oComponents[2], //TIPO
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Talla modificada exitosamente!');
							// Reinicio de datos referenciados actualizados
							that.handleResetBtnConfirmTaGral();
							that.handleResetBtnConfirmTaInv();
							that.handleResetBtnConfirmTaAsig();
						}).catch(() => {
							// Aquí hubo un error, puedes manejar el error
							MessageToast.show("Error al modificar el registro");
						});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnTaGral(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnTaGral: function (oBeginButton) {
			var sharedData = GralSizesControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpUpdateTalla.getValue().length > 0 &&
					sharedData.inpUpdateTipo.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdateTaGral = [
				sharedData.inpUpdateTalla,
				sharedData.inpUpdateTipo,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsUpdateTaGral.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogTaGral: function () {
			GralSizesControllerHelper.onDeleteDialogTaGral();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeTaGral: function () {
			GralSizesControllerHelper.onChangeTaGral();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldTaGral: function () {
			GralSizesControllerHelper.handleSearchFieldTaGral();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedTaGral: function () {
			this.createViewSettingsDialog("zuniformes.view.4_1SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmTaGral: function (oEvent) {
			GralSizesControllerHelper.handleSortDialogConfirmTaGral(oEvent);
		},

		//?-----------------------FILTER-----------------------
		// Función para abrir el díalogo de Filter correspondiente
		handleFilterBtnPressedTaGral: function () {
			this.createViewSettingsDialog("zuniformes.view.4_1FilterDialog").open();
		},

		// Función para filtrar datos de las tablas por columna
		handleFilterDialogConfirmTaGral: function (oEvent) {
			GralSizesControllerHelper.handleFilterDialogConfirmTaGral(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmTaGral: function () {
			GralSizesControllerHelper.handleResetBtnConfirmTaGral();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemTaGral: function (oEvent) {
			GralSizesControllerHelper.onSelectedItemTaGral(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 4_2_SIZES		                                              |
		//*----------------------------------------------------------------
		//! NOTA: MAYORÍA DE LOS MÉTODOS SON REDIRECTORIOS A LA CLASE HELPER CORRESPONDIENTE

		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVTaInv: function () {
			InvSizesControllerHelper.downloadAllCSVTaInv();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVTaInv: function () {
			InvSizesControllerHelper.downloadSelectedCSVTaInv();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVTaInv: function () {
			InvSizesControllerHelper.downloadTemplateCSVTaInv();
		},

		// Función para subir archivo CSV
		uploadCSVTaInv: function () {
			InvSizesControllerHelper.uploadCSVTaInv();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnTaInv

		// Función para el díalogo Create
		onCreateDialogTaInv: function () {
			var that = this,
				sharedData = InvSizesControllerHelper.getSharedData();

			InvSizesControllerHelper.setFgtCreateTaInv(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.4_2CreateForm",
					"zuniformes.view.4_2CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nueva talla en inventario',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtInvSizesCreate
				],
				beginButton: new Button({
					text: 'Agregar',
					press: function () {
						var oToInAll = [{
							B2: sharedData.inpCreateIdInv.getValue(), //ID_INV
							B4: sharedData.inpCreateIdTaGr.getValue(), //ID_TA_GR
							B6: sharedData.inpCreateIdAsign.getValue(), //ID_ASIGN
							B7: sharedData.inpCreatePrecio.getValue(), //PRECIO
						}];

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						var request = "TallasInvSet(IdTaInv='" + oToInAll[0].B6 +
							"',IdInv='" + oToInAll[0].B2 +
							"',IdTaGr='" + oToInAll[0].B4 + "')";

						MainControllerHelper.getOData(request) // Llamada GET para comprobar existencia
							.then(function (result) {
								if (result !== undefined) { // Si no resulta indefinida la consulta
									MessageBox.error("¡Talla ya existente, ingrese uno nuevo!", {
										title: "Error",                                      // default
										onClose: null,                                       // default
										styleClass: "",                                      // default
										initialFocus: null,                                  // default
										textDirection: sap.ui.core.TextDirection.Inherit     // default
									});
								} else { // Si resulta indefinida sin datos
									//! ----------------------------SEGUNDA PROMESA----------------------------
									//! ----------------------------POST----------------------------
									// Llamamos al método postMultipleOData, por el nombre de la entidad
									// y el JSON referente a sus campos para insertar									
									MainControllerHelper.postMultipleOData("TALLAS_INV", "MOD", oToInAll)
										.then(() => {
											// Aquí la promesa fue exitosa, puedes manejar el resultado
											// Mensaje de éxito, se cierra y se destruye el Dialog
											MessageToast.show('¡Tallas agregadas exitosamente!');
											that.handleResetBtnConfirmTaInv();
										})
										.catch(() => {
											// Aquí hubo un error, puedes manejar el error
											MessageToast.show("Error al guardar el registro");
										});

									dialog.close();
									dialog.destroy();
								}
							});
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnTaInv(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnTaInv: function (oBeginButton) {
			var sharedData = InvSizesControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputSetValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateIdInv.getValue().length > 0 &&
					sharedData.inpCreateArticulo.getValue().length > 0 &&
					sharedData.inpCreateIdTaGr.getValue().length > 0 &&
					sharedData.inpCreateTalla.getValue().length > 0 &&
					sharedData.inpCreateIdAsign.getValue().length > 0 &&
					sharedData.inpCreatePrecio.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateTaInv = [
				sharedData.inpCreateIdInv,
				sharedData.inpCreateArticulo,
				sharedData.inpCreateIdTaGr,
				sharedData.inpCreateTalla,
				sharedData.inpCreateIdAsign,
				sharedData.inpCreatePrecio
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oSetComponentsBinding = [
				this.componentsCreateTaInv[0].getId(),
				this.componentsCreateTaInv[1].getId(),
				this.componentsCreateTaInv[2].getId(),
				this.componentsCreateTaInv[3].getId(),
				this.componentsCreateTaInv[4].getId(),
				this.componentsCreateTaInv[5].getId(),
			];

			// Redefinir setValue para el input para llamar a checkInputValues en cada cambio
			var originalSetValue = [
				this.componentsCreateTaInv[0].setValue,
				this.componentsCreateTaInv[1].setValue,
				this.componentsCreateTaInv[2].setValue,
				this.componentsCreateTaInv[3].setValue,
				this.componentsCreateTaInv[4].setValue,
			];

			this.componentsCreateTaInv.forEach(component => {
				component.setValue = function (value) {
					originalSetValue.forEach(element => {
						element.call(this, value);
					});
					checkInputSetValues(); // Activa verificación después del cambio
				};
			});

			// Asignar eventos 'liveChange' a los inputs
			oSetComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(component).attachLiveChange(checkInputSetValues);
			});

			checkInputSetValues();
		},

		//!---INVENTARIO---
		handleValueHelpIdInv: function () {
			InvSizesControllerHelper.handleValueHelpIdInv();
		},

		//!---TALLAS_GRAL---
		handleValueHelpIdTaGr: function () {
			InvSizesControllerHelper.handleValueHelpIdTaGr();
		},

		//!---ASIGNACION---
		handleValueHelpTaInv_IdAsign: function () {
			InvSizesControllerHelper.handleValueHelpTaInv_IdAsign();
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnTaInv

		// Función para el díalogo Create
		onUpdateDialogTaInv: function () {
			var that = this,
				sharedData = InvSizesControllerHelper.getSharedData();

			InvSizesControllerHelper.setFgtUpdateTaInv(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.4_2UpdateForm",
					"zuniformes.view.4_2UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar talla',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtInvSizesUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					press: function () {
						var oComponents = [
							sharedData.inpUpdateIdTaInv.getValue(),
							sharedData.inpUpdateIdInv.getValue(),
							sharedData.inpUpdateIdTaGr.getValue(),
							sharedData.inpUpdateIdAsign.getValue(),
							sharedData.inpUpdatePrecio.getValue(),
						];

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para insertar
						MainControllerHelper.postMultipleOData(
							"TALLAS_INV", "MOD",
							[{
								B1: oComponents[0], //ID_TA_INV
								B2: oComponents[1], //ID_INV
								B4: oComponents[2], //ID_TA_GR
								B6: oComponents[3], //ID_ASIGN
								B7: oComponents[4], //PRECIO
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Talla modificada exitosamente!');
							// Reinicio de datos referenciados actualizados
							that.handleResetBtnConfirmTaInv();
							that.handleResetBtnConfirmRot();
						}).catch(() => {
							// Aquí hubo un error, puedes manejar el error
							MessageToast.show("Error al modificar el registro");
						});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnTaInv(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnTaInv: function (oBeginButton) {
			var sharedData = InvSizesControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpUpdatePrecio.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdateTaInv = [
				sharedData.inpUpdatePrecio,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsUpdateTaInv.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogTaInv: function () {
			InvSizesControllerHelper.onDeleteDialogTaInv();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeTaInv: function () {
			InvSizesControllerHelper.onChangeTaInv();
		},

		//?-----------------------SEARCHFIELD-----------------------
		handleSearchFieldTaInv: function () {
			InvSizesControllerHelper.handleSearchFieldTaInv();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedTaInv: function () {
			this.createViewSettingsDialog("zuniformes.view.4_2SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmTaInv: function (oEvent) {
			InvSizesControllerHelper.handleSortDialogConfirmTaInv(oEvent);
		},

		//?-----------------------FILTER-----------------------
		// Función para abrir el díalogo de Filter correspondiente
		handleFilterBtnPressedTaInv: function () {
			this.createViewSettingsDialog("zuniformes.view.4_2FilterDialog").open();
		},

		// Función para filtrar datos de las tablas por columna
		handleFilterDialogConfirmTaInv: function (oEvent) {
			InvSizesControllerHelper.handleFilterDialogConfirmTaInv(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmTaInv: function () {
			InvSizesControllerHelper.handleResetBtnConfirmTaInv();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemTaInv: function (oEvent) {
			InvSizesControllerHelper.onSelectedItemTaInv(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 5_1_ASSIGNMENTS                               	              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVAsig: function () {
			AssignmentsControllerHelper.downloadAllCSVAsig();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVAsig: function () {
			AssignmentsControllerHelper.downloadSelectedCSVAsig();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVAsig: function () {
			AssignmentsControllerHelper.downloadTemplateCSVAsig();
		},

		// Función para subir archivo CSV
		uploadCSVAsig: function () {
			AssignmentsControllerHelper.uploadCSVAsig();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnAsig

		// Función para el díalogo Create
		onCreateDialogAsig: function () {
			var that = this,
				sharedData = AssignmentsControllerHelper.getSharedData();

			AssignmentsControllerHelper.setFgtCreateAsig(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.5_1CreateForm",
					"zuniformes.view.5_1CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nueva asignación',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtAssigCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					press: async function () {
						var oComponents = [
							sharedData.inpCreateIdDocEv.getValue(), //0
							sharedData.inpCreateEnc.getValue(), //1
							sharedData.inpCreateNoEmp.getValue().replace(/[_]/g, ""), //2
							sharedData.inpCreateTipoUnif.getValue(), //3
							formatter.oDateToDats.format(
								sharedData.dPickCreateFechaAsign.getDateValue() //4
							),
							sharedData.inpCreateIdInv.getValue(), //5
							sharedData.inpCreateIdTaGr.getValue(), //6
							sharedData.inpCreatePrecio.getValue(), //7
						]

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						// OPERACIÓN 1 DEL SERVICIO ODATA
						// Construir la petición para el GET
						var request1 = "AsignacionSet(IdAsign='0',IdDocEv='" + oComponents[0] + "')";

						//! ----------------------------SEGUNDA PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						// OPERACIÓN 3 DEL SERVICIO ODATA
						var request2 = "AsignacionSet(IdAsign='2',IdDocEv='" + oComponents[2] + "')";

						try {
							// Llamada GET para comprobar existencia
							const result1 = await MainControllerHelper.getOData(request1);
							var bool1Get = result1 == undefined;

							// Llamada GET para comprobar existencia
							const result2 = await MainControllerHelper.getOData(request2);
							var bool2Get = result2 == undefined;

							if (
								!bool1Get || // Si no es indefinido el resultado, existe documento
								bool2Get  // Si es indefinido el resultado, existe personal en infotipo
							) {
								MessageBox.error("¡Documento ya asignado y/o N° Empleado no existente en el sistema!", {
									title: "Error",                                      // default
									onClose: null,                                       // default
									styleClass: "",                                      // default
									initialFocus: null,                                  // default
									textDirection: sap.ui.core.TextDirection.Inherit     // default
								});
							} else {
								//! ----------------------------TERCERA PROMESA----------------------------
								//! ----------------------------POST----------------------------
								// Llamamos al método postMultipleOData, por el nombre de la entidad
								// y el JSON referente a sus campos para insertar
								MainControllerHelper.postMultipleOData(
									"ASIGNACION", "MOD",
									[{
										B2: oComponents[0], //ID_DOC_EV
										B3: oComponents[1], //ENCARGADO
										B7: oComponents[2], //NO_EMP
										B8: oComponents[3], //TIPO_UNIF
										B10: oComponents[4], //FECHA_ASIGN
										//TALLAS_INV
										B11: oComponents[5], //ID_INV
										B12: oComponents[6], //ID_TA_GR
										B13: oComponents[7], //PRECIO
									}]
								).then(() => {
									// Mensaje de éxito, se cierra y se destruye el Dialog
									MessageToast.show('¡Asignación agregada exitosamente!');
									// Reinicio de datos referenciados actualizados
									that.handleResetBtnConfirmAsig();
									that.handleResetBtnConfirmTaInv();
									that.handleResetBtnConfirmInv();
								}).catch(() => {
									// Aquí hubo un error, puedes manejar el error
									MessageToast.show("Error al agregar el registro");
								});
							}
						} catch (error) {
							// Aquí hubo un error, puedes manejar el error
							MessageToast.show("Error al consultar el registro");
						}

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnAsig(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnAsig: function (oBeginButton) {
			var sharedData = AssignmentsControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateIdDocEv.getValue().length > 0 &&
					sharedData.inpCreateEnc.getValue().length > 0 &&
					sharedData.inpCreateNoEmp.getValue().replace(/[_]/g, "").length > 0 &&
					sharedData.inpCreateTipoUnif.getValue().length > 0 &&
					sharedData.dPickCreateFechaAsign.getValue().length > 0 &&
					sharedData.inpCreateIdInv.getValue().length > 0 &&
					sharedData.inpCreateArticulo.getValue().length > 0 &&
					sharedData.inpCreateTipoUnif.getValue().length > 0 &&
					sharedData.inpCreateIdTaGr.getValue().length > 0 &&
					sharedData.inpCreateTalla.getValue().length > 0 &&
					sharedData.inpCreatePrecio.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateAsig = [
				sharedData.inpCreateIdDocEv,
				sharedData.inpCreateEnc,
				sharedData.inpCreateNoEmp,
				sharedData.inpCreateTipoUnif,
				sharedData.dPickCreateFechaAsign,
				sharedData.inpCreateIdInv,
				sharedData.inpCreateArticulo,
				sharedData.inpCreateTipoUnif,
				sharedData.inpCreateIdTaGr,
				sharedData.inpCreateTalla,
				sharedData.inpCreatePrecio,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oSetComponentsBinding = [
				this.componentsCreateAsig[0].getId(),
				this.componentsCreateAsig[1].getId(),
				this.componentsCreateAsig[2].getId(),
				this.componentsCreateAsig[3].getId(),
				this.componentsCreateAsig[4].getId(),
				this.componentsCreateAsig[5].getId(),
				this.componentsCreateAsig[6].getId(),
				this.componentsCreateAsig[7].getId(),
				this.componentsCreateAsig[8].getId(),
				this.componentsCreateAsig[9].getId(),
				this.componentsCreateAsig[10].getId(),
			];

			// Redefinir setValue para el input para llamar a checkInputValues en cada cambio
			var originalSetValue = [
				this.componentsCreateAsig[5].setValue,
				this.componentsCreateAsig[6].setValue,
				this.componentsCreateAsig[7].setValue,
				this.componentsCreateAsig[8].setValue,
				this.componentsCreateAsig[9].setValue,
			];

			this.componentsCreateTaInv.forEach(component => {
				component.setValue = function (value) {
					originalSetValue.forEach(element => {
						element.call(this, value);
					});
					checkInputValues(); // Activa verificación después del cambio
				};
			});

			// Asignar eventos 'attachChange' a los inputs
			oSetComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(component).attachChange(checkInputValues);
			});

			checkInputValues();
		},

		//!---DOC_EV---
		// Función para accionar desde el ValueHelp del input
		handleValueHelpDocEv: function () {
			AssignmentsControllerHelper.handleValueHelpDocEv();
		},

		//!---ENCARGADOS---
		// Función para accionar desde el ValueHelp del input
		handleValueHelpEnc: function () {
			AssignmentsControllerHelper.handleValueHelpEnc();
		},

		//!---TALLAS_INV---
		// Función para accionar desde el ValueHelp del input
		handleValueHelpAsign_IdInv: function () {
			AssignmentsControllerHelper.handleValueHelpAsign_IdInv();
		},

		//!---TIPO_UNIF---
		// Función para accionar desde el ValueHelp del input
		handleValueHelpTipoUnif: async function () {
			// Espera valor del TipoUnif de la Promesa con un resolve
			let valueTipoUnif = await AssignmentsControllerHelper.handleValueHelpTipoUnif();
			if (valueTipoUnif) { // Si lo encuentra, sobresscribe el inpCreateTipoUnif
				var asigShData = AssignmentsControllerHelper.getSharedData();
				asigShData.inpCreateTipoUnif.setValue(valueTipoUnif);
			}
		},

		//!---TALLAS_GRL---
		// Función para accionar desde el ValueHelp del input
		handleValueHelpTaGral: function () {
			AssignmentsControllerHelper.handleValueHelpTaGral();
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnAsig

		// Función para el díalogo Update
		onUpdateDialogAsig: function () {
			var that = this,
				sharedData = AssignmentsControllerHelper.getSharedData();

			AssignmentsControllerHelper.setFgtUpdateAsig(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.5_1UpdateForm",
					"zuniformes.view.5_1UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar asignación',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtAssigUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					//enabled: true,
					press: function () {
						var fechaAsign = formatter.oDateToDats.format(
							sharedData.dPickUpdateFechaAsign.getDateValue()
						);

						var oComponents = [
							sharedData.inpUpdateIdAsign.getValue(),
							sharedData.inpUpdateIdDocEv.getValue(),
							sharedData.inpUpdateEnc.getValue(),
							sharedData.inpUpdateNoEmp.getValue(),
							fechaAsign,
						]

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para modificar
						MainControllerHelper.postMultipleOData(
							"ASIGNACION", "MOD",
							[{
								B1: oComponents[0], //ID_ASIGN
								B2: oComponents[1], //ID_DOC_EV
								B3: oComponents[2], //ENCARGADO
								B7: oComponents[3], //NO_EMP
								B10: oComponents[4], //FECHA_ASIGN
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Asignación modificada exitosamente!');
							// Reinicio de datos referenciados actualizados
							that.handleResetBtnConfirmAsig();
							that.handleResetBtnConfirmInv();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnAsig(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnAsig: function (oBeginButton) {
			var sharedData = AssignmentsControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.dPickUpdateFechaAsign.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdateAsig = [
				sharedData.dPickUpdateFechaAsign,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsUpdateAsig.forEach(function (input) {
				input.attachChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogAsig: function () {
			AssignmentsControllerHelper.onDeleteDialogAsig();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeAsig: function () {
			AssignmentsControllerHelper.onChangeAsig();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldAsig: function () {
			AssignmentsControllerHelper.handleSearchFieldAsig();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedAsig: function () {
			this.createViewSettingsDialog("zuniformes.view.5_1SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmAsig: function (oEvent) {
			AssignmentsControllerHelper.handleSortDialogConfirmAsig(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmAsig: function () {
			AssignmentsControllerHelper.handleResetBtnConfirmAsig();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemAsig: function (oEvent) {
			AssignmentsControllerHelper.onSelectedItemAsig(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 5_2_ASSIGNMENTS                               	              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVTaAsig: function () {
			AssigSizesControllerHelper.downloadAllCSVTaAsig();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVTaAsig: function () {
			AssigSizesControllerHelper.downloadSelectedCSVTaAsig();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVTaAsig: function () {
			AssigSizesControllerHelper.downloadTemplateCSVTaAsig();
		},

		// Función para subir archivo CSV
		uploadCSVTaAsig: function () {
			AssigSizesControllerHelper.uploadCSVTaAsig();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnTaAsig

		// Función para el díalogo Create
		onCreateDialogTaAsig: function () {
			var that = this,
				sharedData = AssigSizesControllerHelper.getSharedData();

			AssigSizesControllerHelper.setFgtCreateTaAsig(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.5_2CreateForm",
					"zuniformes.view.5_2CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nueva talla',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtAssigSizesCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					enabled: false,
					press: function () {
						var oComponents = [
							sharedData.inpCreateIdAsign.getValue(),
						]

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						var request = "TallasAsigSet(IdTaAs='0',IdAsign='" + oComponents[0] + "')";

						MainControllerHelper.getOData(request)
							.then(function (result) {
								if (result !== undefined) {
									MessageBox.error("¡Asignación ya existente, ingrese uno nuevo!", {
										title: "Error",                                      // default
										onClose: null,                                       // default
										styleClass: "",                                      // default
										initialFocus: null,                                  // default
										textDirection: sap.ui.core.TextDirection.Inherit     // default
									});
								} else {
									//! ----------------------------SEGUNDA PROMESA----------------------------
									//! ----------------------------POST----------------------------
									// Llamamos al método postMultipleOData, por el nombre de la entidad
									// y el JSON referente a sus campos para insertar
									MainControllerHelper.postMultipleOData(
										"TALLAS_ASI", "MOD",
										[{
											B1: oComponents[0], //ID_TA_AS
										}]
									).then(() => {
										// Mensaje de éxito, se cierra y se destruye el Dialog
										MessageToast.show('¡Talla agregada exitosamente!');
										that.handleResetBtnConfirmTaAsig();
									}).catch(() => {
										// Aquí hubo un error, puedes manejar el error
										MessageToast.show("Error al modificar el registro");
									});
								}
							})

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnTaAsig(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnTaAsig: function (oBeginButton) {
			var taShData = AssigSizesControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					taShData.inpCreateIdAsign.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateTaAsig = [
				taShData.inpCreateIdAsign,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oComponentsBinding = [
				this.componentsCreateTaAsig[0].getId(),
			];

			// Redefinir setValue para el input para llamar a checkInputValues en cada cambio
			var originalSetValue = taShData.inpCreateIdAsign.setValue;
			taShData.inpCreateIdAsign.setValue = function (value) {
				originalSetValue.call(this, value);
				checkInputValues(); // Activa verificación después del cambio
			};

			// Asignar eventos 'liveChange' a los inputs
			oComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(component).attachLiveChange(checkInputValues);
			});

			// Llama a checkInputValues inmediatamente después del SetValue en el ValueHelp
			checkInputValues();
		},

		handleValueHelpIdAsign: function () {
			AssigSizesControllerHelper.handleValueHelpIdAsign();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogTaAsig: function () {
			AssigSizesControllerHelper.onDeleteDialogTaAsig();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeTaAsig: function () {
			AssigSizesControllerHelper.onChangeTaAsig();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldTaAsig: function () {
			AssigSizesControllerHelper.handleSearchFieldTaAsig();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedTaAsig: function () {
			this.createViewSettingsDialog("zuniformes.view.5_2SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmTaAsig: function (oEvent) {
			AssigSizesControllerHelper.handleSortDialogConfirmTaAsig(oEvent);
		},

		//?-----------------------FILTER-----------------------
		// Función para abrir el díalogo de Filter correspondiente
		handleFilterBtnPressedTaAsig: function () {
			this.createViewSettingsDialog("zuniformes.view.5_2FilterDialog").open();
		},

		// Función para filtrar datos de las tablas por columna
		handleFilterDialogConfirmTaAsig: function (oEvent) {
			AssigSizesControllerHelper.handleFilterDialogConfirmTaAsig(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmTaAsig: function () {
			AssigSizesControllerHelper.handleResetBtnConfirmTaAsig();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemTaAsig: function (oEvent) {
			AssigSizesControllerHelper.onSelectedItemTaAsig(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 6_IN_CHARGE                                 	              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVEnc: function () {
			InChargeControllerHelper.downloadAllCSVEnc();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVEnc: function () {
			InChargeControllerHelper.downloadSelectedCSVEnc();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVEnc: function () {
			InChargeControllerHelper.downloadTemplateCSVEnc();
		},

		// Función para subir archivo CSV
		uploadCSVEnc: function () {
			InChargeControllerHelper.uploadCSVEnc();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnEnc

		// Función para el díalogo Create
		onCreateDialogEnc: function () {
			var that = this,
				sharedData = InChargeControllerHelper.getSharedData();

			InChargeControllerHelper.setFgtCreateEnc(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.6_CreateForm",
					"zuniformes.view.6_CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo encargado',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtInChargeCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					enabled: false,
					press: async function () {
						var oComponents = [
							sharedData.inpCreateNoEmp.getValue().replace(/[_]/g, ""),
							sharedData.inpCreateCiudad1.getValue(),
							sharedData.inpCreateDivision1.getValue(),
							sharedData.inpCreateCiudad2.getValue(),
							sharedData.inpCreateDivision2.getValue(),
							sharedData.inpCreateCiudad3.getValue(),
							sharedData.inpCreateDivision3.getValue(),
						]

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						// Construir la petición para el GET
						var request = "EncargadosSet(NoEmp='" + oComponents[0] + "')";

						try {
							// Llamada GET para comprobar existencia
							const result = await MainControllerHelper.getOData(request);
							// ENCARGADO YA EXISTENTE
							var boolGet = result.NoEmp != 0 && result.Ciudad1.length > 0;

							if (boolGet) { // Si arroja el NoEmp y la Ciudad1, ya existe en Encargados
								MessageBox.error("¡Encargado ya existente en el sistema!", {
									title: "Error",                                      // default
									onClose: null,                                       // default
									styleClass: "",                                      // default
									initialFocus: null,                                  // default
									textDirection: sap.ui.core.TextDirection.Inherit     // default
								});
							} else { // Si arroja el NoEmp solamente, significa que no existe en Encargados
								//! ----------------------------SEGUNDA PROMESA----------------------------
								//! ----------------------------POST----------------------------
								// Llamamos al método postMultipleOData, por el nombre de la entidad
								// y el JSON referente a sus campos para insertar
								MainControllerHelper.postMultipleOData(
									"ENCARGADOS", "MOD",
									[{
										B1: oComponents[0], //NO_EMP
										B3: oComponents[1], //CIUDAD1
										B4: oComponents[2], //DIVISION1
										B5: oComponents[3], //CIUDAD2
										B6: oComponents[4], //DIVISION2
										B7: oComponents[5], //CIUDAD3
										B8: oComponents[6], //DIVISION3
									}]
								).then(() => {
									// Mensaje de éxito, se cierra y se destruye el Dialog
									MessageToast.show('¡Encargado agregado exitosamente!');
									that.handleResetBtnConfirmEnc();
								}).catch(() => {
									// Aquí hubo un error, puedes manejar el error
									MessageToast.show("Error al modificar el registro");
								});
							}
						} catch (error) {
							// Aquí hubo un error, puedes manejar el error
							MessageToast.show("Error al consultar el registro, posible N° Empleado no existente en el sistema");
						}

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnEnc(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnEnc: function (oBeginButton) {
			var sharedData = InChargeControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateNoEmp.getValue().length > 0 &&
					sharedData.inpCreateCiudad1.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateEnc = [
				sharedData.inpCreateNoEmp,
				sharedData.inpCreateCiudad1,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oComponentsBinding = [
				this.componentsCreateEnc[0].getId(),
				this.componentsCreateEnc[1].getId(),
			];

			// Asignar eventos 'change' a los inputs
			oComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(
					component
				).attachChange(checkInputValues);
			});
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnEnc

		// Función para el díalogo Update
		onUpdateDialogEnc: function () {
			var that = this,
				sharedData = InChargeControllerHelper.getSharedData();

			InChargeControllerHelper.setFgtUpdateEnc(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.6_UpdateForm",
					"zuniformes.view.6_UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar encargado',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtInChargeUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					//enabled: true,
					press: function () {
						var oComponents = [
							sharedData.inpUpdateNoEmp.getValue(), //NO_EMP
							sharedData.inpUpdateCiudad1.getValue(), //CIUDAD1
							sharedData.inpUpdateDivision1.getValue(), //DIVISION1
							sharedData.inpUpdateCiudad2.getValue(), //CIUDAD2
							sharedData.inpUpdateDivision2.getValue(), //DIVISION2
							sharedData.inpUpdateCiudad3.getValue(), //CIUDAD3
							sharedData.inpUpdateDivision3.getValue() //DIVISION3
						]

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para modificar
						MainControllerHelper.postMultipleOData(
							"ENCARGADOS", "MOD",
							[{
								B1: oComponents[0], //NO_EMP
								B3: oComponents[1], //CIUDAD1
								B4: oComponents[2], //DIVISION1
								B5: oComponents[3], //CIUDAD2
								B6: oComponents[4], //DIVISION2
								B7: oComponents[5], //CIUDAD3
								B8: oComponents[6], //DIVISION3
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Encargado modificado exitosamente!');
							that.handleResetBtnConfirmEnc();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnEnc(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnEnc: function (oBeginButton) {
			var sharedData = InChargeControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpUpdateCiudad1.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdateEnc = [
				sharedData.inpUpdateCiudad1,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsUpdateEnc.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogEnc: function () {
			InChargeControllerHelper.onDeleteDialogEnc();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeEnc: function () {
			InChargeControllerHelper.onChangeEnc();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldEnc: function () {
			InChargeControllerHelper.handleSearchFieldEnc();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedEnc: function () {
			this.createViewSettingsDialog("zuniformes.view.6_SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmEnc: function (oEvent) {
			InChargeControllerHelper.handleSortDialogConfirmEnc(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmEnc: function () {
			InChargeControllerHelper.handleResetBtnConfirmEnc();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemEnc: function (oEvent) {
			InChargeControllerHelper.onSelectedItemEnc(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 7_1_DOCUMENTS                                	              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVDoc: function () {
			InfoDocumentsControllerHelper.downloadAllCSVDoc();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVDoc: function () {
			InfoDocumentsControllerHelper.downloadSelectedCSVDoc();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnDoc

		// Función para el díalogo Create
		onCreateDialogDoc: function () {
			var that = this,
				sharedData = InfoDocumentsControllerHelper.getSharedData();

			InfoDocumentsControllerHelper.setFgtCreateDoc(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.7_1CreateForm",
					"zuniformes.view.7_1CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo documento',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtDocumentsCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					enabled: false,
					press: async function () {
						var bNameExists = false;

						var oComponents = [
							sharedData.inpCreateNombre,
							sharedData.inpCreateTipo.getValue(),
							formatter.oDateToDats.format(
								sharedData.dPickerCreateFechaCreacion.getDateValue()
							),
							sharedData.inpCreateCreadoPor.getValue(),
							sharedData.inpCreateTamArchivo.getValue(),
							sharedData.inpCreateUrlAlmacenado.getValue(),
							InfoDocumentsControllerHelper.onChangeCreateEstado(),
						];

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						const getSetResult = await MainControllerHelper.getSetOData("DocEvidenciaSet");
						getSetResult.forEach(element => {
							bNameExists = element.Nombre == oComponents[0];
						});

						if (!bNameExists) { // Si existe el nombre en la base de datos, no permite ingresar el mismo archivo
							//! ----------------------------SEGUNDA PROMESA----------------------------
							//! ----------------------------INSERT----------------------------
							// Llamamos al método postMultipleOData, por el nombre de la entidad
							// y el JSON referente a sus campos para insertar
							await MainControllerHelper.postMultipleOData(
								"DOCUMENTOS", "MOD",
								[{
									B1: "0", //ID_DOC_EV
									B2: oComponents[0], //NOMBRE
									B3: oComponents[1], //TIPO
									B4: oComponents[2], //FECHA_CREACION
									B5: oComponents[3], //CREADO_POR
									B6: oComponents[4], //TAM_ARCHIVO
									B7: oComponents[5], //URL_ALMACENADO
									B9: oComponents[6], //ESTADO
								}]
							);

							//! ----------------------------TERCERA PROMESA----------------------------
							//! ----------------------------UPLOAD ONEDRIVE----------------------------
							// Segundo paso: subir el archivo a OneDrive
							const uploadResult = await GraphHelper.uploadFile(sharedData.fileCreateDoc);

							// Asignar el ID del documento subido
							const idDocUploaded = uploadResult.id;

							//! ----------------------------CUARTA PROMESA----------------------------
							//! ----------------------------GET LAST ODATA ID----------------------------
							// Obtiene el último ID por servicio OData
							const request = "DocEvidenciaSet(IdDocEv='0')";
							const getResult = await MainControllerHelper.getOData(request);

							oComponents = [
								getResult.IdDocEv, // Último ID de la tabla
								idDocUploaded, // Último ID del documento subido a OneDrive
							];

							//! ----------------------------QUINTA PROMESA----------------------------
							//! ----------------------------MOD_ID_OBJ----------------------------
							await MainControllerHelper.postMultipleOData(
								"DOCUMENTOS", "UPD_ID_OBJ",
								[{
									B1: oComponents[0], //ID_DOC_EV
									B2: oComponents[1], //ID_OBJETO
								}]
							);

							MessageToast.show('¡Documento agregado exitosamente!');
							that.handleResetBtnConfirmDoc();
							that.handleResetBtnConfirmListDoc();

							// Recargar de nuevo el cliente, junto con los nuevos archivos
							// Para el modelo de la List listDoc de DocumentsControllerHelper
							await GraphHelper.setGraphClient();
							that.modelListDoc = await GraphHelper.getFiles();
						} else {
							MessageBox.error("¡Documento ya existente, ingrese uno nuevo!", {
								title: "Error",                                      // default
								onClose: null,                                       // default
								styleClass: "",                                      // default
								initialFocus: null,                                  // default
								textDirection: sap.ui.core.TextDirection.Inherit     // default
							});
						}

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Agregar el modelo Create para los ComboBox
			dialog.setModel(that.oComboBoxModelCreate, "oComboBoxModelCreate");

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnDoc(oBeginButton);
			that.enableCreateFileUploaderValues();

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnDoc: function (oBeginButton) {
			var sharedData = InfoDocumentsControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateNombre.length > 0 &&
					sharedData.inpCreateTipo.getValue().length > 0 &&
					formatter.oDateToDats.format(
						sharedData.dPickerCreateFechaCreacion.getDateValue()
					).length > 0 &&
					sharedData.inpCreateCreadoPor.getValue().length > 0 &&
					sharedData.inpCreateUrlAlmacenado.getValue().length > 0 &&
					sharedData.inpCreateTamArchivo.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateDoc = [
				sharedData.inpCreateTipo,
				sharedData.dPickerCreateFechaCreacion,
				sharedData.inpCreateCreadoPor,
				sharedData.inpCreateUrlAlmacenado,
				sharedData.inpCreateTamArchivo,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oComponentsBinding = [
				this.componentsCreateDoc[0].getId(),
				this.componentsCreateDoc[1].getId(),
				this.componentsCreateDoc[2].getId(),
				this.componentsCreateDoc[3].getId(),
				this.componentsCreateDoc[4].getId(),
			];

			// Asignar eventos 'change' a los inputs
			oComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(
					component
				).attachChange(checkInputValues);
			});
		},

		// Función con evento attachChange del FileUploader
		enableCreateFileUploaderValues: function () {
			var sharedData = InfoDocumentsControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function (oEvent) { // Se pasa el oEvent del fileUploader
				// Comprobación de los componentes
				if (sharedData.fUploaderCreateDoc.getValue().length > 0) {
					InfoDocumentsControllerHelper.setCreateComponentsValues(oEvent);
				}
			}.bind(this); // Se vincula la función a la variable

			this.fUploaderComponentsCreateDoc = [
				sharedData.fUploaderCreateDoc,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oComponentsBinding = [
				this.fUploaderComponentsCreateDoc[0].getId(),
			];

			// Asignar eventos 'change' a los inputs
			oComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(
					component
				).attachChange(checkInputValues);
			});
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN onUpdateDialogDoc

		// Función para el díalogo Update
		onUpdateDialogDoc: function () {
			var that = this,
				sharedData = InfoDocumentsControllerHelper.getSharedData();

			InfoDocumentsControllerHelper.setFgtUpdateDoc(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.7_1UpdateForm",
					"zuniformes.view.7_1UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar registro',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtDocumentsUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					enabled: true,
					press: function () {
						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para modificar
						MainControllerHelper.postMultipleOData(
							"DOCUMENTOS", "MOD",
							[{
								B1: sharedData.inpUpdateIdDocEv.getValue(),  //ID_DOC_EV
								B9: InfoDocumentsControllerHelper.onChangeUpdateEstado(), //ESTADO
							}]
						).then(() => {
							// Aquí la promesa fue exitosa, puedes manejar el resultado
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('Registro modificado exitosamente!');

							that.handleResetBtnConfirmDoc();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Agregar el modelo Update para los ComboBox
			dialog.setModel(that.oComboBoxModelUpdate, "oComboBoxModelUpdate");

			// Abrir el díalogo
			dialog.open();
		},

		// Función que retorna la key del ComboBox
		onChangeUpdateEstado: function () {
			InfoDocumentsControllerHelper.onChangeUpdateEstado();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogDoc: function () {
			var that = this,
				infoDocShData = InfoDocumentsControllerHelper.getSharedData();
			var dialog = new Dialog({
				title: 'Eliminar registro(s)',
				type: 'Message',
				content: new Text({ text: '¿Estás seguro de eliminar dicho(s) registro(s) y documento(s) del repositorio?' }),
				beginButton: new Button({
					type: ButtonType.Reject,
					text: 'Eliminar',
					press: async function () {
						var toInAllDel = [];
						infoDocShData.selectedItemsDoc.forEach(async item => { // Item asíncrono por GraphHelper
							// Traer IDs seleccionadas para eliminar de las bases de datos
							toInAllDel.push({ B1: item.IdDocEv });
							// Borrar los archivos por los nombres seleccionados
							await GraphHelper.deleteFile(item.Nombre)
						});

						// Función POST para eliminar los registros por IDs
						MainControllerHelper.postMultipleOData("DOCUMENTOS", "DEL", toInAllDel)
							.then(() => {
								// Aquí la promesa fue exitosa, puedes manejar el resultado
								// Mensaje de éxito, se cierra y se destruye el Dialog
								MessageToast.show('¡Documento(s) eliminado(s) éxitosamente!');
								that.handleResetBtnConfirmDoc();
								that.handleResetBtnConfirmListDoc();
							}).catch(() => {
								// Aquí hubo un error, puedes manejar el error
								MessageToast.show("Error al eliminar el registro");
							});

						// Recargar de nuevo el cliente, junto con los nuevos archivos
						// Para el modelo de la List listDoc de DocumentsControllerHelper
						await GraphHelper.setGraphClient();
						that.modelListDoc = await GraphHelper.getFiles();
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
		onChangeDoc: function () {
			InfoDocumentsControllerHelper.onChangeDoc();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldDoc: function () {
			InfoDocumentsControllerHelper.handleSearchFieldDoc();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedDoc: function () {
			this.createViewSettingsDialog("zuniformes.view.7_1SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmDoc: function (oEvent) {
			InfoDocumentsControllerHelper.handleSortDialogConfirmDoc(oEvent);
		},

		//?-----------------------FILTER-----------------------
		// Función para abrir el díalogo de Filter correspondiente
		handleFilterBtnPressedDoc: function () {
			this.createViewSettingsDialog("zuniformes.view.7_1FilterDialog").open();
		},

		// Función para filtrar datos de las tablas por columna
		handleFilterDialogConfirmDoc: function (oEvent) {
			InfoDocumentsControllerHelper.handleFilterDialogConfirmDoc(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmDoc: function () {
			InfoDocumentsControllerHelper.handleResetBtnConfirmDoc();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemDoc: function (oEvent) {
			InfoDocumentsControllerHelper.onSelectedItemDoc(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 7_2_DOCUMENTS                                	              |
		//*----------------------------------------------------------------
		//?-----------------------DOCX, PDF-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllFilesListDoc: function () {
			DocumentsControllerHelper.downloadAllFilesListDoc();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedFilesListDoc: function () {
			DocumentsControllerHelper.downloadSelectedFilesListDoc();
		},

		previewSelectedListDoc: function () {
			DocumentsControllerHelper.previewSelectedListDoc();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro
		onSearchListDoc: function () {
			DocumentsControllerHelper.onSearchListDoc();
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmListDoc: function () {
			DocumentsControllerHelper.handleResetBtnConfirmListDoc();
		},

		//?-----------------------LIST SELECT-----------------------
		// Función para seleccionar fila de la lista
		onSelectedItemListDoc: function (oEvent) {
			DocumentsControllerHelper.onSelectedItemListDoc(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 8_1_ROTATIONS                                	              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVRot: function () {
			RotationsControllerHelper.downloadAllCSVRot();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVRot: function () {
			RotationsControllerHelper.downloadSelectedCSVRot();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVRot: function () {
			RotationsControllerHelper.downloadTemplateCSVRot();
		},

		// Función para subir archivo CSV
		uploadCSVRot: function () {
			RotationsControllerHelper.uploadCSVRot();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnDoc

		// Función para el díalogo Create
		onCreateDialogRot: function () {
			var that = this,
				sharedData = RotationsControllerHelper.getSharedData();

			RotationsControllerHelper.setFgtCreateRot(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.8_1CreateForm",
					"zuniformes.view.8_1CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nueva rotación',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtRotationsCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					press: async function () {
						var oComponents = [
							sharedData.inpCreateIdAsign.getValue(),
							sharedData.inpCreateCuenta.getValue(),
						];

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						var request = "RotTempSet(IdRt='0',IdAsign='" + oComponents[0] + "')";

						MainControllerHelper.getOData(request)
							.then(function (result) {
								if (result !== undefined) {
									MessageBox.error("¡Rotación ya existente, ingrese uno nuevo!", {
										title: "Error",                                      // default
										onClose: null,                                       // default
										styleClass: "",                                      // default
										initialFocus: null,                                  // default
										textDirection: sap.ui.core.TextDirection.Inherit     // default
									});
								} else {
									//! ----------------------------SEGUNDA PROMESA----------------------------
									//! ----------------------------GET SET----------------------------
									var request2 = "RotTempSet(IdRt='1',IdAsign='" + oComponents[0] + "')";

									MainControllerHelper.getOData(request2)
										.then(function (result) {
											if (result !== undefined) { //Empleado dado de baja del sistema
												// Llamamos al método postMultipleOData, por el nombre de la entidad
												// y el JSON referente a sus campos para insertar
												MainControllerHelper.postMultipleOData(
													"ROT_TEMP", "MOD",
													[{
														B2: oComponents[0], //ID_ASIGN
														B9: oComponents[1], //CUENTA
													}]
												).then(() => {
													// Mensaje de éxito, se cierra y se destruye el Dialog
													MessageToast.show('¡Rotación agregado exitosamente!');
													that.handleResetBtnConfirmRot();
												}).catch(() => {
													// Aquí hubo un error, puedes manejar el error
													MessageToast.show("Error al modificar el registro");
												});
											} else { //Empleado activo en el sistema
												MessageBox.error("¡Empleado todavía activo en el sistema!", {
													title: "Error",                                      // default
													onClose: null,                                       // default
													styleClass: "",                                      // default
													initialFocus: null,                                  // default
													textDirection: sap.ui.core.TextDirection.Inherit     // default
												});
											}
										});
								}
							});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnRot(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnRot: function (oBeginButton) {
			var sharedData = RotationsControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateIdAsign.getValue().length > 0 &&
					sharedData.inpCreateCuenta.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateRot = [
				sharedData.inpCreateIdAsign,
				sharedData.inpCreateCuenta,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oSetComponentsBinding = [
				this.componentsCreateRot[0].getId(),
				this.componentsCreateRot[1].getId(),
			];

			// Redefinir setValue para el input para llamar a checkInputValues en cada cambio
			var originalSetValue = [
				this.componentsCreateRot[0].setValue,
			];

			this.componentsCreateRot.forEach(component => {
				component.setValue = function (value) {
					originalSetValue.forEach(element => {
						element.call(this, value);
					});
					checkInputValues(); // Activa verificación después del cambio
				};
			});

			// Asignar eventos 'attachChange' a los inputs
			oSetComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(component).attachLiveChange(checkInputValues);
			});

			checkInputValues();
		},

		handleValueHelpRot_IdAsign: function () {
			RotationsControllerHelper.handleValueHelpIdAsign();
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnRot

		// Función para el díalogo Update
		onUpdateDialogRot: function () {
			var that = this,
				sharedData = RotationsControllerHelper.getSharedData();

			RotationsControllerHelper.setFgtUpdateRot(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.8_1UpdateForm",
					"zuniformes.view.8_1UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar rotación',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtRotationsUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					press: function () {
						var oComponents = [
							sharedData.inpUpdateIdRt.getValue(),
							sharedData.inpUpdateIdAsign.getValue(),
							sharedData.inpUpdateCuenta.getValue(),
						]

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para modificar
						MainControllerHelper.postMultipleOData(
							"ROT_TEMP", "MOD",
							[{
								B1: oComponents[0], //ID_RT
								B2: oComponents[1], //ID_ASIGN
								B9: oComponents[2], //FECHA_ASIGN
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Rotación modificada exitosamente!');
							that.handleResetBtnConfirmRot();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnRot(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnRot: function (oBeginButton) {
			var sharedData = RotationsControllerHelper.getSharedData();

			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpUpdateCuenta.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdateRot = [
				sharedData.inpUpdateCuenta,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsUpdateRot.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogRot: function () {
			RotationsControllerHelper.onDeleteDialogRot();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeRot: function () {
			RotationsControllerHelper.onChangeRot();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldRot: function () {
			RotationsControllerHelper.handleSearchFieldRot();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedRot: function () {
			this.createViewSettingsDialog("zuniformes.view.8_1SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmRot: function (oEvent) {
			RotationsControllerHelper.handleSortDialogConfirmRot(oEvent);
		},

		//?-----------------------FILTER-----------------------
		// Función para abrir el díalogo de Filter correspondiente
		handleFilterBtnPressedRot: function () {
			this.createViewSettingsDialog("zuniformes.view.8_1FilterDialog").open();
		},

		// Función para filtrar datos de las tablas por columna
		handleFilterDialogConfirmRot: function (oEvent) {
			RotationsControllerHelper.handleFilterDialogConfirmRot(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmRot: function () {
			RotationsControllerHelper.handleResetBtnConfirmRot();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemRot: function (oEvent) {
			RotationsControllerHelper.onSelectedItemRot(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 9_1_USERS	                                	              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVUsu: function () {
			UsersControllerHelper.downloadAllCSVUsu();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVUsu: function () {
			UsersControllerHelper.downloadSelectedCSVUsu();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVUsu: function () {
			UsersControllerHelper.downloadTemplateCSVUsu();
		},

		// Función para subir archivo CSV
		uploadCSVUsu: function () {
			UsersControllerHelper.uploadCSVUsu();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnRol

		// Función para el díalogo Create
		onCreateDialogUsu: function () {
			var that = this,
				sharedData = UsersControllerHelper.getSharedData();

			UsersControllerHelper.setFgtCreateUsu(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.9_1CreateForm",
					"zuniformes.view.9_1CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo usuario',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtUsersCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					enabled: false,
					press: async function () {
						var oComponents = [
							sharedData.inpCreateNoEmp.getValue().replace(/[_]/g, ""),
							sharedData.inpCreateRol.getValue(),
							sharedData.inpCreateNombre.getValue(),
						];

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						// Construir la petición para el GET
						var request = "UsuariosSet(NoEmp='" + oComponents[0] + "',Rol='0')";

						try {
							// Llamada GET para comprobar existencia
							const result = await MainControllerHelper.getOData(request);
							// ENCARGADO YA EXISTENTE
							var boolGet = result.NoEmp.length > 0 && result.Rol.length > 0 && result.Nombre.length > 0

							if (boolGet) { // Si arroja todo el ErEntity o si es indefinido
								MessageBox.error("¡Usuario ya asignado y/o N° Empleado no existente en el sistema!", {
									title: "Error",                                      // default
									onClose: null,                                       // default
									styleClass: "",                                      // default
									initialFocus: null,                                  // default
									textDirection: sap.ui.core.TextDirection.Inherit     // default
								});
							} else {
								//! ----------------------------SEGUNDA PROMESA----------------------------
								//! ----------------------------POST----------------------------

								// Llamamos al método postMultipleOData, por el nombre de la entidad
								// y el JSON referente a sus campos para insertar
								MainControllerHelper.postMultipleOData(
									"USUARIOS", "MOD",
									[{
										B1: oComponents[0], //NO_EMP
										B2: oComponents[1], //ROL
										B3: oComponents[2], //NOMBRE
									}]
								).then(() => {
									// Mensaje de éxito, se cierra y se destruye el Dialog
									MessageToast.show('¡Usuario agregado exitosamente!');
									that.handleResetBtnConfirmUsu();
								}).catch(() => {
									// Aquí hubo un error, puedes manejar el error
									MessageToast.show("Error al modificar el registro");
								});
							}
						} catch (error) {
							// Aquí hubo un error, puedes manejar el error
							MessageToast.show("Error al consultar el registro, posible N° Empleado no existente en el sistema");
						}

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnUsu(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnUsu: function (oBeginButton) {
			var sharedData = UsersControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateNoEmp.getValue().length > 0 &&
					sharedData.inpCreateRol.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateUsu = [
				sharedData.inpCreateNoEmp,
				sharedData.inpCreateRol,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oSetComponentsBinding = [
				this.componentsCreateUsu[0].getId(),
				this.componentsCreateUsu[1].getId(),
			];

			// Redefinir setValue para el input para llamar a checkInputValues en cada cambio
			var originalSetValue = [
				this.componentsCreateUsu[1].setValue,
			];

			this.componentsCreateUsu.forEach(component => {
				component.setValue = function (value) {
					originalSetValue.forEach(element => {
						element.call(this, value);
					});
					checkInputValues(); // Activa verificación después del cambio
				};
			});

			// Asignar eventos 'attachChange' a los inputs
			oSetComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(component).attachChange(checkInputValues);
			});

			checkInputValues();
		},

		// Función para accionar desde el ValueHelp del input
		handleValueHelpRol: function () {
			UsersControllerHelper.handleValueHelpRol();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogUsu: function () {
			UsersControllerHelper.onDeleteDialogUsu();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeUsu: function () {
			UsersControllerHelper.onChangeUsu();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldUsu: function () {
			UsersControllerHelper.handleSearchFieldUsu();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedUsu: function () {
			this.createViewSettingsDialog("zuniformes.view.9_1SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmUsu: function (oEvent) {
			UsersControllerHelper.handleSortDialogConfirmUsu(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmUsu: function () {
			UsersControllerHelper.handleResetBtnConfirmUsu();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemUsu: function (oEvent) {
			UsersControllerHelper.onSelectedItemUsu(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 9_2_USERS	                                	              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVRol: function () {
			RolesControllerHelper.downloadAllCSVRol();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVRol: function () {
			RolesControllerHelper.downloadSelectedCSVRol();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVRol: function () {
			RolesControllerHelper.downloadTemplateCSVRol();
		},

		// Función para subir archivo CSV
		uploadCSVRol: function () {
			RolesControllerHelper.uploadCSVRol();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnRol

		// Función para el díalogo Create
		onCreateDialogRol: function () {
			var that = this,
				sharedData = RolesControllerHelper.getSharedData();

			RolesControllerHelper.setFgtCreateRol(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.9_2CreateForm",
					"zuniformes.view.9_2CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo rol',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtRolesCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					press: async function () {
						var oComponents = [
							sharedData.inpCreateRol.getValue(),
							sharedData.inpCreateDescripcion.getValue(),
						];

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						// Construir la petición para el GET
						var request = "RolesSet(Rol='" + oComponents[0] + "')";

						MainControllerHelper.getOData(request)
							.then(function (result) {
								if (result !== undefined) {
									MessageBox.error("¡Rol ya existente, ingrese uno nuevo!", {
										title: "Error",                                      // default
										onClose: null,                                       // default
										styleClass: "",                                      // default
										initialFocus: null,                                  // default
										textDirection: sap.ui.core.TextDirection.Inherit     // default
									});
								} else {
									// Llamamos al método postMultipleOData, por el nombre de la entidad
									// y el JSON referente a sus campos para insertar
									MainControllerHelper.postMultipleOData(
										"ROLES", "MOD",
										[{
											B1: oComponents[0], //ROL
											B2: oComponents[1], //DESCRIPCION
										}]
									).then(() => {
										// Mensaje de éxito, se cierra y se destruye el Dialog
										MessageToast.show('¡Rol agregado exitosamente!');
										that.handleResetBtnConfirmRol();
									}).catch(() => {
										// Aquí hubo un error, puedes manejar el error
										MessageToast.show("Error al modificar el registro");
									});
								}
							});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnRol(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnRol: function (oBeginButton) {
			var sharedData = RolesControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateRol.getValue().length > 0 &&
					sharedData.inpCreateDescripcion.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreateRol = [
				sharedData.inpCreateRol,
				sharedData.inpCreateDescripcion,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsCreateRol.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------UPDATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableUpdateBeginBtnRot

		// Función para el díalogo Update
		onUpdateDialogRol: function () {
			var that = this,
				sharedData = RolesControllerHelper.getSharedData();

			RolesControllerHelper.setFgtUpdateRol(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.9_2UpdateForm",
					"zuniformes.view.9_2UpdateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Modificar rol',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtRolesUpdate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Modificar',
					press: function () {
						var oComponents = [
							sharedData.inpUpdateRol.getValue(),
							sharedData.inpUpdateDescripcion.getValue(),
						]

						// Llamamos al método postMultipleOData, por el nombre de la entidad
						// y el JSON referente a sus campos para modificar
						MainControllerHelper.postMultipleOData(
							"ROLES", "MOD",
							[{
								B1: oComponents[0], //ROL
								B2: oComponents[1], //DESCRIPCION
							}]
						).then(() => {
							// Mensaje de éxito, se cierra y se destruye el Dialog
							MessageToast.show('¡Rol modificada exitosamente!');
							that.handleResetBtnConfirmRol();
						}).catch(() => {
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
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableUpdateBeginBtnRol(oBeginButton);

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableUpdateBeginBtnRol: function (oBeginButton) {
			var sharedData = RolesControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpUpdateDescripcion.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsUpdateRol = [
				sharedData.inpUpdateDescripcion,
			];

			// Asignar eventos 'liveChange' a los inputs
			this.componentsUpdateRol.forEach(function (input) {
				input.attachLiveChange(checkInputValues);
			});

			// Comprobar el estado inicial para habilitar/deshabilitar el botón al cargar el diálogo
			checkInputValues();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogRol: function () {
			RolesControllerHelper.onDeleteDialogRol();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangeRol: function () {
			RolesControllerHelper.onChangeRol();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldRol: function () {
			RolesControllerHelper.handleSearchFieldRol();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedRol: function () {
			this.createViewSettingsDialog("zuniformes.view.9_2SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmRol: function (oEvent) {
			RolesControllerHelper.handleSortDialogConfirmRol(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmRol: function () {
			RolesControllerHelper.handleResetBtnConfirmRol();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemRol: function (oEvent) {
			RolesControllerHelper.onSelectedItemRol(oEvent);
		},

		//*----------------------------------------------------------------
		//*| 9_3_USERS	                                	              |
		//*----------------------------------------------------------------
		//?-----------------------CSV-----------------------
		// Función para descargar todos los registros en CSV
		downloadAllCSVPer: function () {
			PermissionsControllerHelper.downloadAllCSVPer();
		},

		// Función para descargar los registros seleccionados en CSV
		downloadSelectedCSVPer: function () {
			PermissionsControllerHelper.downloadSelectedCSVPer();
		},

		// Función para descargar la plantilla CSV
		downloadTemplateCSVPer: function () {
			PermissionsControllerHelper.downloadTemplateCSVPer();
		},

		// Función para subir archivo CSV
		uploadCSVPer: function () {
			PermissionsControllerHelper.uploadCSVPer();
		},

		//?-----------------------CREATE-----------------------
		//! NOTA: SE CREA EL MÉTODO DESDE EL CONTROLLER PRINCIPAL, YA QUE SE NECESITA DE LA INSTANCIA THIS
		//! PARA VALIDAR LOS COMPONENTES DEL SUBFRAGMENTO EN EL BEGINBUTTON, NÓTESE LA FUNCIÓN enableCreateBeginBtnRol

		// Función para el díalogo Create
		onCreateDialogPer: function () {
			var that = this,
				sharedData = PermissionsControllerHelper.getSharedData();

			PermissionsControllerHelper.setFgtCreatePer(
				sap.ui.xmlfragment(
					this.getView().getId() + "-zuniformes.view.9_3CreateForm",
					"zuniformes.view.9_3CreateForm",
					this
				)
			);

			// Abrir un componente nuevo, agrega una capa más en nuestro fragmento
			// Por lo cuál es necesario destruirlo al cerrarlo
			// Para evitar duplicados
			var dialog = new Dialog({
				title: 'Agregar nuevo permiso',
				type: 'Message',
				// El contenido será el subfragmento cargado al abrir este Dialog
				content: [
					sharedData._oFgtPermissionsCreate
				],
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Agregar',
					press: async function () {
						var oComponents = [
							sharedData.inpCreateRol.getValue(),
							PermissionsControllerHelper.onChangeCreatePer(),
							PermissionsControllerHelper.onChangeCreateCat(),
						];

						//! ----------------------------PRIMER PROMESA----------------------------
						//! ----------------------------GET SET----------------------------
						// Construir la petición para el GET
						var request = "PermisosSet(IdPer='" + oComponents[2] +
							"',Rol='" + oComponents[0] +
							"',Permiso='" + oComponents[1] + "')";

						MainControllerHelper.getOData(request)
							.then(function (result) {
								if (result !== undefined) {
									MessageBox.error("¡Permiso ya existente, ingrese uno nuevo!", {
										title: "Error",                                      // default
										onClose: null,                                       // default
										styleClass: "",                                      // default
										initialFocus: null,                                  // default
										textDirection: sap.ui.core.TextDirection.Inherit     // default
									});
								} else {
									// Llamamos al método postMultipleOData, por el nombre de la entidad
									// y el JSON referente a sus campos para insertar
									MainControllerHelper.postMultipleOData(
										"PERMISOS", "MOD",
										[{
											B1: oComponents[0], //ROL
											B2: oComponents[1], //PERMISO
											B3: oComponents[2], //CATALOGO
										}]
									).then(() => {
										// Mensaje de éxito, se cierra y se destruye el Dialog
										MessageToast.show('¡Permiso agregado exitosamente!');
										that.handleResetBtnConfirmPer();
									}).catch(() => {
										// Aquí hubo un error, puedes manejar el error
										MessageToast.show("Error al modificar el registro");
									});
								}
							});

						dialog.close();
						dialog.destroy();
					}
				}),
				// Cerrar y destruir el Dialog
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
						dialog.destroy();
					}
				}),
			});

			// Agregar el modelo Create para los ComboBox
			dialog.setModel(that.oComboBoxModelCreate, "oComboBoxModelCreate");

			// Evento para cambiar el Enabled del beginButton
			var oBeginButton = dialog.getBeginButton();
			that.enableCreateBeginBtnPer(oBeginButton)

			// Abrir el díalogo
			dialog.open();
		},

		// Función para habilitar BeginButton por attach
		enableCreateBeginBtnPer: function (oBeginButton) {
			var sharedData = PermissionsControllerHelper.getSharedData();
			// Variable como función para verificar los valores de los inputs
			var checkInputValues = function () {
				// Comprobación de los componentes
				oBeginButton.setEnabled(
					sharedData.inpCreateRol.getValue().length > 0
				);
			}.bind(this); // Se vincula la función a la variable

			this.componentsCreatePer = [
				sharedData.inpCreateRol,
			];

			// Arreglo de los componentes para iterarlos por su attachChange
			var oSetComponentsBinding = [
				this.componentsCreatePer[0].getId(),
			];

			// Redefinir setValue para el input para llamar a checkInputValues en cada cambio
			var originalSetValue = [
				this.componentsCreatePer[0].setValue,
			];

			this.componentsCreatePer.forEach(component => {
				component.setValue = function (value) {
					originalSetValue.forEach(element => {
						element.call(this, value);
					});
					checkInputValues(); // Activa verificación después del cambio
				};
			});

			// Asignar eventos 'attachChange' a los inputs
			oSetComponentsBinding.forEach(function (component) {
				sap.ui.getCore().byId(component).attachChange(checkInputValues);
			});

			checkInputValues();
		},

		// Función para accionar desde el ValueHelp del input
		handleValueHelpPer_Rol: function () {
			PermissionsControllerHelper.handleValueHelpRol();
		},

		// Función que retorna la key del ComboBox
		onChangeCreatePer: function () {
			PermissionsControllerHelper.onChangeCreatePer();
		},

		// Función que retorna la key del ComboBox
		onChangeCreateCat: function () {
			PermissionsControllerHelper.onChangeCreateCat();
		},

		//?-----------------------DELETE-----------------------
		// Función para el díalogo Delete
		onDeleteDialogPer: function () {
			PermissionsControllerHelper.onDeleteDialogPer();
		},

		//?-----------------------COMBOBOX-----------------------
		// Función que retorna la key del ComboBox
		onChangePer: function () {
			PermissionsControllerHelper.onChangePer();
		},

		//?-----------------------SEARCHFIELD-----------------------
		// Función para buscar por filtro y ComboBox
		handleSearchFieldPer: function () {
			PermissionsControllerHelper.handleSearchFieldPer();
		},

		//?-----------------------SORT-----------------------
		// Función para abrir el díalogo de Sort correspondiente
		handleSortBtnPressedPer: function () {
			this.createViewSettingsDialog("zuniformes.view.9_3SortDialog").open();
		},

		// Función para ordenar datos de las tablas por columna
		handleSortDialogConfirmPer: function (oEvent) {
			PermissionsControllerHelper.handleSortDialogConfirmPer(oEvent);
		},

		//?-----------------------FILTER-----------------------
		// Función para abrir el díalogo de Filter correspondiente
		handleFilterBtnPressedPer: function () {
			this.createViewSettingsDialog("zuniformes.view.9_3FilterDialog").open();
		},

		// Función para filtrar datos de las tablas por columna
		handleFilterDialogConfirmPer: function (oEvent) {
			PermissionsControllerHelper.handleFilterDialogConfirmPer(oEvent);
		},

		//?-----------------------RESET-----------------------
		// Función para reiniciar datos, componentes del fragmento
		handleResetBtnConfirmPer: function () {
			PermissionsControllerHelper.handleResetBtnConfirmPer();
		},

		//?-----------------------TABLE SELECT-----------------------
		// Función para seleccionar filas de la tabla
		onSelectedItemPer: function (oEvent) {
			PermissionsControllerHelper.onSelectedItemPer(oEvent);
		},
	});
});
