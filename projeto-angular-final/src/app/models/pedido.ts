import { Produto } from "./produto"
//import { ItemPedido } from "./item-pedido"
export interface ItemPedido extends Produto{
    quantidade: number 
}

export interface Pedido {
    idPedido?: number
    usuarioId: number
    //dataPedido: Date
    dataPedido: string // no caso do usao de elementos strign para o formato de data pode ser adequado em função  do armazenamento pois, posteriormente podemos usar o pipe para a transformação em data
    itens: ItemPedido[] // aqui, podemos, neste passo, garantir que o TS não "cometa" algum tipo de equivoco no momento em que deva "conhecer"  a propriedade/ campo quantidade e faça as operações de forma adequada!!!
    valorTotal: number
}
