import { professores } from '../dados/db.js'

const listar = ((pedido, resposta) => {
    resposta.json(professores)
})

const criar = ((pedido, resposta) => {
    const professor = {
        id: professores.length + 1,
        matricula: pedido.body.matricula,
        nome: pedido.body.nome,
        dataNasc: pedido.body.dataNasc,
        email: pedido.body.email
    }

    professores.push(professor)

    resposta.json(professor)
})

const editar = ( (pedido, resposta) => {
    const index = professores.findIndex(professor => professor.id == pedido.params.id)
    if(index === -1) {
        return resposta.json({mensagem: 'professor não encontrado!'})
    }
    professores[index] = { ...professores[index], ...pedido.body}
    resposta.json(professores[index])
})

const deletar = ( (pedido, resposta) => {
    const index = professores.findIndex(professor => professor.id === pedido.params.id)
    if(index === -1) {
        return resposta.json({mensagem: 'professor não encontrado!'})
    }
    professores.splice(index, 1)
    resposta.json({mensagem: 'professor deletado com sucesso!'})
})


export { listar, criar, editar, deletar }