// js/motor_precios.js
export const CONFIG_PRECIOS = {
    tarifaBase: 7.00,
    tarifaNoche: 10.00,
    extraNino: 0.50,
    comisionApp: 3.00,
    ivaServicios: {
        estandar: 0.10, // 10%
        rapido: 0.20,   // 20%
        carga: 0.30     // 30%
    }
};

export function calcularTarifa(pasajeros, ninos, tipoServicio) {
    const hora = new Date().getHours();
    // Regla de las 10 PM a las 6 AM
    const base = (hora >= 22 || hora < 6) ? CONFIG_PRECIOS.tarifaNoche : CONFIG_PRECIOS.tarifaBase;
    
    let subtotal = (base * pasajeros) + (ninos * CONFIG_PRECIOS.extraNino);
    let impuesto = subtotal * CONFIG_PRECIOS.ivaServicios[tipoServicio];
    
    return Math.ceil(subtotal + impuesto + CONFIG_PRECIOS.comisionApp);
}