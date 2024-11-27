// Применяет CSS-переменные из JSON
function applyCSSVariablesFromJSON(json) {
    for (const [key, value] of Object.entries(json)) {
        document.documentElement.style.setProperty(`--${key}`, value);
    }
}