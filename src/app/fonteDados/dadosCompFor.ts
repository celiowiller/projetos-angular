// este arquivo será a nossa fonte de dados

// o 1º passo, para esta fonte de dados funcionar corretamente, é importar os models que já  foram definidos
import { Filme } from "../models/filme";
import { Colunas } from "../models/colunas";

// para este 2º passo - a construção da fonte de dados - será necessario implementar uma const que receberá como valor um conjunto de "registros"  - nada mais do que um conjunto de objetos gerados a partir do model Filme

export const dadosFilmes: Filme[] = [
    // para este 3º passo: agora, é preciso "preencher" nosso conjunto de registros com os dados necessarios para exibi-los no componente
    // para este proposito vamos gerar alguns objetos a partir da instancia da classe Filme
    new Filme('Um Estranho no Ninho', 'Milos Formam', 'Jack Nicholson e outros', 1976),
    /*{titulo:'Um estranho no Ninho',
        direcao:'Milos Formam',
        elenco:'Jack Nicholson',
        anoLancamento:1976},*/
    new Filme('Forest Gump - o contador de historias', 'Robert Zemeckis', 'Tom Hanks e outros', 1994),
    new Filme('Laranja Mecanica', 'Stanley Kubrik', 'Macolm Mcdowel e outros', 1971),
    new Filme('A Lista Schindler', 'Steven Spielberg', 'Liam Neeson e outros', 1993),
    new Filme('O poderoso Chefão', 'Francis Ford Copolla', 'Marlon Brando e outros', 1972)
]


// criar o conjunto de dados que dará nome as colunas da table que irá exibi-los
export const nomesColunas: Colunas[] = [
    new Colunas('Titulo do Filme', 'Direção', 'Elenco', 'Ano de Lançamento')
]