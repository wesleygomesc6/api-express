import { alunos } from '../dados/db.js'

const listar = ((pedido, resposta) => {
    resposta.json(alunos)
})

const criar = ((pedido, resposta) => {
    const aluno = {
        id: alunos.length + 1,
        matricula: pedido.body.matricula,
        nome: pedido.body.nome,
        dataNasc: pedido.body.dataNasc,
        email: pedido.body.email
    }

    alunos.push(aluno)

    resposta.json(aluno)
})

const editar = ( (pedido, resposta) => {
    const index = alunos.findIndex(aluno => aluno.id == pedido.params.id)
    if(index === -1) {
        return resposta.json({mensagem: 'Aluno não encontrado!'})
    }
    alunos[index] = { ...alunos[index], ...pedido.body}
    resposta.json(alunos[index])
})

const deletar = ( (pedido, resposta) => {
    const index = alunos.findIndex(aluno => aluno.id === pedido.params.id)
    if(index === -1) {
        return resposta.json({mensagem: 'Aluno não encontrado!'})
    }
    alunos.splice(index, 1)
    resposta.json({mensagem: 'Aluno deletado com sucesso!'})
})


export { listar, criar, editar, deletar }