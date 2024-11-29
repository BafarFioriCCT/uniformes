sap.ui.define([
    //?-----------------------OTROS-----------------------
    'jquery.sap.global',
    'zuniformes/libs/papaparse',
    //?-----------------------SAP/M-----------------------
    'sap/m/MessageToast',
], function (
    //?-----------------------OTROS-----------------------
    jQuery,
    //?-----------------------SAP/M-----------------------
    MessageToast
) {
    "use strict";

    var MainControllerHelper = {
        sharedData: {
            _aFragments: [],
            toInAll: [],
        },

        getSharedData: function () {
            return this.sharedData;
        },

        // Función para setear los fragmentos desde el Controller
        setMainFragments: function (_aFragments) {
            this.sharedData._aFragments = _aFragments;
        },

        //*----------------------------------------------------------------
        //*| MÉTODOS ODATA                          					  |
        //*----------------------------------------------------------------
        // Función para obtener un registro OData del servicio
        getOData: async function (sEntity) {
            var sServiceUrl = "/sap/opu/odata/SAP/ZUNIFORMES_SRV/" + sEntity;
            try {
                // Hacer la petición GET con await
                const oData = await jQuery.ajax({
                    url: sServiceUrl,
                    method: "GET",
                    dataType: "json"
                });

                // Asegúrate de que la respuesta es correcta
                if (oData && oData.d) {
                    return oData.d; // o oData.d.results si hay una lista de registros
                } else {
                    MessageToast.show("Datos no encontrados");
                    return oData.d;
                }
            } catch (oError) {
                console.error("Error en la petición OData: ", oError);
                return undefined;
            }
        },

        // Función para obtener todos los datos OData del servicio
        getSetOData: async function (oEntity) {
            var sServiceUrl = "/sap/opu/odata/SAP/ZUNIFORMES_SRV/" + oEntity + "?$format=json";
            var registers = [];
            // Llamada AJAX para traer los datos
            await jQuery.ajax({
                url: sServiceUrl,
                method: "GET",
                dataType: "json",
                success: function (oData) {
                    registers = oData.d.results;
                    return registers;
                },
                error: function (oError) {
                    MessageToast.show("Error al obtener los datos", oError);
                },
            });
            return registers;
        },

        // Función para insertar, modificar o eliminar registros masivos
        postMultipleOData: function (oEntity, oOperation, oToInAll) {
            // Retorno de promesa con resolve, reject al servicio
            return new Promise((resolve, reject) => {
                let oModelTA = new sap.ui.model.odata.v2.ODataModel(
                    "/sap/opu/odata/SAP/ZUNIFORMES_SRV",
                    true
                );

                console.log({
                    H1: oEntity,
                    H2: oOperation,
                    To_In_All: oToInAll
                })

                oModelTA.create(
                    "/In_HeaderSet",
                    {
                        H1: oEntity,
                        H2: oOperation,
                        To_In_All: oToInAll
                    },
                    {
                        async: true,
                        // Reinicia los registros de la tabla, actualizándola
                        success: (req, res) => {
                            resolve(req);
                        },
                        error: (err) => {
                            MessageToast.show("Error al guardar el registro");
                            reject(err);
                        },
                    });
            });
        },

        //*----------------------------------------------------------------
        //*| CSV			                                              |
        //*----------------------------------------------------------------
        // Función para convertir datos a formato CSV
        convertToCSV: function (data) {
            var fields = Object.keys(data[0]).filter(function (key) {
                return key !== "__metadata";
            });

            var csv = Papa.unparse(data, {
                quotes: true, // Asegura que todos los valores estén entre comillas
                quoteChar: '"',
                escapeChar: '"',
                delimiter: ",",
                header: true,
                columns: fields,
            });

            return csv;
        },

        // Función para crear y descargar un nuevo archivo CSV
        downloadCSV: function (content, fileName) {
            // Asegura la codificación UTF-8 BOM para que Excel lo reconozca correctamente
            var bom = "\uFEFF";
            var blob = new Blob([bom + content], {
                type: "text/csv;charset=utf-8;",
            });
            var link = document.createElement("a");
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        // Función para decodificar en UTF8 el archivo CSV
        decodeUTF8: function (s) {
            try {
                return decodeURIComponent(escape(s));
            } catch (e) {
                return s;
            }
        },

        // Función para verificar y procesar cada línea del archivo CSV
        onFileUploaderChange: function (oEvent, option) {
            var oFileUploader = oEvent.getSource(),
                sFileName = oEvent.getParameter("newValue"),
                that = this;

            // Reinicio del arreglo ToInAll cada subida
            that.sharedData.toInAll = [];

            // Verificar la extensión del archivo
            if (sFileName && !sFileName.endsWith(".csv")) {
                MessageToast.show("Solo se permiten archivos .csv");
                oFileUploader.setValue("");
                return;
            }

            var oFile = oEvent.getParameter("files")[0];
            if (oFile) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var sCSV = e.target.result,
                        rows = sCSV.split("\n"),
                        result = [];

                    // Procesar cada línea del CSV y convertirla a JSON
                    for (var i = 1; i < rows.length; i++) {
                        var register = rows[i].split(",");

                        // Decodificar cada campo en el registro
                        for (var j = 0; j < register.length; j++) {
                            register[j] = that
                                .decodeUTF8(register[j])
                                .replace(/\r/g, "") // Eliminar el carácter \r
                                .replace(/^"|"$/g, "") // Eliminar comillas dobles al inicio y al final
                                // Solo permite letras, letras con tildes, números, comas, puntos, 
                                // guiones bajos, guiones y espacios
                                .replace(/[^a-zA-Z0-9áÁéÉíÍóÓ/,.\-_\s]/g, ",");
                        }

                        // Se crea el cuerpo masivo JSON dependiendo de la opción
                        var regjson = that.createToInAll(register, option);
                        // Se verifica cada campo obligatorio del JSON dependiendo de la opción
                        var verifyRegJson = that.verifyToInAll(regjson, option);

                        // Solo añadir registros completos
                        if (verifyRegJson) {
                            result.push(regjson);
                        } else {
                            MessageToast.show(
                                "Hay una fila no completada correctamente"
                            );
                        }
                    }

                    if (result.length > 0) {
                        console.log(result)
                        that.sharedData.toInAll = result
                    } else {
                        MessageToast.show("No hay registros por hacer");
                    }
                };

                // Leer el archivo como texto y especificar la codificación
                reader.readAsText(oFile, "UTF-8");
            }

            return;
        },

        // Función para crear el cuerpo masivo JSON de cada entidad
        createToInAll: function (register, option) {
            switch (option) {
                //*----------------------------------------------------------------
                //*| 2_1_PACKAGES	                                              |
                //*----------------------------------------------------------------
                case "Paquetes":
                    return {
                        B1: register[0], //FUNCION
                        B2: register[1], //HIJOS
                        B3: register[2], //UNIFORME
                        B4: register[3], //TIPO_UNIFORME
                        B5: register[4], //SOCIEDAD
                        B6: register[5], //DENOM_FUNC
                        B7: register[6], //PAQUETE
                        B8: register[7], //DESCRIPCION
                    };
                //*----------------------------------------------------------------
                //*| 2_2_OPERATORS	                                              |
                //*----------------------------------------------------------------
                case "Operadores":
                    if (register[0] === '') {
                        register[0] = '0';
                    }
                    return {
                        B1: register[0], //OP_FUNCION
                        B2: register[1], //TIPO_UNIF
                        B3: register[2], //PAQUETE
                        B4: register[3], //DESCRIPCION
                    };
                //*----------------------------------------------------------------
                //*| 2_3_ASIG_PAQ_OP                                              |
                //*----------------------------------------------------------------
                case "AsigPaqOp":
                    return {
                        B1: register[1], //FUNCION
                        B2: register[3], //OP_FUNCION
                    };
                //*----------------------------------------------------------------
                //*| 3_INVENTORY	                                              |
                //*----------------------------------------------------------------
                case "Inventario":
                    if (register[0] === '') {
                        register[0] = '0';
                    }
                    var fechaEntrada = register[16].split(".");
                    fechaEntrada = fechaEntrada[2] + fechaEntrada[1] + fechaEntrada[0];
                    return {
                        B1: register[0], //ID_INV
                        B2: register[1], //FUNCION
                        B3: register[2], //DIVISION
                        B4: register[3], //ARTICULO
                        B5: register[4], //TALLA_GRAL
                        B6: register[5], //COLOR 
                        B7: register[6], //TIPO
                        B8: register[7], //LOGO
                        B9: register[8], //VIDA_UTIL
                        B10: register[9], //TALLA1
                        B11: register[10], //PRECIO1
                        B12: register[11], //TALLA2
                        B13: register[12], //PRECIO2
                        B14: register[13], //TALLA3
                        B15: register[14], //PRECIO3
                        B16: register[15], //PROVEEDOR
                        B17: fechaEntrada, //FECHA_ENTR
                        B18: register[17], //CANT_ENTR
                    };
                //*----------------------------------------------------------------
                //*| 4_1_SIZES		                                              |
                //*----------------------------------------------------------------
                case "TaGral":
                    if (register[0] === '') {
                        register[0] = '0';
                    }
                    return {
                        B1: register[0], //ID_TA_GR
                        B2: register[1], //TALLA
                        B3: register[2], //TIPO
                    };
                //*----------------------------------------------------------------
                //*| 4_2_SIZES		                                              |
                //*----------------------------------------------------------------
                case "TaInv":
                    if (register[0] === '') {
                        register[0] = '0';
                    }
                    register[6] = (Math.round(register[6] * 100) / 100).toFixed(2);
                    return {
                        B1: register[0], //ID_TA_INV
                        B2: register[1], //ID_INV
                        B3: register[2], //ARTICULO
                        B4: register[3], //ID_TA_GR
                        B5: register[4], //TALLA
                        B6: register[5], //ID_ASIGN
                        B7: register[6], //PRECIO
                    };
                //*----------------------------------------------------------------
                //*| 5_1_ASSIGNMENTS                               	              |
                //*---------------------------------------------------------------- 
                case "Asignaciones":
                    var fechaAsign = register[9].split(".");
                    fechaAsign = fechaAsign[2] + fechaAsign[1] + fechaAsign[0];
                    return {
                        B1: register[0], //ID_ASIGN
                        B2: register[1], //ID_DOC_EV
                        B3: register[2], //ENCARGADO
                        B4: register[3], //FUNCION
                        B5: register[4], //DIVISION
                        B6: register[5], //UNIDAD
                        B7: register[6], //NO_EMP
                        B8: register[7], //TIPO_UNIF
                        B9: register[8], //TALLA_GRAL
                        B10: fechaAsign, //FECHA_ASIGN
                        //TALLAS_INV
                        B11: register[10], //ID_INV
                        B12: register[11], //ID_TA_GR
                        B13: register[12], //PRECIO
                    }
                //*----------------------------------------------------------------
                //*| 5_2_ASSIGNMENTS                               	              |
                //*----------------------------------------------------------------
                case "TallasAsig":
                    return {
                        B1: register[1], //ID_ASIGN
                    }
                //*----------------------------------------------------------------
                //*| 6_IN_CHARGE	                                              |
                //*----------------------------------------------------------------
                case "Encargados":
                    return {
                        B1: register[0], //NO_EMP
                        B2: register[1], //RH
                        B3: register[2], //CIUDAD1
                        B4: register[3], //DIVISION1
                        B5: register[4], //CIUDAD2
                        B6: register[5], //DIVISION2
                        B7: register[6], //CIUDAD3
                        B8: register[7], //DIVISION3
                    };
                //*----------------------------------------------------------------
                //*| 8_1_ROTATIONS                                	              |
                //*----------------------------------------------------------------
                case "Rotaciones":
                    return {
                        B1: register[0], //NO_EMP
                        B2: register[1], //ID_ASIGN
                        B9: register[8], //CUENTA
                    };
                //*----------------------------------------------------------------
		        //*| 9_1_USERS	                                	              |
		        //*----------------------------------------------------------------
                case "Usuarios":
                    return {
                        B1: register[0], //NO_EMP
                        B2: register[1], //ROL
                        B3: register[2], //NOMBRE
                    };
                //*----------------------------------------------------------------
		        //*| 9_2_USERS	                                	              |
		        //*----------------------------------------------------------------
                case "Roles":
                    return {
                        B1: register[0], //ROL
                        B2: register[1], //DESCRIPCION
                    };
                //*----------------------------------------------------------------
		        //*| 9_3_USERS	                                	              |
		        //*----------------------------------------------------------------
                case "Permisos":
                    return {
                        B1: register[1], //ROL
                        B2: register[2], //PERMISO
                        B3: register[3], //CATALOGO
                    };
            }
        },

        // Función para verificar el cuerpo masivo JSON de cada entidad
        verifyToInAll: function (body, option) {
            switch (option) {
                //*----------------------------------------------------------------
                //*| 2_1_PACKAGES	                                              |
                //*----------------------------------------------------------------
                case "Paquetes":
                    return body.B1 && body.B2 && body.B3 && body.B4 &&
                        body.B5 && body.B6 && body.B7;
                //*----------------------------------------------------------------
                //*| 2_2_OPERATORS	                                              |
                //*----------------------------------------------------------------
                //*----------------------------------------------------------------
                //*| 4_1_SIZES		                                              |
                //*----------------------------------------------------------------
                case "Operadores":
                case "TaGral":
                    return body.B2 && body.B3;
                //*----------------------------------------------------------------
                //*| 2_3_ASIG_PAQ_OP                                              |
                //*----------------------------------------------------------------
                case "AsigPaqOp":
                    return body.B1 && body.B2;
                //*----------------------------------------------------------------
                //*| 3_INVENTORY	                                              |
                //*----------------------------------------------------------------
                case "Inventario":
                    return body.B2 && body.B4 && body.B5 && body.B7 && body.B9 &&
                        body.B10 && body.B11 && body.B16 && body.B17 && body.B18;
                //*----------------------------------------------------------------
                //*| 4_2_SIZES		                                              |
                //*----------------------------------------------------------------
                case "TaInv":
                    return body.B2 && body.B4 && body.B6 && body.B7;
                //*----------------------------------------------------------------
                //*| 5_1_ASSIGNMENTS                               	              |
                //*---------------------------------------------------------------- 
                case "Asignaciones":
                    return body.B2 && body.B3 && body.B10;
                //*----------------------------------------------------------------
                //*| 5_2_ASSIGNMENTS                               	              |
                //*----------------------------------------------------------------
                //*----------------------------------------------------------------
		        //*| 9_2_USERS	                                	              |
		        //*----------------------------------------------------------------
                case "TallasAsig":
                case "Roles":
                    return body.B1;
                //*----------------------------------------------------------------
                //*| 6_IN_CHARGE	                                              |
                //*----------------------------------------------------------------
                case "Encargados":
                    return body.B1 && body.B3;
                //*----------------------------------------------------------------
                //*| 8_1_ROTATIONS                                	              |
                //*----------------------------------------------------------------
                case "Rotaciones":
                    return body.B2 && body.B9;
                //*----------------------------------------------------------------
		        //*| 9_1_USERS	                                	              |
		        //*----------------------------------------------------------------
                //*----------------------------------------------------------------
		        //*| 9_3_USERS	                                	              |
		        //*----------------------------------------------------------------
                case "Usuarios":
                case "Permisos":
                    return body.B1 && body.B2 && body.B3;
            }
        },
    };

    return MainControllerHelper;
});