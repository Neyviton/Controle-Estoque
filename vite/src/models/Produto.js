import { BaseModel } from './BaseModel.js'

export const LIMITE_ESTOQUE_BAIXO = 5

export class Produto extends BaseModel {
  static storeName = 'produtos'

  constructor({
    id = crypto.randomUUID(),
    nome = '',
    categoria = '',
    quantidade = 0,
    preco = 0,
    dataCadastro = new Date().toISOString()
  } = {}) {
    super()
    this.id = id
    this.nome = String(nome).trim()
    this.categoria = String(categoria).trim()
    this.quantidade = Number(quantidade)
    this.preco = Number(preco)
    this.dataCadastro = dataCadastro
  }

  /**
   * Indica se o produto atingiu o limite demonstrativo de estoque baixo (<= 5).
   * @returns {boolean}
   */
  get estoqueBaixo() {
    return this.quantidade <= LIMITE_ESTOQUE_BAIXO
  }

  /**
   * Valida as regras de negócio antes de salvar no banco.
   */
  validar() {
    if (!this.nome) {
      throw new Error('O nome do produto é obrigatório.')
    }

    if (!this.categoria) {
      throw new Error('A categoria do produto é obrigatória.')
    }

    if (Number.isNaN(this.quantidade) || this.quantidade < 0) {
      throw new Error('A quantidade não pode ser negativa.')
    }

    if (Number.isNaN(this.preco) || this.preco < 0) {
      throw new Error('O preço unitário não pode ser negativo.')
    }
  }

  /**
   * Sobrescreve salvar() para garantir validação antes da persistência.
   */
  async salvar() {
    this.nome = String(this.nome).trim()
    this.categoria = String(this.categoria).trim()
    this.quantidade = Number(this.quantidade)
    this.preco = Number(this.preco)

    this.validar()
    return super.salvar()
  }

  /**
   * Acrescenta unidades ao saldo e persiste no IndexedDB.
   * @param {number} qtd
   */
  async registrarEntrada(qtd) {
    const valor = Number(qtd)
    if (Number.isNaN(valor) || valor <= 0) {
      throw new Error('A quantidade de entrada deve ser maior que zero.')
    }

    this.quantidade += valor
    return this.salvar()
    }

/**
   * Reduz unidades do saldo caso haja estoque suficiente e persiste.
   * @param {number} qtd
   */
async registrarSaida(qtd) {
    const valor = Number(qtd)
    if (Number.isNaN(valor) || valor <= 0) {
        throw new Error('A quantidade de saída deve ser maior que zero.')
    }

    if (valor > this.quantidade) {
        throw new Error(
        `Saldo insuficiente. Disponível em estoque: ${this.quantidade} unidade(s).`
        )
    }

    this.quantidade -= valor
    return this.salvar()
    }
}