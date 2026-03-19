export interface Cadastro {
    id: number
    nome: string
    sobrenome: string
    email: string
    password: string
    role: 'ADMIN' | 'USER' // niveis de acesso do usuario 
}
