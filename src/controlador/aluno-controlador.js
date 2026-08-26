import pool from '../dados/db.js'

const listar = (async (pedido, resposta) => {
    const [alunos] = await pool.execute(
        'SELECT id, matricula, nome, dataNasc, email FROM alunos ORDER BY id'
    )
    resposta.json(alunos)
})

const criar = (async (pedido, resposta) => {
    const { nome, dataNasc, email } = pedido.body
    const conexao = await pool.getConnection()

    try {
        await conexao.beginTransaction()
        const [resultado] = await conexao.execute(
            'INSERT INTO alunos (matricula, nome, dataNasc, email) VALUES (?, ?, ?, ?)',
            ['', nome, dataNasc, email]
        )
        const matricula = `${new Date().getFullYear()}${resultado.insertId}`

        await conexao.execute(
            'UPDATE alunos SET matricula = ? WHERE id = ?',
            [matricula, resultado.insertId]
        )
        await conexao.commit()

        resposta.status(201).json({ id: resultado.insertId, matricula, nome, dataNasc, email })
    } catch (erro) {
        await conexao.rollback()
        throw erro
    } finally {
        conexao.release()
    }
})

const editar = (async (pedido, resposta) => {
    const { matricula, nome, dataNasc, email } = pedido.body
    const [resultado] = await pool.execute(
        'UPDATE alunos SET matricula = ?, nome = ?, dataNasc = ?, email = ? WHERE id = ?',
        [matricula, nome, dataNasc, email, pedido.params.id]
    )
    if (resultado.affectedRows === 0) {
        return resposta.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }

    resposta.json({ id: Number(pedido.params.id), matricula, nome, dataNasc, email })
})

const deletar = (async (pedido, resposta) => {
    const [resultado] = await pool.execute(
        'DELETE FROM alunos WHERE id = ?',
        [pedido.params.id]
    )
    if (resultado.affectedRows === 0) {
        return resposta.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }

    resposta.json({ mensagem: 'Aluno deletado com sucesso!' })
})


export { listar, criar, editar, deletar }