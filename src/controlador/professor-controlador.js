import pool from '../dados/db.js'

const listar = (async (pedido, resposta) => {
    const [professores] = await pool.execute(
        'SELECT id, matricula, nome, dataNasc, email FROM professores ORDER BY id'
    )
    resposta.json(professores)
})

const criar = (async (pedido, resposta) => {
    const { nome, dataNasc, email } = pedido.body
    const conexao = await pool.getConnection()

    try {
        await conexao.beginTransaction()
        const [resultado] = await conexao.execute(
            'INSERT INTO professores (matricula, nome, dataNasc, email) VALUES (?, ?, ?, ?)',
            ['', nome, dataNasc, email]
        )
        const matricula = `${new Date().getFullYear()}${resultado.insertId}`

        await conexao.execute(
            'UPDATE professores SET matricula = ? WHERE id = ?',
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
        'UPDATE professores SET matricula = ?, nome = ?, dataNasc = ?, email = ? WHERE id = ?',
        [matricula, nome, dataNasc, email, pedido.params.id]
    )
    if (resultado.affectedRows === 0) {
        return resposta.status(404).json({ mensagem: 'Professor não encontrado!' })
    }

    resposta.json({ id: Number(pedido.params.id), matricula, nome, dataNasc, email })
})

const deletar = (async (pedido, resposta) => {
    const [resultado] = await pool.execute(
        'DELETE FROM professores WHERE id = ?',
        [pedido.params.id]
    )
    if (resultado.affectedRows === 0) {
        return resposta.status(404).json({ mensagem: 'Professor não encontrado!' })
    }

    resposta.json({ mensagem: 'Professor deletado com sucesso!' })
})


export { listar, criar, editar, deletar }