import { Component, inject, OnInit, signal, computed, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoService } from '../../../services/pedido.service';
import { MaterialModule } from '../../../shared/material/material.module';

import { Chart } from 'chart.js/auto';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ...MaterialModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  tituloComp: string = 'Dashboard Administrativo'

  private pedidoService = inject(PedidoService)

  pedidos = this.pedidoService.pedidos

  chart: any

  // AGORA USANDO DATE
  dataInicio = signal<Date | null>(null)
  dataFim = signal<Date | null>(null)

  constructor() {
    effect(() => {
      const dados = this.dadosGrafico()

      if (!dados.length) return

      untracked(() => {
        setTimeout(() => this.criarGrafico(dados), 0)
      })
    })
  }

  // HANDLERS CORRETOS
  onDataInicioChange(data: Date | null) {
    if (!data) {
      this.dataInicio.set(null)
      return
    }

    const inicio = new Date(data)
    inicio.setHours(0, 0, 0, 0)

    this.dataInicio.set(inicio)
  }

  onDataFimChange(data: Date | null) {
    if (!data) {
      this.dataFim.set(null)
      return
    }

    const fim = new Date(data)
    fim.setHours(23, 59, 59, 999)

    this.dataFim.set(fim)
  }

  // FILTRO CORRIGIDO
  pedidosFiltrados = computed(() => {
    const inicio = this.dataInicio()
    const fim = this.dataFim()

    return this.pedidos().filter(p => {
      const data = new Date(p.dataPedido)

      const afterInicio = inicio ? data >= inicio : true
      const beforeFim = fim ? data <= fim : true

      return afterInicio && beforeFim
    })
  })

  // KPIs
  totalPedidos = computed(() => this.pedidosFiltrados().length)

  faturamento = computed(() =>
    this.pedidosFiltrados()
      .reduce((total, p) => total + p.valorTotal, 0)
  )

  // AGRUPAMENTO POR DIA (GRÁFICO)
  dadosGrafico = computed(() => {
    const mapa = new Map<string, number>()

    this.pedidosFiltrados().forEach(p => {
      const data = new Date(p.dataPedido)

      const chave = data.toLocaleDateString('pt-BR')

      mapa.set(chave, (mapa.get(chave) || 0) + p.valorTotal)
    })

    return Array.from(mapa.entries())
      .sort((a, b) => {
        const [d1, m1, y1] = a[0].split('/')
        const [d2, m2, y2] = b[0].split('/')

        return new Date(+y1, +m1 - 1, +d1).getTime() -
               new Date(+y2, +m2 - 1, +d2).getTime()
      })
      .map(([data, valor]) => ({
        data,
        valor
      }))
  })

  // GRÁFICO
  criarGrafico(dados: any[]) {

    if (this.chart) {
      this.chart.destroy()
    }

    this.chart = new Chart('graficoPedidos', {
      type: 'line',
      data: {
        labels: dados.map(d => d.data),
        datasets: [
          {
            label: 'Faturamento no período',
            data: dados.map(d => d.valor),
            borderWidth: 2,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true
      }
    })
  }

  // INIT
  ngOnInit(): void {
    this.pedidoService.adminListarTodosPedidos().subscribe()
  }
}