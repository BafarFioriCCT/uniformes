sap.ui.define([], function () {
    "use strict";

    var formatter = {
        // Variable para formatear fecha por .
        oDateFormat: sap.ui.core.format.DateFormat.getDateInstance({
            pattern: "dd.MM.yyyy",
            UTC: true
        }),

        // Variable para formatear fecha por tipo DATS
        oDateToDats: sap.ui.core.format.DateFormat.getDateInstance({
            pattern: "yyyyMMdd",
            UTC: true
        }),

        // Función para formatear Timestamp SAP por Date JS
        formatDateFromFormattedDate: function (sValue) {
            if (sValue) {
                var sValue = sValue.split(".");
                
                return new Date(sValue[2], sValue[1], sValue[0]);
            }
            return null; // O devolver un valor predeterminado
        },

        // Función para formatear Timestamp SAP por Date JS
        formatDateFromTimestamp: function (sValue) {
            if (sValue) {
                // Extraer el número de milisegundos del formato /Date(1725840000000)/
                var iTimestamp = parseInt(sValue.replace(/\/Date\((\d+)\)\//, "$1"), 10);
                if (!isNaN(iTimestamp)) {
                    return new Date(iTimestamp); // Devuelve un objeto Date válido
                }
            }
            return null; // O devolver un valor predeterminado
        },
    };

    return formatter;
});