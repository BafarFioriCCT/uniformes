sap.ui.define([
    "zuniformes/libs/graph",
], function () {
    "use strict";

    var GraphHelper = {
        // Permisos permanentes de la API Graph
        graphClient: null,

        getToken: new Promise((resp, rej) => {
            let sServiceUrl = "/sap/opu/odata/sap/ZOD_ONEDRIVE_SRV";
            let oModelTA = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
                useBatch: true,
                user: "SY_TEST",
                password: "Sistemas.2023"
            });
            oModelTA.read("/TokenSet('o')", {
                async: true,
                success: function (req, res) {
                    resp(res.data.access_token);
                },
                error: function (err) {
                    rej(err);
                }
            });
        }),

        // Función para Set del cliente Graph
        setGraphClient: async function () {
            this.authProvider = {
                getAccessToken: async () => {
                    // Retorna el token esperado
                    return this.getToken;
                }
            }
            // Set del cliente de la API Graph de Microsoft
            this.graphClient = MicrosoftGraph.Client.initWithMiddleware({
                authProvider: this.authProvider // Dato tipo authProvider
            });
        },

        getUserId: async function () {
            let token = await this.getToken;

            let promesa = await new Promise(async (resolve, reject) => {
                let url = "https://graph.microsoft.com/v1.0/users/ceaguirre@bafar.com.mx";
                let headers = {
                    "Authorization": "Bearer " + token
                };

                try {
                    let response = await fetch(url, { method: "GET", headers: headers });
                    if (!response.ok) {
                        let data = await response.json();
                        reject("Error en la respuesta del JSON");
                    } else {
                        let data = await response.json();
                        resolve(data);
                    }
                } catch (error) {
                    reject("Hubo un problema al obtener el ID: " + error.message);
                }
            });

            let response = await promesa;
            if (response.id) {
                return response.id;
            }
        },

        // Obtener los archivos por rutas específicas del OneDrive
        getFiles: async function () {
            try {
                const userId = await this.getUserId();
                const response = await this.graphClient
                    .api(`/users/${userId}/drive/root:/Sistema_Automatizado_Uniformes/Graph_DocEvidencias:/children`)
                    .select('id,name,folder,package')
                    .get();
                return response.value;
            } catch (error) {
                console.error(error);
            }
        },

        // Función para obtener la vista previa del archivo
        previewFile: async function (fileName) {
            try {
                // Obtener el token de acceso
                const accessToken = await this.getToken;

                const userId = await this.getUserId();

                // URL para obtener la vista previa del archivo
                const sUrl = `https://graph.microsoft.com/v1.0/users/${userId}/drive/root:/Sistema_Automatizado_Uniformes/Graph_DocEvidencias/${fileName}:/preview`;

                // Solicitud POST para obtener la vista previa
                const response = await fetch(sUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });

                // Validar el estado de la respuesta
                if (!response.ok) {
                    throw new Error(`Error al obtener la vista previa: ${response.statusText}`);
                }

                // Obtener el JSON de respuesta
                const oData = await response.json();

                // Retorna la URL de la vista previa si está disponible
                return oData.getUrl;
            } catch (error) {
                console.error("Error durante la solicitud de vista previa:", error);
            }
        },

        // Función para descargar archivos del repositorio OneDrive
        downloadFile: async function (fileName) {
            try {
                const userId = await this.getUserId();
                const response = await this.graphClient
                    .api(`/users/${userId}/drive/root:/Sistema_Automatizado_Uniformes/Graph_DocEvidencias/${fileName}`)
                    .select('@microsoft.graph.downloadUrl')
                    .get();
                const downloadUrl = response["@microsoft.graph.downloadUrl"];
                // Abrir cada archivo en una nueva pestaña para que las descargas no se sobrescriban
                window.open(downloadUrl, "_blank");
            } catch (error) {
                console.error(error);
            }
        },

        // Función para subir archivo a repositorio OneDrive
        uploadFile: async function (oFile) {
            try {
                // Obtener el token de acceso
                const accessToken = await this.getToken;

                const userId = await this.getUserId();

                // Construir la URL de destino
                const url = `https://graph.microsoft.com/v1.0/users/${userId}/drive/root:/Sistema_Automatizado_Uniformes/Graph_DocEvidencias/${oFile.name}:/content`;

                // Configurar la solicitud HTTP
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/octet-stream', // Cambiar si se necesita un tipo específico
                    },
                    body: oFile, // Archivo o contenido del archivo
                });

                // Manejar la respuesta
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error al subir el archivo:', errorData);
                    throw new Error(`Error en la subida: ${response.status} ${response.statusText}`);
                }

                // Devolver la respuesta exitosa
                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Error durante la carga del archivo:', error);
                return error;
            }
        },

        // Función para eliminar archivo del repositorio OneDrive
        deleteFile: async function (fileName) {
            try {
                const userId = await this.getUserId();
                await this.graphClient
                    .api(`/users/${userId}/drive/root:/Sistema_Automatizado_Uniformes/Graph_DocEvidencias/${fileName}`)
                    .delete();
            } catch (error) {
                console.error('Error durante la eliminación del archivo:', error);
            }
        },
    }

    return GraphHelper;
});