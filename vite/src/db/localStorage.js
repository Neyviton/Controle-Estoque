const PREFIX = 'stockflow:'

/**
 * Salva uma preferência simples no localStorage.
 * @param {string} key
 * @param {any} value
 */
export function salvarPreferencia(key, value) {
    try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(`${PREFIX}${key}`, serialized)
} catch (error) {
    console.error(`Erro ao salvar preferência "${key}" no localStorage:`, error)
    }
}

/**
 * Recupera uma preferência do localStorage ou retorna um valor padrão.
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
export function obterPreferencia(key, defaultValue = null) {
    try {
    const item = localStorage.getItem(`${PREFIX}${key}`)
    return item !== null ? JSON.parse(item) : defaultValue
    } catch (error) {
    console.error(`Erro ao ler preferência "${key}" no localStorage:`, error)
    return defaultValue
    }
}

/**
 * Remove uma preferência específica do localStorage.
 * @param {string} key
 */
export function removerPreferencia(key) {
    try {
    localStorage.removeItem(`${PREFIX}${key}`)
    } catch (error) {
    console.error(`Erro ao remover preferência "${key}" no localStorage:`, error)
    }
}