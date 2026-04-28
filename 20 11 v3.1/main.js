// OBTENEMOS LOS DATOS DE CONVERSOR.JS AUTOMÁTICAMENTE
const DB = window.FACTORES_CONVERSION;

function createResultCard(label, unitId, converterType, themeColor) {
    return `
        <div id="card-${converterType}-${unitId}" class="result-card bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-200">
            <p class="text-sm font-medium text-${themeColor}-600">${label}</p>
            <p id="output-${converterType}-${unitId}" class="text-xl font-bold text-gray-900 mt-1 break-words">0.00</p>
        </div>
    `;
}

function initializeLengthConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-longitud');
    const resultsGrid = document.getElementById('resultsGrid-longitud');
    const precisionSelect = document.getElementById('precision-longitud');
    
    for (const unit in DB.longitud.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.longitud.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.longitud.labels[unit], unit, 'longitud', 'indigo');
    }
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 'm';
    convertLength();
}

function convertLength() {
    const value = parseFloat(document.getElementById('inputValue-longitud').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-longitud').value;
    const precision = parseInt(document.getElementById('precision-longitud').value, 10);
    const valueInMeters = value * DB.longitud.factors[sourceUnit];

    for (const targetUnit in DB.longitud.factors) {
        const result = valueInMeters / DB.longitud.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-longitud-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-longitud-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-indigo-50', isSource);
        card.classList.toggle('border-indigo-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    }
}

function initializePressureConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-presion');
    const resultsGrid = document.getElementById('resultsGrid-presion');
    const precisionSelect = document.getElementById('precision-presion');
    for (const unit in DB.presion.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.presion.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.presion.labels[unit], unit, 'presion', 'red');
    }
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 'Pa';
    convertPressure();
}

function convertPressure() {
    const value = parseFloat(document.getElementById('inputValue-presion').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-presion').value;
    const precision = parseInt(document.getElementById('precision-presion').value, 10);
    const valueInPascals = value * DB.presion.factors[sourceUnit];

    for (const targetUnit in DB.presion.factors) {
        const result = valueInPascals / DB.presion.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-presion-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-presion-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-red-50', isSource);
        card.classList.toggle('border-red-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    }
}

function initializeTemperatureConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-temperatura');
    const resultsGrid = document.getElementById('resultsGrid-temperatura');
    const precisionSelect = document.getElementById('precision-temperatura');
    DB.temperatura.units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.temperatura.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.temperatura.labels[unit], unit, 'temperatura', 'amber');
    });
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 'C';
    convertTemperature();
}

