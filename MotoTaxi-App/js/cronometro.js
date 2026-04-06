// Importamos la configuración para saber los costos y tiempos
import configuracionApp from './config_negocio.js';

let tiempoTranscurrido = 0; // Segundos
let intervalo;
let costoExtraTotal = 0;

function iniciarCronometro() {
    // Resetear valores cada vez que inicia una parada nueva
    tiempoTranscurrido = 0;
    costoExtraTotal = 0;

    intervalo = setInterval(() => {
        tiempoTranscurrido++;
        
        let minutos = Math.floor(tiempoTranscurrido / 60);
        let segundos = tiempoTranscurrido % 60;
        
        // Formatear el tiempo para que se vea como 00:00
        let tiempoVisible = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        
        // REGLA DE ORO: Si pasa de los 10 minutos de gracia...
        if (minutos >= configuracionApp.paradas.minutosDeGracia) {
            let minutosExtra = minutos - configuracionApp.paradas.minutosDeGracia;
            costoExtraTotal = minutosExtra * configuracionApp.paradas.costoPorMinutoExtra;
            
            // Aquí le avisamos a la pantalla del chofer que cambie a ROJO (Alerta)
            actualizarInterfazParada(tiempoVisible, costoExtraTotal, true);
        } else {
            // Sigue en tiempo de gracia (Color Verde o Azul)
            actualizarInterfazParada(tiempoVisible, 0, false);
        }
    }, 1000); // Se ejecuta cada segundo
}

function detenerCronometro() {
    clearInterval(intervalo);
    return costoExtraTotal; // Devuelve el dinero final para sumarlo al ticket
}

// Esta función es la que "dibuja" los datos en el celular del chofer
function actualizarInterfazParada(tiempo, extra, esExceso) {
    console.log(`Tiempo: ${tiempo} | Extra a cobrar: $${extra.toFixed(2)}`);
    // Aquí es donde el código se conectará con los textos de tu HTML
}