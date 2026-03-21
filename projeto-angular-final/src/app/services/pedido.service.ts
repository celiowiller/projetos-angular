// a responsabilidade deste service é: acessar a nossa base/endpoint  pedidos[] e nos dar acesso  a este dados para que possamos ter, se necessario, informações a respeito de historico de pedidos de um usuario - autenticado e autorizado a acessar a aplicação
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  // ---- 1º bloco
  private http = inject(HttpClient)
  private readonly apiURL = 'http://localhost:3000/pedidos'

  private _pedidos = signal<Pedido[]>([])
  pedidos = computed(() => this._pedidos())


  constructor() { }

  // ----- 2º bloco
  // 1º método: definir a listagem dos pedidos de um usuario logado
  listarMeusPedidos(usuarioId: number){
  return this.http.get<Pedido[]>(`${this.apiURL}?usuarioId=${usuarioId}`)
  .pipe(
    tap((meusPedidos) => {
      console.log('Pedidos do usuário:', meusPedidos)
      this._pedidos.set(meusPedidos)
    })
  )
}

  // 2º método: agora, vamos definir o método que cria/salva um novo na base de dados
  salvarPedido(pedido: Pedido){
    return this.http.post<Pedido>(this.apiURL, pedido)
    .pipe(
      tap(
        (novoPedido) => { this._pedidos.update((lista) => [...lista, novoPedido])}
      )
    )
  }

  /**
   * Nível 2: Admin lista tudo
   * 3º método: admin poderá acessar todos os pedidos
   */
  adminListarTodosPedidos(params?: { usuarioId?: number }) {
    let url = this.apiURL
    if (params?.usuarioId) url += `?usuarioId=${params.usuarioId}`
    
    return this.http.get<Pedido[]>(url).pipe(
      tap((todos) => this._pedidos.set(todos))
    );
  }

}
