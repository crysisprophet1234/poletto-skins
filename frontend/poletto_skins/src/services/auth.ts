
const apiUrl = import.meta.env.VITE_POLETTO_SKINS_API_URL || process.env.POLETTO_SKINS_API_URL
const apiPort = import.meta.env.VITE_POLETTO_SKINS_API_PORT || process.env.POLETTO_SKINS_API_URL
const apiBaseUrl = apiUrl + ':' + apiPort

export function steamAuth() {
    window.location.href = apiBaseUrl + '/api/login?provider=steam'
}

export function githubAuth() {
    window.location.href = apiBaseUrl + '/api/login?provider=github'
}