function convertTemperature() {
    const value = parseFloat(document.getElementById('inputValue-temperatura').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-temperatura').value;
    const precision = parseInt(document.getElementById('precision-temperatura').value, 10);
    const valueInKelvin = DB.temperatura.toKelvin[sourceUnit](value);
    DB.temperatura.units.forEach(targetUnit => {
        const result = DB.temperatura.fromKelvin[targetUnit](valueInKelvin);
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toFixed(precision);
        document.getElementById(`output-temperatura-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-temperatura-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-amber-50', isSource);
        card.classList.toggle('border-amber-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    });
}

function initializeTimeConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-tiempo');
    const resultsGrid = document.getElementById('resultsGrid-tiempo');
    const precisionSelect = document.getElementById('precision-tiempo');
    for (const unit in DB.tiempo.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.tiempo.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.tiempo.labels[unit], unit, 'tiempo', 'orange');
    }
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 's';
    convertTime();
}

function convertTime() {
    const value = parseFloat(document.getElementById('inputValue-tiempo').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-tiempo').value;
    const precision = parseInt(document.getElementById('precision-tiempo').value, 10);
    const valueInSeconds = value * DB.tiempo.factors[sourceUnit];

    for (const targetUnit in DB.tiempo.factors) {
        const result = valueInSeconds / DB.tiempo.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-tiempo-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-tiempo-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-orange-50', isSource);
        card.classList.toggle('border-orange-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    }
}

function initializeMassConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-masa');
    const resultsGrid = document.getElementById('resultsGrid-masa');
    const precisionSelect = document.getElementById('precision-masa');
    for (const unit in DB.masa.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.masa.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.masa.labels[unit], unit, 'masa', 'green');
    }
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 'kg';
    convertMass();
}

function convertMass() {
    const value = parseFloat(document.getElementById('inputValue-masa').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-masa').value;
    const precision = parseInt(document.getElementById('precision-masa').value, 10);
    const valueInKilograms = value * DB.masa.factors[sourceUnit];

    for (const targetUnit in DB.masa.factors) {
        const result = valueInKilograms / DB.masa.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-masa-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-masa-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-green-50', isSource);
        card.classList.toggle('border-green-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    }
}

function initializeVolumeConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-volumen');
    const resultsGrid = document.getElementById('resultsGrid-volumen');
    const precisionSelect = document.getElementById('precision-volumen');
    for (const unit in DB.volumen.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.volumen.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.volumen.labels[unit], unit, 'volumen', 'teal');
    }
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 'L';
    convertVolume();
}

function convertVolume() {
    const value = parseFloat(document.getElementById('inputValue-volumen').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-volumen').value;
    const precision = parseInt(document.getElementById('precision-volumen').value, 10);
    const valueInLiters = value * DB.volumen.factors[sourceUnit];

    for (const targetUnit in DB.volumen.factors) {
        const result = valueInLiters / DB.volumen.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-volumen-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-volumen-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-teal-50', isSource);
        card.classList.toggle('border-teal-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    }
}

function initializeAngleConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-anguloplano');
    const resultsGrid = document.getElementById('resultsGrid-anguloplano');
    const precisionSelect = document.getElementById('precision-anguloplano');
    for (const unit in DB.angulo.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.angulo.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.angulo.labels[unit], unit, 'anguloplano', 'indigo');
    }
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 'degree';
    convertAngle();
}

function convertAngle() {
    const value = parseFloat(document.getElementById('inputValue-anguloplano').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-anguloplano').value;
    const precision = parseInt(document.getElementById('precision-anguloplano').value, 10);
    const valueInRadians = value * DB.angulo.factors[sourceUnit];

    for (const targetUnit in DB.angulo.factors) {
        const result = valueInRadians / DB.angulo.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-anguloplano-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-anguloplano-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-indigo-50', isSource);
        card.classList.toggle('border-indigo-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    }
}

function initializeAreaConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-area');
    const resultsGrid = document.getElementById('resultsGrid-area');
    const precisionSelect = document.getElementById('precision-area');
    for (const unit in DB.area.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.area.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.area.labels[unit], unit, 'area', 'cyan');
    }
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 'm2';
    convertArea();
}

function convertArea() {
    const value = parseFloat(document.getElementById('inputValue-area').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-area').value;
    const precision = parseInt(document.getElementById('precision-area').value, 10);
    const valueInMeters2 = value * DB.area.factors[sourceUnit];

    for (const targetUnit in DB.area.factors) {
        const result = valueInMeters2 / DB.area.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-area-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-area-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-cyan-50', isSource);
        card.classList.toggle('border-cyan-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    }
}

function initializeEnergyConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-energia');
    const resultsGrid = document.getElementById('resultsGrid-energia');
    const precisionSelect = document.getElementById('precision-energia');
    for (const unit in DB.energia.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = DB.energia.labels[unit];
        sourceUnitSelect.appendChild(option);
        resultsGrid.innerHTML += createResultCard(DB.energia.labels[unit], unit, 'energia', 'yellow');
    }
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;
    sourceUnitSelect.value = 'J';
    convertEnergy();
}

function convertEnergy() {
    const value = parseFloat(document.getElementById('inputValue-energia').value) || 0;
    const sourceUnit = document.getElementById('sourceUnit-energia').value;
    const precision = parseInt(document.getElementById('precision-energia').value, 10);
    const valueInJoules = value * DB.energia.factors[sourceUnit];

    for (const targetUnit in DB.energia.factors) {
        const result = valueInJoules / DB.energia.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-energia-${targetUnit}`).textContent = formattedResult;

        const card = document.getElementById(`card-energia-${targetUnit}`);
        const isSource = targetUnit === sourceUnit;
        card.classList.toggle('bg-yellow-50', isSource);
        card.classList.toggle('border-yellow-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    }
}

function initializeDataStorageConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-almacenamiento');
    const outputGrid = document.getElementById('resultsGrid-almacenamiento');
    const precisionSelect = document.getElementById('precision-almacenamiento');
    
    let optionsHtml = '';
    DB.almacenamiento.UNITS.forEach(unit => {
        optionsHtml += `<option value="${unit.id}" ${unit.id === 'byte' ? 'selected' : ''}>${unit.label} (${unit.abbr})</option>`;
    });
    sourceUnitSelect.innerHTML = optionsHtml;

    let outputHtml = '';
    DB.almacenamiento.UNITS.forEach(unit => { 
        outputHtml += createResultCard(`${unit.label} (${unit.abbr})`, unit.id, 'almacenamiento', 'blue');
    });

    outputGrid.innerHTML = outputHtml;

    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;

    convertDataStorage();
}

function convertDataStorage() {
    const valueStr = document.getElementById('inputValue-almacenamiento').value;
    const sourceId = document.getElementById('sourceUnit-almacenamiento').value;
    const precision = parseInt(document.getElementById('precision-almacenamiento').value, 10);
    const sourceValue = parseFloat(valueStr);

    if (isNaN(sourceValue) || sourceValue < 0) {
        DB.almacenamiento.UNITS.forEach(unit => {
            document.getElementById(`output-almacenamiento-${unit.id}`).textContent = '0';
            const cardElement = document.getElementById(`card-almacenamiento-${unit.id}`);
            cardElement.classList.remove('border-blue-700', 'bg-blue-50');
            cardElement.classList.add('border-gray-400', 'bg-gray-100');
        });
        return;
    }
    
    const sourceUnit = DB.almacenamiento.UNITS.find(unit => unit.id === sourceId);
    if (!sourceUnit) return;

    const bits = sourceValue * sourceUnit.factor;

    DB.almacenamiento.UNITS.forEach(targetUnit => {
        const targetValue = bits / targetUnit.factor;
        let formattedValue = (targetUnit.id === sourceId) ? sourceValue.toString() : targetValue.toFixed(precision);
        if (precision > 0 && bits !== 0) {
            formattedValue = formattedValue.replace(/\.?0+$/, '');
        }
        document.getElementById(`output-almacenamiento-${targetUnit.id}`).textContent = formattedValue;

        const cardElement = document.getElementById(`card-almacenamiento-${targetUnit.id}`);
        const isSource = targetUnit.id === sourceId;
        cardElement.classList.toggle('border-blue-400', isSource);
        cardElement.classList.toggle('bg-blue-50', isSource);
        cardElement.classList.toggle('border-gray-200', !isSource);
        cardElement.classList.toggle('bg-gray-50', !isSource);
    });
}

function convertSpeed() {
    const inputValue = parseFloat(document.getElementById('inputValue-velocidad').value);
    const sourceUnitId = document.getElementById('sourceUnit-velocidad').value;
    const precision = parseInt(document.getElementById('precision-velocidad').value, 10);

    const sourceUnit = DB.velocidad.UNITS.find(u => u.id === sourceUnitId);
    
    if (isNaN(inputValue) || inputValue < 0) {
        DB.velocidad.UNITS.forEach(unit => {
            document.getElementById(`output-velocidad-${unit.id}`).textContent = 'Inválido';
        });
        return;
    }

    const valueInMetersPerSecond = inputValue * sourceUnit.factor;

    DB.velocidad.UNITS.forEach(targetUnit => {
        const convertedValue = valueInMetersPerSecond / targetUnit.factor;
        const formattedResult = (targetUnit.id === sourceUnitId) ? inputValue.toString() : convertedValue.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-velocidad-${targetUnit.id}`).textContent = formattedResult;

        const card = document.getElementById(`card-velocidad-${targetUnit.id}`);
        const isSource = targetUnit.id === sourceUnitId;
        card.classList.toggle('bg-indigo-50', isSource);
        card.classList.toggle('border-indigo-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    });
}

function initializeSpeedConverter() {
    const sourceUnitSelect = document.getElementById('sourceUnit-velocidad');
    const resultsGrid = document.getElementById('resultsGrid-velocidad');
    const precisionSelect = document.getElementById('precision-velocidad');
    
    DB.velocidad.UNITS.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit.id;
        option.textContent = `${unit.name} (${unit.symbol})`;
        sourceUnitSelect.appendChild(option);
    });

    resultsGrid.innerHTML = DB.velocidad.UNITS.map(unit => createResultCard(`${unit.name} (${unit.symbol})`, unit.id, 'velocidad', 'indigo')).join('');

    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;

    sourceUnitSelect.value = 'ms';
    convertSpeed();
}

function convertFuelEfficiency() {
    const inputEl = document.getElementById('inputValue-eficiencia');
    const selectEl = document.getElementById('selectUnit-eficiencia');
    const precision = parseInt(document.getElementById('precision-eficiencia').value, 10);

    const inputValue = parseFloat(inputEl.value);
    const sourceKey = selectEl.value;
    const sourceUnit = DB.eficiencia.UNITS[sourceKey];

    if (isNaN(inputValue) || inputValue <= 0) {
        Object.keys(DB.eficiencia.UNITS).forEach(key => {
            const outputEl = document.getElementById(`output-eficiencia-${key}`);
            if (outputEl) outputEl.textContent = 'Inválido';
        });
        return;
    }

    let baseKMPLValue = sourceUnit.isInverse ? sourceUnit.factorToKMPL / inputValue : inputValue * sourceUnit.factorToKMPL;
    
    Object.entries(DB.eficiencia.UNITS).forEach(([targetKey, targetUnit]) => {
        const result = targetUnit.isInverse ? targetUnit.factorToKMPL / baseKMPLValue : baseKMPLValue / targetUnit.factorToKMPL;
        const formattedResult = (targetKey === sourceKey) ? inputValue.toString() : result.toFixed(precision);
        document.getElementById(`output-eficiencia-${targetKey}`).textContent = formattedResult;
        const card = document.getElementById(`card-eficiencia-${targetKey}`);
        const isSource = targetKey === sourceKey;
        card.classList.toggle('bg-teal-50', isSource);
        card.classList.toggle('border-teal-400', isSource);
        card.classList.toggle('bg-gray-50', !isSource);
        card.classList.toggle('border-gray-200', !isSource);
    });
}

function initializeFuelEfficiencyConverter() {
    const selectEl = document.getElementById('selectUnit-eficiencia');
    const resultsGrid = document.getElementById('resultsGrid-eficiencia');
    const precisionSelect = document.getElementById('precision-eficiencia');

    const fragment = document.createDocumentFragment();
    Object.entries(DB.eficiencia.UNITS).forEach(([key, unit]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = unit.name + ` (${unit.symbol})`;
        fragment.appendChild(option);
    });
    selectEl.appendChild(fragment);

    resultsGrid.innerHTML = Object.entries(DB.eficiencia.UNITS).map(([key, unit]) => createResultCard(`${unit.name} (${unit.symbol})`, key, 'eficiencia', 'teal')).join('');

    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} decimales`;
        precisionSelect.appendChild(option);
    }
    precisionSelect.value = 8;

    selectEl.value = 'l_per_100km';
    convertFuelEfficiency();
}

// --- INICIALIZACIÓN GENERAL ---
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-indigo-700', 'text-white');
        } else {
            link.classList.remove('bg-indigo-700', 'text-white');
        }
    });

    if (document.getElementById('resultsGrid-longitud')) {
        initializeLengthConverter();
        document.getElementById('inputValue-longitud').addEventListener('input', convertLength);
        document.getElementById('precision-longitud').addEventListener('change', convertLength);
        document.getElementById('sourceUnit-longitud').addEventListener('change', convertLength);
    }
    if (document.getElementById('resultsGrid-presion')) {
        initializePressureConverter();
        document.getElementById('inputValue-presion').addEventListener('input', convertPressure);
        document.getElementById('precision-presion').addEventListener('change', convertPressure);
        document.getElementById('sourceUnit-presion').addEventListener('change', convertPressure);
    }
    if (document.getElementById('resultsGrid-temperatura')) {
        initializeTemperatureConverter();
        document.getElementById('inputValue-temperatura').addEventListener('input', convertTemperature);
        document.getElementById('precision-temperatura').addEventListener('change', convertTemperature);
        document.getElementById('sourceUnit-temperatura').addEventListener('change', convertTemperature);
    }
    if (document.getElementById('resultsGrid-tiempo')) {
        initializeTimeConverter();
        document.getElementById('inputValue-tiempo').addEventListener('input', convertTime);
        document.getElementById('precision-tiempo').addEventListener('change', convertTime);
        document.getElementById('sourceUnit-tiempo').addEventListener('change', convertTime);
    }
    if (document.getElementById('resultsGrid-masa')) {
        initializeMassConverter();
        document.getElementById('inputValue-masa').addEventListener('input', convertMass);
        document.getElementById('precision-masa').addEventListener('change', convertMass);
        document.getElementById('sourceUnit-masa').addEventListener('change', convertMass);
    }
    if (document.getElementById('resultsGrid-volumen')) {
        initializeVolumeConverter();
        document.getElementById('inputValue-volumen').addEventListener('input', convertVolume);
        document.getElementById('precision-volumen').addEventListener('change', convertVolume);
        document.getElementById('sourceUnit-volumen').addEventListener('change', convertVolume);
    }
    if (document.getElementById('resultsGrid-anguloplano')) {
        initializeAngleConverter();
        document.getElementById('inputValue-anguloplano').addEventListener('input', convertAngle);
        document.getElementById('precision-anguloplano').addEventListener('change', convertAngle);
        document.getElementById('sourceUnit-anguloplano').addEventListener('change', convertAngle);
    }
    if (document.getElementById('resultsGrid-area')) {
        initializeAreaConverter();
        document.getElementById('inputValue-area').addEventListener('input', convertArea);
        document.getElementById('precision-area').addEventListener('change', convertArea);
        document.getElementById('sourceUnit-area').addEventListener('change', convertArea);
    }
    if (document.getElementById('resultsGrid-energia')) {
        initializeEnergyConverter();
        document.getElementById('inputValue-energia').addEventListener('input', convertEnergy);
        document.getElementById('precision-energia').addEventListener('change', convertEnergy);
        document.getElementById('sourceUnit-energia').addEventListener('change', convertEnergy);
    }
    if (document.getElementById('resultsGrid-almacenamiento')) {
        initializeDataStorageConverter();
        document.getElementById('inputValue-almacenamiento').addEventListener('input', convertDataStorage);
        document.getElementById('precision-almacenamiento').addEventListener('change', convertDataStorage);
        document.getElementById('sourceUnit-almacenamiento').addEventListener('change', convertDataStorage);
    }
    if (document.getElementById('resultsGrid-velocidad')) {
        initializeSpeedConverter();
        document.getElementById('inputValue-velocidad').addEventListener('input', convertSpeed);
        document.getElementById('precision-velocidad').addEventListener('change', convertSpeed);
        document.getElementById('sourceUnit-velocidad').addEventListener('change', convertSpeed);
    }
    if (document.getElementById('resultsGrid-eficiencia')) {
        initializeFuelEfficiencyConverter();
        document.getElementById('inputValue-eficiencia').addEventListener('input', convertFuelEfficiency);
        document.getElementById('precision-eficiencia').addEventListener('change', convertFuelEfficiency);
        document.getElementById('selectUnit-eficiencia').addEventListener('change', convertFuelEfficiency);
    }
});