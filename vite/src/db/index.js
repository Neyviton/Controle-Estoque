const DB_NAME = 'stockflow_db'
const DB_VERSION = 1

/**
 * Abre (ou cria/atualiza) a conexão com o IndexedDB seguindo o padrão W3C/MDN.
 * @returns {Promise<IDBDatabase>}
 */
export function openDatabase() {
    return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
        const db = event.target.result

    if (!db.objectStoreNames.contains('produtos')) {
        const store = db.createObjectStore('produtos', { keyPath: 'id' })
        store.createIndex('nome', 'nome', { unique: false })
        store.createIndex('categoria', 'categoria', { unique: false })
        }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
})
}

/**
 * Executa uma operação transacional em uma Object Store específica.
 * @param {string} storeName
 * @param {'readonly' | 'readwrite'} mode
 * @param {(store: IDBObjectStore) => IDBRequest} callback
 * @returns {Promise<any>}
 */
export async function executeTransaction(storeName, mode, callback) {
    const db = await openDatabase()

return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode)
    const store = transaction.objectStore(storeName)
    const request = callback(store)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => db.close()
    transaction.onerror = () => reject(transaction.error)
    })
}
