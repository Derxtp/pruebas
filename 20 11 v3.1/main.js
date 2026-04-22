/**

 * @param {string} label
 * @param {string} unitId 
 * @param {string} converterType 
 * @param {string} themeColor 
 * @returns {string} 
 */
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
    for (const unit in lengthData.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = lengthData.labels[unit];
        sourceUnitSelect.appendChild(option);
        
        resultsGrid.innerHTML += createResultCard(lengthData.labels[unit], unit, 'longitud', 'indigo');
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
    const valueInMeters = value * lengthData.factors[sourceUnit];

    for (const targetUnit in lengthData.factors) {
        const result = valueInMeters / lengthData.factors[targetUnit];
        const formattedResult = (targetUnit === sourceUnit) ? value.toString() : result.toLocaleString(undefined, { maximumFractionDigits: precision });
        document.getElementById(`output-longitud-${targetUnit}`).textContent = formattedResult;

        // Actualizar estilo de la tarjeta de origen
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
    for (const unit in pressureData.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = pressureData.labels[unit];
        sourceUnitSelect.appendChild(option);

        resultsGrid.innerHTML += createResultCard(pressureData.labels[unit], unit, 'presion', 'red');
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
    const valueInPascals = value * pressureData.factors[sourceUnit];

    for (const targetUnit in pressureData.factors) {
        const result = valueInPascals / pressureData.factors[targetUnit];
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
    temperatureData.units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = temperatureData.labels[unit];
        sourceUnitSelect.appendChild(option);

        resultsGrid.innerHTML += createResultCard(temperatureData.labels[unit], unit, 'temperatura', 'amber');
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
    const valueInKelvin = temperatureData.toKelvin[sourceUnit](value);
    temperatureData.units.forEach(targetUnit => {
        const result = temperatureData.fromKelvin[targetUnit](valueInKelvin);
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
    for (const unit in timeData.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = timeData.labels[unit];
        sourceUnitSelect.appendChild(option);

        resultsGrid.innerHTML += createResultCard(timeData.labels[unit], unit, 'tiempo', 'orange');
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
    const valueInSeconds = value * timeData.factors[sourceUnit];

    for (const targetUnit in timeData.factors) {
        const result = valueInSeconds / timeData.factors[targetUnit];
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
    for (const unit in massData.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = massData.labels[unit];
        sourceUnitSelect.appendChild(option);

        resultsGrid.innerHTML += createResultCard(massData.labels[unit], unit, 'masa', 'green');
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
    const valueInKilograms = value * massData.factors[sourceUnit];

    for (const targetUnit in massData.factors) {
        const result = valueInKilograms / massData.factors[targetUnit];
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
    for (const unit in volumeData.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = volumeData.labels[unit];
        sourceUnitSelect.appendChild(option);

        resultsGrid.innerHTML += createResultCard(volumeData.labels[unit], unit, 'volumen', 'teal');
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
    const valueInLiters = value * volumeData.factors[sourceUnit];

    for (const targetUnit in volumeData.factors) {
        const result = valueInLiters / volumeData.factors[targetUnit];
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
    for (const unit in angleData.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = angleData.labels[unit];
        sourceUnitSelect.appendChild(option);

        resultsGrid.innerHTML += createResultCard(angleData.labels[unit], unit, 'anguloplano', 'indigo');
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
    const valueInRadians = value * angleData.factors[sourceUnit];

    for (const targetUnit in angleData.factors) {
        const result = valueInRadians / angleData.factors[targetUnit];
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
    for (const unit in areaData.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = areaData.labels[unit];
        sourceUnitSelect.appendChild(option);

        resultsGrid.innerHTML += createResultCard(areaData.labels[unit], unit, 'area', 'cyan');
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
    const valueInMeters2 = value * areaData.factors[sourceUnit];

    for (const targetUnit in areaData.factors) {
        const result = valueInMeters2 / areaData.factors[targetUnit];
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
    for (const unit in energyData.factors) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = energyData.labels[unit];
        sourceUnitSelect.appendChild(option);

        resultsGrid.innerHTML += createResultCard(energyData.labels[unit], unit, 'energia', 'yellow');
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
    const valueInJoules = value * energyData.factors[sourceUnit];

    for (const targetUnit in energyData.factors) {
        const result = valueInJoules / energyData.factors[targetUnit];
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
    dataStorageData.UNITS.forEach(unit => {
        optionsHtml += `<option value="${unit.id}" ${unit.id === 'byte' ? 'selected' : ''}>${unit.label} (${unit.abbr})</option>`;
    });
    sourceUnitSelect.innerHTML = optionsHtml;

    let outputHtml = '';
    dataStorageData.UNITS.forEach(unit => { // Usamos la función unificada
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
        dataStorageData.UNITS.forEach(unit => {
            document.getElementById(`output-almacenamiento-${unit.id}`).textContent = '0';
            const cardElement = document.getElementById(`card-almacenamiento-${unit.id}`);
            cardElement.classList.remove('border-blue-700', 'bg-blue-50');
            cardElement.classList.add('border-gray-400', 'bg-gray-100');
        });
        return;
    }
    
    const sourceUnit = dataStorageData.UNITS.find(unit => unit.id === sourceId);
    if (!sourceUnit) return;

    const bits = sourceValue * sourceUnit.factor;

    dataStorageData.UNITS.forEach(targetUnit => {
        const targetValue = bits / targetUnit.factor;
        let formattedValue = (targetUnit.id === sourceId) ? sourceValue.toString() : targetValue.toFixed(precision);
        if (precision > 0 && bits !== 0) {
            formattedValue = formattedValue.replace(/\.?0+$/, '');
        }
        document.getElementById(`output-almacenamiento-${targetUnit.id}`).textContent = formattedValue;

        const cardElement = document.getElementById(`card-almacenamiento-${targetUnit.id}`);
        const isSource = targetUnit.id === sourceId;
        cardElement.classList.toggle('border-blue-400', isSource);
        cardElement.classList.toggle('bg-blue-50', targetUnit.id === sourceId);
        cardElement.classList.toggle('border-gray-200', !isSource);
        cardElement.classList.toggle('bg-gray-50', !isSource);
    });
}

function convertSpeed() {
    const inputValue = parseFloat(document.getElementById('inputValue-velocidad').value);
    const sourceUnitId = document.getElementById('sourceUnit-velocidad').value;
    const precision = parseInt(document.getElementById('precision-velocidad').value, 10);

    const sourceUnit = speedData.UNITS.find(u => u.id === sourceUnitId);
    
    if (isNaN(inputValue) || inputValue < 0) {
        speedData.UNITS.forEach(unit => {
            document.getElementById(`output-velocidad-${unit.id}`).textContent = 'Inválido';
        });
        return;
    }

    const valueInMetersPerSecond = inputValue * sourceUnit.factor;

    speedData.UNITS.forEach(targetUnit => {
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
    
    speedData.UNITS.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit.id;
        option.textContent = `${unit.name} (${unit.symbol})`;
        sourceUnitSelect.appendChild(option);
    });

    resultsGrid.innerHTML = speedData.UNITS.map(unit => createResultCard(`${unit.name} (${unit.symbol})`, unit.id, 'velocidad', 'indigo')).join('');

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
    const resultsEl = document.getElementById('resultsGrid-eficiencia');
    const precision = parseInt(document.getElementById('precision-eficiencia').value, 10);

    const inputValue = parseFloat(inputEl.value);
    const sourceKey = selectEl.value;
    const sourceUnit = fuelEfficiencyData.UNITS[sourceKey];

    if (isNaN(inputValue) || inputValue <= 0) {
        Object.keys(fuelEfficiencyData.UNITS).forEach(key => {
            const outputEl = document.getElementById(`output-eficiencia-${key}`);
            if (outputEl) outputEl.textContent = 'Inválido';
        });
        return;
    }

    let baseKMPLValue = sourceUnit.isInverse ? sourceUnit.factorToKMPL / inputValue : inputValue * sourceUnit.factorToKMPL;
    
    // Re-ejecutar la conversión para llenar los valores y aplicar estilos
    Object.entries(fuelEfficiencyData.UNITS).forEach(([targetKey, targetUnit]) => {
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
    Object.entries(fuelEfficiencyData.UNITS).forEach(([key, unit]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = unit.name + ` (${unit.symbol})`;
        fragment.appendChild(option);
    });
    selectEl.appendChild(fragment);

    resultsGrid.innerHTML = Object.entries(fuelEfficiencyData.UNITS).map(([key, unit]) => createResultCard(`${unit.name} (${unit.symbol})`, key, 'eficiencia', 'teal')).join('');

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
    // --- Lógica del menú lateral (Sidebar) ---
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    // --- Lógica para resaltar el enlace activo ---
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-indigo-700', 'text-white');
        } else {
            link.classList.remove('bg-indigo-700', 'text-white');
        }
    });

    // --- Inicialización del conversor adecuado ---
    // Revisa si estamos en la página de longitud
    if (document.getElementById('resultsGrid-longitud')) {
        initializeLengthConverter();
        // Asigna los eventos a los elementos del conversor de longitud
        document.getElementById('inputValue-longitud').addEventListener('input', convertLength);
        document.getElementById('precision-longitud').addEventListener('change', convertLength);
        document.getElementById('sourceUnit-longitud').addEventListener('change', convertLength);
    }

    // Revisa si estamos en la página de presión
    if (document.getElementById('resultsGrid-presion')) {
        initializePressureConverter();
        // Asigna los eventos a los elementos del conversor de presión
        document.getElementById('inputValue-presion').addEventListener('input', convertPressure);
        document.getElementById('precision-presion').addEventListener('change', convertPressure);
        document.getElementById('sourceUnit-presion').addEventListener('change', convertPressure);
    }

    // Revisa si estamos en la página de temperatura
    if (document.getElementById('resultsGrid-temperatura')) {
        initializeTemperatureConverter();
        // Asigna los eventos a los elementos del conversor de temperatura
        document.getElementById('inputValue-temperatura').addEventListener('input', convertTemperature);
        document.getElementById('precision-temperatura').addEventListener('change', convertTemperature);
        document.getElementById('sourceUnit-temperatura').addEventListener('change', convertTemperature);
    }

    // Revisa si estamos en la página de tiempo
    if (document.getElementById('resultsGrid-tiempo')) {
        initializeTimeConverter();
        // Asigna los eventos a los elementos del conversor de tiempo
        document.getElementById('inputValue-tiempo').addEventListener('input', convertTime);
        document.getElementById('precision-tiempo').addEventListener('change', convertTime);
        document.getElementById('sourceUnit-tiempo').addEventListener('change', convertTime);
    }

    // Revisa si estamos en la página de masa
    if (document.getElementById('resultsGrid-masa')) {
        initializeMassConverter();
        // Asigna los eventos a los elementos del conversor de masa
        document.getElementById('inputValue-masa').addEventListener('input', convertMass);
        document.getElementById('precision-masa').addEventListener('change', convertMass);
        document.getElementById('sourceUnit-masa').addEventListener('change', convertMass);
    }

    // Revisa si estamos en la página de volumen
    if (document.getElementById('resultsGrid-volumen')) {
        initializeVolumeConverter();
        // Asigna los eventos a los elementos del conversor de volumen
        document.getElementById('inputValue-volumen').addEventListener('input', convertVolume);
        document.getElementById('precision-volumen').addEventListener('change', convertVolume);
        document.getElementById('sourceUnit-volumen').addEventListener('change', convertVolume);
    }

    // Revisa si estamos en la página de ángulo plano
    if (document.getElementById('resultsGrid-anguloplano')) {
        initializeAngleConverter();
        // Asigna los eventos a los elementos del conversor de ángulo plano
        document.getElementById('inputValue-anguloplano').addEventListener('input', convertAngle);
        document.getElementById('precision-anguloplano').addEventListener('change', convertAngle);
        document.getElementById('sourceUnit-anguloplano').addEventListener('change', convertAngle);
    }

    // Revisa si estamos en la página de área
    if (document.getElementById('resultsGrid-area')) {
        initializeAreaConverter();
        // Asigna los eventos a los elementos del conversor de área
        document.getElementById('inputValue-area').addEventListener('input', convertArea);
        document.getElementById('precision-area').addEventListener('change', convertArea);
        document.getElementById('sourceUnit-area').addEventListener('change', convertArea);
    }

    // Revisa si estamos en la página de energía
    if (document.getElementById('resultsGrid-energia')) {
        initializeEnergyConverter();
        // Asigna los eventos a los elementos del conversor de energía
        document.getElementById('inputValue-energia').addEventListener('input', convertEnergy);
        document.getElementById('precision-energia').addEventListener('change', convertEnergy);
        document.getElementById('sourceUnit-energia').addEventListener('change', convertEnergy);
    }

    // Revisa si estamos en la página de almacenamiento de datos
    if (document.getElementById('resultsGrid-almacenamiento')) {
        initializeDataStorageConverter();
        // Asigna los eventos a los elementos del conversor de almacenamiento
        document.getElementById('inputValue-almacenamiento').addEventListener('input', convertDataStorage);
        document.getElementById('precision-almacenamiento').addEventListener('change', convertDataStorage);
        document.getElementById('sourceUnit-almacenamiento').addEventListener('change', convertDataStorage);
    }

    // Revisa si estamos en la página de velocidad
    if (document.getElementById('resultsGrid-velocidad')) {
        initializeSpeedConverter();
        // Asigna los eventos a los elementos del conversor de velocidad
        document.getElementById('inputValue-velocidad').addEventListener('input', convertSpeed);
        document.getElementById('precision-velocidad').addEventListener('change', convertSpeed);
        document.getElementById('sourceUnit-velocidad').addEventListener('change', convertSpeed);
    }
    
    // Revisa si estamos en la página de eficiencia de combustible
    if (document.getElementById('resultsGrid-eficiencia')) {
        initializeFuelEfficiencyConverter();
        // Asigna los eventos a los elementos del conversor de eficiencia de combustible
        document.getElementById('inputValue-eficiencia').addEventListener('input', convertFuelEfficiency);
        document.getElementById('precision-eficiencia').addEventListener('change', convertFuelEfficiency);
        document.getElementById('selectUnit-eficiencia').addEventListener('change', convertFuelEfficiency);
    }

});
