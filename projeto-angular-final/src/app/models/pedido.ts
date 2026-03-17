import { Produto } from "./produto"

export interface Pedido {
    idPedido: number
    usuarioId: number
    dataPedido: Date
    itens: Array<Produto>
}
