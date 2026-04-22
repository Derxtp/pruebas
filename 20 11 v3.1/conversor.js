#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length < 3) {
    console.log("=========================================");
    console.log(" Digihiggs CLI - Conversor Universal");
    console.log("=========================================");
    console.log(" Uso: node conversor.js <valor> <origen> <destino>");
    console.log(" Ej. Longitud: node conversor.js 10 km mi");
    console.log(" Ej. Masa:     node conversor.js 5 kg lb");
    console.log(" Ej. Temp:     node conversor.js 32 F C");
    console.log(" Ej. Presión:  node conversor.js 1 atm Pa");
    console.log(" Ej. Área:     node conversor.js 1 ha m2");
    console.log(" Ej. Velocidad: node conversor.js 100 kmh ms");
    console.log(" Ej. Eficiencia Combustible: node conversor.js 10 km_per_l mpg_us");
    process.exit(1);
}

const valor = parseFloat(args[0]);
const origen = args[1];
const destino = args[2];

// Validación para asegurar que se ingresó un número
if (isNaN(valor)) {
    console.log("Error: El valor ingresado debe ser un número válido.");
    process.exit(1);
}


// --- Source of Truth ---
const PI = Math.PI; // Al modificar esta constante se alteran todos los resultados que utilicen PI en su formula

