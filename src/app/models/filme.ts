/* O objetivo deste componente é: praticar o uso da diretiva @for para que seja possivel utilizar um conjunto de dados - baseado em dados sobre filmes classicos - e criar uma tablea para exibi-los
*/

// a classe abaixo - simples classe TS - vai "atuar" como model domain(conjunto de regras/formato descritos na classe) para ser aplicados aos dados e, dessa forma, manter a consistencia deles ao do processo  de manipulação

export class Filme {
    // definir os fields/atributos/.... que compõem o model
    titulo:string
    direcao: string
    elenco: string
    anoLancamento: number

    constructor(
        titulo: string,
        direcao: string,
        elenco: string,
        anoLancamento: number
    ){
        // acessar as props da classe e atribui-las com valores de argumento que forma associados aos parametros do construtor
        this.titulo = titulo
        this.direcao = direcao
        this.elenco = elenco
        this.anoLancamento = anoLancamento
    }
}
