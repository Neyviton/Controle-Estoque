import { executeTransaction } from '@/db/index.js'

export class BaseModel {
    static storeName = ''

    /**
   * Retorna todos os registros instanciados como objetos da classe filha.
   */
static async listarTodos() {
    const registros = await executeTransaction(this.storeName, 'readonly', (store) =>
        store.getAll()
    )
    return registros.map((item) => new this(item))
    }

/**
   * Busca um único registro pelo identificador único.
   * @param {string} id
   */
static async buscarPorId(id) {
    const registro = await executeTransaction(this.storeName, 'readonly', (store) =>
        store.get(id)
    )
    return registro ? new this(registro) : null
    }

/**
   * Cria ou atualiza o registro atual no IndexedDB.
   */
async salvar() {
    const storeName = this.constructor.storeName
    const dadosPlanos = { ...this }

    await executeTransaction(storeName, 'readwrite', (store) => store.put(dadosPlanos))
    return this
    }

    /**
   * Remove um registro pelo ID.
   * @param {string} id
   */
static async excluir(id) {
    await executeTransaction(this.storeName, 'readwrite', (store) => store.delete(id))
}
}