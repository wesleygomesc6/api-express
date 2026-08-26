import 'dotenv/config'
import app from './src/app.js'
import pool from './src/dados/db.js'

const port = process.env.PORT || 3000

try {
	await pool.query('SELECT 1')
	app.listen(port, () => {
		console.log(`Servidor iniciado em http://localhost:${port}`)
	})
} catch (erro) {
	console.error('Não foi possível conectar ao MySQL:', erro.code || erro.message || erro)
	process.exitCode = 1
}
