// Применяет CSS-переменные из JSON
function applyCSSVariablesFromJSON(json) {
    for (const [key, value] of Object.entries(json)) {
        console.log(key, value);
        document.documentElement.style.setProperty(`--${key}`, value);
    }
}