export const FACTORES_CONVERSION = {
    longitud: {
        factors: { m: 1, km: 1000, cm: 0.01, mm: 0.001, μm: 1e-6, nm: 1e-9, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
        labels: { 'm': 'Metro (m)', 'km': 'Kilómetro (km)', 'cm': 'Centímetro (cm)', 'mm': 'Milímetro (mm)', 'μm': 'Micrómetro (μm)', 'nm': 'Nanómetro (nm)', 'mi': 'Milla (mi)', 'yd': 'Yarda (yd)', 'ft': 'Pie (ft)', 'in': 'Pulgada (in)' }
    },
    presion: {
        factors: { Pa: 1, kPa: 1000, MPa: 1e6, atm: 101325, bar: 100000, psi: 6894.76, mmHg: 133.322, Torr: 133.322 },
        labels: { 'Pa': 'Pascal (Pa)', 'kPa': 'Kilopascal (kPa)', 'MPa': 'Megapascal (MPa)', 'atm': 'Atmósfera (atm)', 'bar': 'Bar (bar)', 'Torr': 'Torr (Torr)', 'mmHg': 'Milímetro de Mercurio (mmHg)', 'psi': 'Libra/Pulgada² (psi)' }
    },
    tiempo: {
        factors: { s: 1, ms: 0.001, us: 1e-6, ns: 1e-9, min: 60, h: 3600, d: 86400, wk: 604800, mo: 2629800, a: 31557600 },
        labels: { 's': 'Segundo (s)', 'ms': 'Milisegundo (ms)', 'us': 'Microsegundo (μs)', 'ns': 'Nanosegundo (ns)', 'min': 'Minuto (min)', 'h': 'Hora (h)', 'd': 'Día (d)', 'wk': 'Semana (wk)', 'mo': 'Mes (mo)', 'a': 'Año (a)' }
    },
    masa: {
        factors: { kg: 1, g: 0.001, mg: 1e-6, ug: 1e-9, t: 1000, lb: 0.45359237, oz: 0.02834952, ton_short: 907.18474, st: 6.35029318 },
        labels: { 'kg': 'Kilogramo (kg)', 'g': 'Gramo (g)', 'mg': 'Miligramo (mg)', 'ug': 'Microgramo (μg)', 't': 'Tonelada métrica (t)', 'lb': 'Libra (lb)', 'oz': 'Onza (oz)', 'ton_short': 'Tonelada corta (EE.UU.)', 'st': 'Stone (st)' }
    },
    volumen: {
        factors: { L: 1, mL: 0.001, m3: 1000, cm3: 0.001, gal_us: 3.78541, qt_us: 0.94635, pt_us: 0.47317 },
        labels: { 'L': 'Litro (L)', 'mL': 'Mililitro (mL)', 'm3': 'Metro cúbico (m³)', 'cm3': 'Centímetro cúbico (cm³)', 'gal_us': 'Galón (EE.UU.)', 'qt_us': 'Cuarto (EE.UU.)', 'pt_us': 'Pinta (EE.UU.)' }
    },
    angulo: {
        factors: { radian: 1, degree: PI / 180, gradian: PI / 200, arcmin: PI / 10800, arcsec: PI / 648000, revolution: 2 * PI },
        labels: { 'radian': 'Radián (rad)', 'degree': 'Grado (°)', 'gradian': 'Gradián (grad)', 'arcmin': 'Minuto de arco (\')', 'arcsec': 'Segundo de arco (")', 'revolution': 'Revolución (rev)' }
    },
    area: {
        factors: { m2: 1, km2: 1e6, ha: 10000, ac: 4046.856, ft2: 0.092903, in2: 0.00064516, cm2: 0.0001, mm2: 0.000001 },
        labels: { 'm2': 'Metro cuadrado (m²)', 'km2': 'Kilómetro cuadrado (km²)', 'ha': 'Hectárea (ha)', 'ac': 'Acre (ac)', 'ft2': 'Pie cuadrado (ft²)', 'in2': 'Pulgada cuadrada (in²)', 'cm2': 'Centímetro cuadrado (cm²)', 'mm2': 'Milímetro cuadrado (mm²)' }
    },
    energia: {
        factors: { J: 1, kJ: 1000, cal_th: 4.184, kcal: 4184, Wh: 3600, kWh: 3600000, eV: 1.602e-19, BTU: 1055.056 },
        labels: { 'J': 'Julio (J)', 'kJ': 'Kilojulio (kJ)', 'cal_th': 'Caloría termoquímica (cal)', 'kcal': 'Kilocaloría (kcal)', 'Wh': 'Vatio-hora (Wh)', 'kWh': 'Kilovatio-hora (kWh)', 'eV': 'Electronvoltio (eV)', 'BTU': 'Unidad Térmica Británica (BTU)' }
    },
    almacenamiento_datos: {
        factors: { bit: 1, b: 1, byte: 8, B: 8, KB: 8000, MB: 8e6, GB: 8e9, TB: 8e12, KiB: 8192, MiB: 8388608 },
        labels: { 'bit': 'Bit (bit)', 'b': 'Bit (b)', 'byte': 'Byte (B)', 'B': 'Byte (B)', 'KB': 'Kilobyte (KB)', 'MB': 'Megabyte (MB)', 'GB': 'Gigabyte (GB)', 'TB': 'Terabyte (TB)', 'KiB': 'Kibibyte (KiB)', 'MiB': 'Mebibyte (MiB)' }
    },
    velocidad: {
        factors: { m_s: 1, km_h: 1/3.6, mph: 0.44704, knot: 0.51444, ft_s: 0.3048 },
        labels: { 'm_s': 'Metros por segundo (m/s)', 'km_h': 'Kilómetros por hora (km/h)', 'mph': 'Millas por hora (mph)', 'knot': 'Nudo (kn)', 'ft_s': 'Pies por segundo (ft/s)' }
    },
    eficiencia_combustible: {
        factors: { km_per_l: 1, mpg_us: 1, l_per_100km: 1, mpg_imp: 1, km_l: 1 },
        labels: { 'km_per_l': 'Kilómetros por litro (km/L)', 'mpg_us': 'Millas por galón EE.UU. (mpg)', 'l_per_100km': 'Litros por 100km (L/100km)', 'mpg_imp': 'Millas por galón Imp. (mpg)', 'km_l': 'Kilómetros por litro (km/L)' }
    },

    // la temperatura esta separada del resto por que necesita una logica especial integrada 
    temperatura: {
        units: ['C', 'F', 'K', 'R'],
        labels: { 'C': 'Grados Celsius (°C)', 'F': 'Grados Fahrenheit (°F)', 'K': 'Kelvin (K)', 'R': 'Rankine (°R)' },
        toK: { 
            'K': t => t, 
            'C': t => t + 273.15, 
            'F': t => (t - 32) * 5/9 + 273.15, 
            'R': t => t * 5/9 
        },
        fromK: { 
            'K': t => t, 
            'C': t => t - 273.15, 
            'F': t => (t - 273.15) * 9/5 + 32, 
            'R': t => t * 9/5 
        }
    }
};
// --- End of the Source of Truth ---




// --- MOTOR DE CONVERSIÓN ---
let resultado = null;
const temp = FACTORES_CONVERSION.temperatura; // Atajo para la temperatura

// A. Conversión de Temperatura
if (temp.units.includes(origen) && temp.units.includes(destino)) {
    resultado = temp.fromK[destino](temp.toK[origen](valor));
} 
// B. Conversión de Eficiencia de Combustible
else if (FACTORES_CONVERSION.eficiencia_combustible.factors[origen] && FACTORES_CONVERSION.eficiencia_combustible.factors[destino]) {
    let kmpl;
    // 1. Todo a km/l
    if (origen === 'l_per_100km' || origen === 'km_l') kmpl = 100 / valor;
    else if (origen === 'mpg_us') kmpl = valor * 0.425144;
    else if (origen === 'mpg_imp') kmpl = valor * 0.354006;
    else kmpl = valor; // km_per_l

    // 2. De km/l al destino
    if (destino === 'l_per_100km' || destino === 'km_l') resultado = 100 / kmpl;
    else if (destino === 'mpg_us') resultado = kmpl / 0.425144;
    else if (destino === 'mpg_imp') resultado = kmpl / 0.354006;
    else resultado = kmpl; // km_per_l
}
// C. Búsqueda automática en las otras categorías lineales
else {
    for (const cat in FACTORES_CONVERSION) {
        // Ignoramos la temperatura porque ya la manejamos arriba
        if (cat === 'temperatura') continue; 

        const cajonFactores = FACTORES_CONVERSION[cat].factors;

        // Buscamos dentro de la subcarpeta 'factors'
        if (cajonFactores && cajonFactores[origen] && cajonFactores[destino]) {
            resultado = (valor * cajonFactores[origen]) / cajonFactores[destino];
            break;
        }
    }
}

// --- SALIDA ---
if (resultado !== null) {
    console.log(`✅ Digihiggs Resultado: ${valor} ${origen} = ${resultado.toFixed(8)} ${destino}`);
} else {
    console.log("❌ Error: Unidad no reconocida o incompatibles entre sí (ej. no puedes convertir km a kg).");
}
// --- End of the MOTOR DE CONVERSIÓN  ---