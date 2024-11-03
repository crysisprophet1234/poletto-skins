
const apiUrl = import.meta.env.VITE_POLETTO_SKINS_API_URL || process.env.POLETTO_SKINS_API_URL
const baseURL = `${apiUrl}/api`

export function steamAuth() {
    window.location.href = baseURL + '/login?provider=steam'
}

export function githubAuth() {
    window.location.href = baseURL + '/login?provider=github'
}