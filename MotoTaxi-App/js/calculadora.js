// Importamos el cerebro que hicimos en el paso anterior
import configuracionApp from './config_negocio.js';

// FUNCIÓN: Calcular el estimado del viaje
function calcularEstimado(datosViaje) {
    // 1. Extraer los datos que el usuario puso en la app
    const { adultos, ninos, esDeNoche, tipoServicio, llevaCargaPesada, haraParadas } = datosViaje;
    const config = configuracionApp;

    // 2. Determinar la tarifa base según la hora
    let tarifaActual = esDeNoche ? config.tarifasBase.noche : config.tarifasBase.dia;

    // 3. Calcular el costo por las personas (Niños pagan la mitad)
    let totalPersonas = adultos + (ninos * config.multiplicadorNinos);
    let costoPasajeros = totalPersonas * tarifaActual;

    // 4. Calcular el Impuesto de la App (IVA)
    // Regla especial: Si lleva carga pesada, cobramos el IVA Pro automáticamente
    let porcentajeIva = config.ivaServicio[tipoServicio];
    if (llevaCargaPesada) {
        porcentajeIva = config.ivaServicio.pro; 
    }
    
    let impuestoApp = costoPasajeros * porcentajeIva;

    // 5. Sumar extras (Paradas)
    let costoExtras = 0;
    if (haraParadas) {
        costoExtras = config.paradas.costoInicial; // Suma los $5 de golpe
    }

    // 6. SUMA TOTAL (Antes de redondear)
    let subtotal = costoPasajeros + impuestoApp + costoExtras;

    // 7. EL REDONDEO INTELIGENTE (Para no pelear por centavos)
    // Math.round() convierte 20.40 a 20.00, y 20.60 a 21.00
    let totalRedondeado = Math.round(subtotal);

    // 8. Crear el "Ticket" listo para mostrar en la pantalla
    return {
        desglose: {
            pasajeros: costoPasajeros.toFixed(2),
            servicioApp: impuestoApp.toFixed(2),
            extras: costoExtras.toFixed(2)
        },
        totalCobrar: totalRedondeado.toFixed(2) // Esto es lo que verá en grande el usuario
    };
}

// ==========================================
// EJEMPLO DE CÓMO FUNCIONA EN LA VIDA REAL:
// ==========================================
/*
Si un usuario en el día pide viaje para 2 adultos y 1 niño, 
en servicio Estándar, sin carga pesada, pero CON 1 parada:

const viajeEjemplo = {
    adultos: 2,
    ninos: 1, // Cuenta como 0.5
    esDeNoche: false, // Tarifa de $7
    tipoServicio: 'estandar', // IVA de 20%
    llevaCargaPesada: false,
    haraParadas: true // Suma $5
};

console.log(calcularEstimado(viajeEjemplo));
// Resultado interno: Pasajeros: $17.50 | IVA: $3.50 | Parada: $5.00 | Subtotal: $26.00
*/